import { traverseWithApply } from "./traverseWithApply";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const tap = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    tapFn: (node: TNode) => void,
    nodes: TNode[],
  ): TNode[] => traverseWithApply(ops, R.tap(tapFn), nodes),
);
