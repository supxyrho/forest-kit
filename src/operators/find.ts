import { deepFlatten } from "./deepFlatten";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const find = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => R.pipe(deepFlatten(opc), R.filter(predicate))(nodes),
);
