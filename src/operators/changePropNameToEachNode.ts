import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const changePropNameToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    propKey: string,
    newPropKey: string,
    nodes: TNode[],
  ): TNode[] =>
    map(
      ops,
      (el) =>
        R.mergeAll([
          { [newPropKey]: R.prop(propKey)(el) },
          R.omit([propKey])(el),
        ]),
      nodes,
    ),
);
