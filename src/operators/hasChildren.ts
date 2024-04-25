/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TOperatorConfig } from "../_internal/type";

const R = require("ramda");

export const hasChildren = R.curry(
  <TNode>(opc: TOperatorConfig, node: TNode[]): TNode[] =>
    R.pipe(
      R.when(R.complement(R.is(Object)), () => {
        throw new Error("Node must be an object.");
      }),
      R.when(
        R.both(R.complement(R.is(Array)), R.complement(R.has(opc.childrenKey))),
        (node) => {
          throw new Error(
            `Node must have a children prop named "${opc.childrenKey}". ${JSON.stringify(node)}`,
          );
        },
      ),
      R.ifElse(
        R.propIs(Array, opc.childrenKey),
        R.pipe(R.prop(opc.childrenKey), R.complement(R.isEmpty)),
        R.always(false),
      ),
    )(node),
);
