import { isLeafNode } from "./isLeafNode";
import { deepFlatten } from "./deepFlatten";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const extractLeafNodes = R.curry(
  <TNode>(opc: TOperatorConfig, nodes: TNode[]): TNode[] =>
    R.pipe(deepFlatten(opc), R.filter(isLeafNode(opc)))(nodes),
);
