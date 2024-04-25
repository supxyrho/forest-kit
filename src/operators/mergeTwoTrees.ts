/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TOperatorConfig } from "../_internal/type";
import { addPositionPropToEachNode } from "./addPositionPropToEachNode";
import { deepFlatten } from "./deepFlatten";
import { map } from "./map";
import { removePropToEachNode } from "./removePropToEachNode";

const R = require("ramda");

// @TODO: 너무 급조함... 추후 리팩토링
export const mergeTwoTrees = R.curry(
  <TNode>(opc: TOperatorConfig, leftNodes: TNode[], rightNodes): TNode[] => {
    const deepFlattenedLeftTree = R.pipe(
      addPositionPropToEachNode(opc, "position"),
      deepFlatten(opc),
    )(leftNodes);

    return R.pipe(
      addPositionPropToEachNode(opc, "position"),
      map(opc, (rightNode) =>
        R.mergeAll([
          R.find(
            (leftNode) => leftNode.position === rightNode.position,
            deepFlattenedLeftTree,
          ),
          rightNode,
        ]),
      ),
      removePropToEachNode(opc, "position"),
    )(rightNodes);
  },
);
