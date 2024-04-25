import { map } from "./map";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const removePropToEachNode = R.curry(
  <TNode>(opc: TOperatorConfig, propKey: string, nodes: TNode[]): TNode[] =>
    map(opc, R.dissoc(propKey), nodes),
);
