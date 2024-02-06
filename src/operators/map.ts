import { traverseWithApply } from "./traverseWithApply";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const map = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    transformation: (node: TNode) => TNode,
    nodes: TNode[],
  ): TNode[] => traverseWithApply(ops, transformation, nodes),
);
