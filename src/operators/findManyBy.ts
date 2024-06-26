import { type TOperatorConfig } from "../_internal/type";

import { findBy } from "./findBy";

const R = require("ramda");

// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps: TOperatorConfig = {
  childrenKey: "children",
  applyTimesBoundary: [0, Infinity],
};

export const findManyBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => findBy({ ...defaultOps, ...opc }, predicate, nodes),
);
