import { hasChildren } from "./hasChildren";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const filter = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] =>
    R.pipe(
      R.filter(predicate),
      R.map(
        R.ifElse(
          hasChildren(opc),
          R.over(R.lensProp(opc.childrenKey), filter(opc, predicate)),
          R.identity,
        ),
      ),
    )(nodes),
);
