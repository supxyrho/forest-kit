import { type TOperatorConfig } from "../_internal/type";

import { findBy } from "./findBy";

const R = require("ramda");

// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps: TOperatorConfig = {
  childrenKey: "children",
  applyTimesBoundary: [0, 1],
};

export const findOneBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] =>
    R.pipe(findBy({ ...defaultOps, ...opc }, predicate), R.head)(nodes),
);
