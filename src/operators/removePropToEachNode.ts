import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const removePropToEachNode = R.curry(
  <TNode>(ops: TOperatorSettings, propKey: string, nodes: TNode[]): TNode[] =>
    map(ops, R.dissoc(propKey), nodes),
);
