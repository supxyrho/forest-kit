import { hasChildren } from "./hasChildren";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const filter = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] =>
    R.pipe(
      R.filter(predicate),
      R.map(
        R.ifElse(
          hasChildren(ops),
          R.over(R.lensProp(ops.childrenKey), filter(ops, predicate)),
          R.identity,
        ),
      ),
    )(nodes),
);
