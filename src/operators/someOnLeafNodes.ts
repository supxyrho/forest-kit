import { extractLeafNodes } from "./extractLeafNodes";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const someOnLeafNodes = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => R.pipe(extractLeafNodes(ops), R.any(predicate))(nodes),
);
