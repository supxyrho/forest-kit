import { map } from "./map";

import { createNumberIncrementer } from "../_internal/createNumberIncrementer";

import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const addIncrementalNumberToEachNode = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    start: number,
    sequenceKey: string,
    nodes: TNode[],
  ): TNode[] => {
    const numberIncrementer = createNumberIncrementer(start);

    return map(
      opc,
      (el) => R.assoc(sequenceKey, numberIncrementer.next())(el),
      nodes,
    );
  },
);
