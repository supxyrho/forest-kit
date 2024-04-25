import { type TOperatorConfig } from "../_internal/type";

import { mapBy } from "./mapBy";

const R = require("ramda");

// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps: TOperatorConfig = {
  childrenKey: "children",
  applyTimesBoundary: [0, 1],
};

export const mapOneBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    transformation: (node: TNode) => TNode,
    nodes: TNode[],
  ): TNode[] =>
    mapBy({ ...defaultOps, ...opc }, predicate, transformation, nodes),
);
