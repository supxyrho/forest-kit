import { traverseWithApply } from "./traverseWithApply";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const map = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    transformation: (node: TNode) => TNode,
    nodes: TNode[],
  ): TNode[] => traverseWithApply(opc, transformation, nodes),
);
