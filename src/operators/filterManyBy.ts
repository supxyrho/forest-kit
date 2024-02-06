import { type TOperatorSettings } from "../_internal/type";

import { filterBy } from "./filterBy";

const R = require("ramda");

const defaultOps: TOperatorSettings = {
  childrenKey: "children",
  applyTimesBoundary: [0, Infinity],
};

export const filterManyBy = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => filterBy({ ...defaultOps, ...ops }, predicate, nodes),
);
