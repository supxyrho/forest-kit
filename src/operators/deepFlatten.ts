import { hasChildren } from "./hasChildren";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const deepFlatten = R.curry(
  <TNode>(ops: TOperatorSettings, nodes: TNode[]): TNode[] =>
    R.pipe(
      R.chain((node) =>
        R.ifElse(
          hasChildren(ops),
          R.pipe(R.prop(ops.childrenKey), deepFlatten(ops), R.concat([node])),
          R.always([node]),
        )(node),
      ),
    )(nodes),
);
