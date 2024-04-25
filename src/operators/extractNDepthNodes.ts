import { deepFlatten } from "./deepFlatten";

import { countChar } from "../_internal/string";

import { type TOperatorConfig } from "../_internal/type";
import { addPositionPropToEachNode } from "./addPositionPropToEachNode";
import { removePropToEachNode } from "./removePropToEachNode";

const R = require("ramda");

export const extractNDepthNodes = R.curry(
  <TNode>(opc: TOperatorConfig, n: number, nodes: TNode[]): TNode[] =>
    R.pipe(
      addPositionPropToEachNode(opc, "position"),
      deepFlatten(opc),
      R.filter(R.pipe(R.prop("position"), countChar("."), R.equals(n))),
      removePropToEachNode(opc, "position")
    )(nodes)
);
