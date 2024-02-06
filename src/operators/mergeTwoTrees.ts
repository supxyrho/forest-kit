/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TOperatorSettings } from "../_internal/type";
import { addPositionPropToEachNode } from "./addPositionPropToEachNode";
import { deepFlatten } from "./deepFlatten";
import { map } from "./map";
import { removePropToEachNode } from "./removePropToEachNode";

const R = require("ramda");

// @TODO: 너무 급조함... 추후 리팩토링
export const mergeTwoTrees = R.curry(
  <TNode>(ops: TOperatorSettings, leftNodes: TNode[], rightNodes): TNode[] => {
    const deepFlattenedLeftTree = R.pipe(
      addPositionPropToEachNode(ops, "position"),
      deepFlatten(ops),
    )(leftNodes);

    return R.pipe(
      addPositionPropToEachNode(ops, "position"),
      map(ops, (rightNode) =>
        R.mergeAll([
          R.find(
            (leftNode) => leftNode.position === rightNode.position,
            deepFlattenedLeftTree,
          ),
          rightNode,
        ]),
      ),
      removePropToEachNode(ops, "position"),
    )(rightNodes);
  },
);
