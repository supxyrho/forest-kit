/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { hasChildren } from "./hasChildren";

import { type TOperatorSettings } from "../_internal/type";

const R = require("ramda");

export const traverseWithApply = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    transformation: (node: TNode) => void,
    nodes: TNode[],
  ): TNode[] =>
    R.pipe(
      R.when(R.complement(R.is(Array)), () => {
        throw new Error("Node Children Must be an Array");
      }),
      R.when(
        R.is(Array),
        R.addIndex(R.map)(
          R.pipe(
            R.pipe(
              R.tap(
                (el, index) =>
                  ops?.onMoveCursor && ops?.onMoveCursor("next", el, index),
              ),
              transformation,
            ),
            R.ifElse(
              hasChildren(ops),
              R.pipe(
                R.tap(() => {
                  ops?.onMoveCursor && ops?.onMoveCursor("down");
                }),
                R.over(
                  R.lensProp(ops.childrenKey),
                  traverseWithApply(ops, transformation),
                ),
                R.tap(() => {
                  ops?.onMoveCursor && ops?.onMoveCursor("up");
                }),
              ),
              R.identity,
            ),
          ),
        ),
      ),
    )(nodes),
);
