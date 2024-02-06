import { hasChildren } from "./hasChildren";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

type IIsLeafNode = <TNode>(ops: TOperatorSettings, node: TNode) => boolean;
export const isLeafNode = R.curry(
  (ops, node): IIsLeafNode =>
    R.pipe(hasChildren(ops), R.complement(R.identity))(node),
);
