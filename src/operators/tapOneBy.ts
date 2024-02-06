import { type TOperatorSettings } from "../_internal/type";

import { tapBy } from "./tapBy";

const R = require("ramda");

// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps: TOperatorSettings = {
  childrenKey: "children",
  applyTimesBoundary: [0, 1],
};

export const tapOneBy = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    tapFn: (node: TNode) => void,
    nodes: TNode[],
  ): TNode[] => tapBy({ ...defaultOps, ...ops }, predicate, tapFn, nodes),
);
