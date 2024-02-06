import { isLeafNode } from "./isLeafNode";
import { deepFlatten } from "./deepFlatten";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const extractLeafNodes = R.curry(
  <TNode>(ops: TOperatorSettings, nodes: TNode[]): TNode[] =>
    R.pipe(deepFlatten(ops), R.filter(isLeafNode(ops)))(nodes),
);
