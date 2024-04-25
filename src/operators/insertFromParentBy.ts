/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { mapBy } from "./mapBy";

import { Store } from "../_internal/store";

import { type TOperatorConfig } from "../_internal/type";
import { isNonArrayTypeObject } from "../_internal/typeCheck";

const R = require("ramda");

export const insertFromParentBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    newNodeOrNodes: TNode | TNode[],
    nodes: TNode[],
  ): TNode[] => {
    const store = Store({ isInserted: false });
    const result = mapBy(
      opc,
      predicate,
      R.ifElse(
        () => R.equals(false, store.get().isInserted),
        R.pipe(
          R.tap(() => {
            store.update({ isInserted: true });
          }),
          R.over(
            R.lensProp(opc.childrenKey),
            insertAt(opc?.at ?? "last", newNodeOrNodes),
          ),
        ),
        R.identity,
      ),
      nodes,
    );

    const isInserted = store.get().isInserted;
    if (!isInserted) throw new Error("Node is not inserted");

    return result;
  },
);

// @TODO: 함수 합성으로 내부 구현
// @TODO: error 예외 문구 수정
const insertAt = (at, newNodes) => (nodes) => {
  if (isNonArrayTypeObject(newNodes)) {
    newNodes = [newNodes];
  }

  if (at === "first") return R.concat(newNodes, nodes);
  else if (at === "last") return R.concat(nodes, newNodes);
  else if (at < 0 || at > nodes.length)
    throw new Error(
      `@TODO: 추후 정의 1 ${at}, ${JSON.stringify(newNodes)}, ${JSON.stringify(nodes)}`,
    );
  else if (typeof at === "number") return R.insertAll(at, newNodes, nodes);

  throw new Error("@TODO: 추후 정의 2");
};
