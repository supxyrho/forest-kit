import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";
import { Store } from "../_internal/store";

import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

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

const moveNext = (postion) =>
  R.converge(R.append, [R.pipe(R.last, R.inc), R.init])(postion);

const moveDown = R.append(0);

const moveUp = (position) =>
  position.length > 0 ? R.init(position) : position;

const updatePositionByDirection = R.cond([
  [R.equals(MOVE_NEXT), () => moveNext],
  [R.equals(MOVE_DOWN), () => moveDown],
  [R.equals(MOVE_UP), () => moveUp],
  // @TODO: 에러 throw
  [R.T, R.identity],
]);

const onMoveCursor = (store) => (direction) => {
  const position = store.get().position;

  const updatedPosition = updatePositionByDirection(direction)(position);
  store.update({ position: updatedPosition });
};
