/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { hasChildren } from "./hasChildren";

import { type TOperatorConfig } from "../_internal/type";
import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

const R = require("ramda");

export const traverseWithApply = R.curry(
  <TNode>(
    opc: TOperatorConfig,
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
                  opc?.onMoveCursor && opc?.onMoveCursor(MOVE_NEXT, el, index),
              ),
              transformation,
            ),
            R.ifElse(
              hasChildren(opc),
              R.pipe(
                R.tap((el, index) => {
                  opc?.onMoveCursor && opc?.onMoveCursor(MOVE_DOWN, el, index);
                }),
                R.over(
                  R.lensProp(opc.childrenKey),
                  traverseWithApply(opc, transformation),
                ),
                R.tap((el, index) => {
                  opc?.onMoveCursor && opc?.onMoveCursor(MOVE_UP, el, index);
                }),
              ),
              R.identity,
            ),
          ),
        ),
      ),
    )(nodes),
);
