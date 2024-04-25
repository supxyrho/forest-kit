import { hasChildren } from "./hasChildren";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

type IIsLeafNode = <TNode>(opc: TOperatorConfig, node: TNode) => boolean;
export const isLeafNode = R.curry(
  (opc, node): IIsLeafNode =>
    R.pipe(hasChildren(opc), R.complement(R.identity))(node),
);
