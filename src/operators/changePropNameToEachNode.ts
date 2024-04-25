import { map } from "./map";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const changePropNameToEachNode = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    propKey: string,
    newPropKey: string,
    nodes: TNode[],
  ): TNode[] =>
    map(
      opc,
      (el) =>
        R.mergeAll([
          { [newPropKey]: R.prop(propKey)(el) },
          R.omit([propKey])(el),
        ]),
      nodes,
    ),
);
