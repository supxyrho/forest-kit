import { extractLeafNodes } from "./extractLeafNodes";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const someOnLeafNodes = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => R.pipe(extractLeafNodes(opc), R.any(predicate))(nodes),
);
