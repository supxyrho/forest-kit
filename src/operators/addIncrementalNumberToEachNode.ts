import { map } from "./map";

import { createNumberIncrementer } from "../_internal/createNumberIncrementer";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const addIncrementalNumberToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    start: number,
    sequenceKey: string,
    nodes: TNode[],
  ): TNode[] => {
    const numberIncrementer = createNumberIncrementer(start);

    return map(
      ops,
      (el) => R.assoc(sequenceKey, numberIncrementer.next())(el),
      nodes,
    );
  },
);
