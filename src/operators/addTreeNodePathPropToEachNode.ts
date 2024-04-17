const R = require("ramda");

import { type TOperatorSettings } from "../_internal/type";
import { Store } from "../_internal/store";
import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

import { map } from "./map";

export const addTreeNodePathPropToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    treeNodePathKey: string,
    nameKey: string,
    joinSeparator: string,
    nodes: TNode[]
  ): TNode[] => {
    const store = Store({
      currentTreeNodePath: [],
    });

    return map(
      {
        ...ops,
        onMoveCursor: handleCursorMovement(store, nameKey),
      },
      assocTreeNodePathProp(joinSeparator, treeNodePathKey, store.get().currentTreeNodePath),
      nodes
    );
  }
);

const assocTreeNodePathProp = R.curry(
  (joinSeparator, treeNodePathKey,  treeNodePath, treeNode) =>
    R.assoc(
      treeNodePathKey,
      R.join(joinSeparator, treeNodePath),
      treeNode
    )
);

const moveNext = R.curry((currentPath, nameKey, treeNode) =>
  R.init(currentPath).concat(R.prop(nameKey, treeNode))
);

const moveDown = R.curry((currentPath, nameKey, treeNode) =>
  R.append(R.prop(nameKey, treeNode), currentPath)
);

const moveUp = R.curry((currentPath) => R.init(currentPath));

const updateTreeeNodePathPropByDirection = R.cond([
  [R.equals(MOVE_NEXT), () => moveNext],
  [R.equals(MOVE_DOWN), () => moveDown],
  [R.equals(MOVE_UP), () => moveUp],
]);

const handleCursorMovement = (store, nameKey) => (direction, treeNode) =>
  store.update({
    currentTreeNodePath: updateTreeeNodePathPropByDirection(direction)(
      store.get().currentTreeNodePath,
      nameKey,
      treeNode
    ),
  });
