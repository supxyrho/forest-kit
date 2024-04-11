import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";
import { Store } from "../_internal/store";

import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

const R = require("ramda");

export const addTreeNodePathPropToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    treeNodePathKey: string,
    nameKey: string,
    joinSeparator: string,
    nodes: TNode[]
  ): TNode[] => {
    const store = Store({
        currentTreePath: [],
    });

    return map(
        {
        ...ops,
        onMoveCursor: handleCursorMovement(store, nameKey),
        },
        (el) => R.assoc(treeNodePathKey, store.get().currentTreePath.join(joinSeparator))(el),
        nodes
    );
    }
);

const moveNext = R.curry((currentPath, nameKey, treeNode) => R.init(currentPath).concat(R.prop(nameKey, treeNode)))

const moveDown = R.curry((currentPath, nameKey, treeNode)=> R.append(R.prop(nameKey, treeNode), currentPath))

const moveUp = R.curry((currentPath) => R.init(currentPath))

const updatePathByDirection = R.cond([
  [R.equals(MOVE_NEXT), () => moveNext],
  [R.equals(MOVE_DOWN), () => moveDown],
  [R.equals(MOVE_UP), () => moveUp],
  // @TODO: 에러 throw
  [R.T, R.identity],
]);

const handleCursorMovement = (store, nameKey) => (direction, treeNode) => 
  store.update({ 
    currentTreePath: updatePathByDirection(direction)(store.get().currentTreePath, nameKey, treeNode)
  });
