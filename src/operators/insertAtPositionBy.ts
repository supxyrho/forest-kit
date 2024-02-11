/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TOperatorSettings } from "../_internal/type";
import { addPositionPropToEachNode } from "./addPositionPropToEachNode";
import { insertFromParentBy } from "./insertFromParentBy";
import { removePropToEachNode } from "./removePropToEachNode";

import { atType } from "../_internal/type";

const R = require("ramda");

export const insertAtPosition = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    position: string,
    newNodeOrNodes: TNode | TNode[],
    nodes: TNode[]
  ): TNode[] => {
    const nodesWithPosition = addPositionPropToEachNode(ops, "position", nodes);

    // @TODO: apply FP (functor or monad)
    const tmp = position?.split(".");

    // 1depth에 대한 예외처리
    const tmpIdx = Number(tmp?.pop() ?? 0) - 1;
    const parentPosition = tmp.join(".");

    ops = {
      ...ops,
      at: incOrDecByDirection(String(ops?.at ?? "current"), tmpIdx),
    };

    return R.pipe(
      insertFromParentBy(
        ops,
        R.propEq(parentPosition, "position"),
        newNodeOrNodes
      ),
      removePropToEachNode(ops, "position")
    )(nodesWithPosition);
  }
);

const incOrDecByDirection = (direction: string, number: number): atType => {
  switch (direction) {
    case "left":
      if (number === 0) {
        // @TODO: 0 or throw Error?
        return 0;
      }

      return number - 1;

    case "current":
      return number;

    // @TODO: right가 범위를 벗어나는 경우에 대한 예외 처리 및 관련 테스트 케이스 추가
    case "right":
      return number + 1;

    default:
      throw new Error("invalid direction");
  }
};
