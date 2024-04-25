import { type TOperatorConfig } from "../_internal/type";

import { tapBy } from "./tapBy";

const R = require("ramda");

// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps: TOperatorConfig = {
  childrenKey: "children",
  applyTimesBoundary: [0, Infinity],
};

export const tapManyBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    tapFn: (node: TNode) => void,
    nodes: TNode[],
  ): TNode[] => tapBy({ ...defaultOps, ...opc }, predicate, tapFn, nodes),
);
