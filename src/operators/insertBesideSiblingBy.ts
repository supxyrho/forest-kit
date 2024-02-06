/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TOperatorSettings } from "../_internal/type";
import { addPositionPropToEachNode } from "./addPositionPropToEachNode";
import { findOneBy } from "./findOneBy";
import { insertFromParentBy } from "./insertFromParentBy";
import { removePropToEachNode } from "./removePropToEachNode";

const R = require("ramda");

export const insertBesideSiblingBy = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    newNodeOrNodes: TNode | TNode[],
    nodes: TNode[],
  ): TNode[] => {
    const nodesWithPosition = addPositionPropToEachNode(ops, "position", nodes);

    // @TODO: apply FP (functor or monad)
    const sibling = findOneBy(ops, predicate, nodesWithPosition);
    const tmp = sibling.position.split(".");
    const siblingIdx = Number(tmp.pop() - 1);
    const parentPosition = tmp.join(".");

    ops = {
      ...ops,
      at: incOrDecByDirection(String(ops?.at ?? "right"), siblingIdx),
    };

    return R.pipe(
      insertFromParentBy(
        ops,
        R.propEq(parentPosition, "position"),
        newNodeOrNodes,
      ),
      removePropToEachNode(ops, "position"),
    )(nodesWithPosition);
  },
);

const incOrDecByDirection = (direction: string, number: number) => {
  switch (direction) {
    case "left":
      return number;

    case "right":
      return number + 1;

    default:
      throw new Error("invalid direction");
  }
};
