import { type TOperatorConfig } from "../_internal/type";

import { filterBy } from "./filterBy";

const R = require("ramda");

const defaultOps: TOperatorConfig = {
  childrenKey: "children",
  applyTimesBoundary: [0, 1],
};

export const filterOneBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => filterBy({ ...defaultOps, ...opc }, predicate, nodes),
);
