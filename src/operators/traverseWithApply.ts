/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { hasChildren } from "./hasChildren";

import { type TOperatorSettings } from "../_internal/type";
import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

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
                  ops?.onMoveCursor && ops?.onMoveCursor(MOVE_NEXT, el, index),
              ),
              transformation,
            ),
            R.ifElse(
              hasChildren(ops),
              R.pipe(
                R.tap((el, index) => {
                  ops?.onMoveCursor && ops?.onMoveCursor(MOVE_DOWN, el, index);
                }),
                R.over(
                  R.lensProp(ops.childrenKey),
                  traverseWithApply(ops, transformation),
                ),
                R.tap((el, index) => {
                  ops?.onMoveCursor && ops?.onMoveCursor(MOVE_UP, el, index);
                }),
              ),
              R.identity,
            ),
          ),
        ),
      ),
    )(nodes),
);
