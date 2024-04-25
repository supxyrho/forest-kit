import { traverseWithApply } from "./traverseWithApply";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const tap = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    tapFn: (node: TNode) => void,
    nodes: TNode[],
  ): TNode[] => traverseWithApply(opc, R.tap(tapFn), nodes),
);
