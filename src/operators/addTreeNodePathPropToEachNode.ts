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
        currenttreeNodePathArr: [],
    });

    return map(
        {
        ...ops,
        onMoveCursor: handleMovementCursor(store ),
        },
        (el) => R.assoc(treeNodePathKey, store.get().currenttreeNodePathArr.join(joinSeparator))(el),
        nodes
    );
    }
);

const moveNext = (currentPath, treeNode) => R.init(currentPath).concat(treeNode.name);
const moveDown = (currentPath, treeNode)=> R.append(treeNode.name, currentPath);
const moveUp = (currentPath) => R.init(currentPath);

const handleMovementCursor = (store ) => (direction, treeNode) => 
  store.update({ currenttreeNodePathArr: 
    R.cond([
      [R.equals(MOVE_NEXT), () => moveNext],
      [R.equals(MOVE_DOWN), () => moveDown],
      [R.equals(MOVE_UP), () => moveUp],
    ])(direction)(store.get().currenttreeNodePathArr, treeNode
  )}
)