/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";
import { Store } from "../_internal/store";

const R = require("ramda");

// @TODO: 자동 값 설정이 제대로 동작 안함. 예: positionKey: string = 'position'
export const addPositionPropToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    positionKey: string,
    nodes: TNode[],
  ): TNode[] => {
    const store = Store({
      position: [0],
    });

    // @TODO: 외부 함수로 분리 및 함수합성 처리
    const onMoveCursor = (direction) => {
      const { position } = store.get();

      switch (direction) {
        case "next":
          {
            const last = position.pop();
            store.update({ position: [...position, last + 1] });
          }
          break;

        case "down":
          store.update({ position: [...position, 0] });
          break;

        case "up":
          position.pop();
          store.update({
            position: [...position],
          });
          break;
      }
    };

    const defaultOps = {
      ...ops,
      onMoveCursor,
    };

    return map(
      defaultOps,
      (el) => R.assoc(positionKey, store.get().position.join("."))(el),
      nodes,
    );
  },
);
