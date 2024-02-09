import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";
import { Store } from "../_internal/store";

const R = require("ramda");

export const addPositionPropToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    positionKey: string,
    nodes: TNode[]
  ): TNode[] => {
    const store = Store({
      position: [0],
    });

    const defaultOps = {
      ...ops,
      onMoveCursor: onMoveCursor(store),
    };

    return map(
      defaultOps,
      (el) => R.assoc(positionKey, store.get().position.join("."))(el),
      nodes
    );
  }
);

// @TODO: 추후 Symnbol로 변경
const MOVE_NEXT = "next";
const MOVE_DOWN = "down";
const MOVE_UP = "up";

const onMoveCursor = (store) => {
  const moveNext = (position) =>
    R.append(R.last(position) + 1, R.init(position));
  const moveDown = (position) => R.append(0, position);
  const moveUp = (position) =>
    position.length > 0 ? R.init(position) : position;

  return (direction) => {
    const { position } = store.get();
    const updateFn = R.cond([
      [R.equals(MOVE_NEXT), () => moveNext(position)],
      [R.equals(MOVE_DOWN), () => moveDown(position)],
      [R.equals(MOVE_UP), () => moveUp(position)],
      [R.T, () => position],
    ]);

    store.update({ position: updateFn(direction) });
  };
};
