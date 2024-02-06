/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const hasChildren = R.curry(
  <TNode>(ops: TOperatorSettings, node: TNode[]): TNode[] =>
    R.pipe(
      R.when(R.complement(R.is(Object)), () => {
        throw new Error("Node must be an object.");
      }),
      R.when(
        R.both(R.complement(R.is(Array)), R.complement(R.has(ops.childrenKey))),
        (node) => {
          throw new Error(
            `Node must have a children prop named "${ops.childrenKey}". ${JSON.stringify(node)}`,
          );
        },
      ),
      R.ifElse(
        R.propIs(Array, ops.childrenKey),
        R.pipe(R.prop(ops.childrenKey), R.complement(R.isEmpty)),
        R.always(false),
      ),
    )(node),
);
