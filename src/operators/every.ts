import { deepFlatten } from "./deepFlatten";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const every = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => R.pipe(deepFlatten(ops), R.all(predicate))(nodes),
);
