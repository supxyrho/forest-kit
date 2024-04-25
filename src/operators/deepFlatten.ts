import { hasChildren } from "./hasChildren";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const deepFlatten = R.curry(
  <TNode>(opc: TOperatorConfig, nodes: TNode[]): TNode[] =>
    R.pipe(
      R.chain((node) =>
        R.ifElse(
          hasChildren(opc),
          R.pipe(R.prop(opc.childrenKey), deepFlatten(opc), R.concat([node])),
          R.always([node]),
        )(node),
      ),
    )(nodes),
);
