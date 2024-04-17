import { map } from "./map";

import { type TOperatorSettings } from "../_internal/type";
import { Store } from "../_internal/store";

import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

const R = require("ramda");

export const addTreeNodePathPropToEachNode = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    treeNodePathKey: string,
    treeNodeNameKeyKey: string,
    joinSeparator: string,
    nodes: TNode[]
  ): TNode[] => {
    const store = Store({
        currentPathArr: [],
    });

    const transformNode = (treeNode) => {
      const joinedPath = store.get().currentPathArr.join(joinSeparator);
      return R.assoc(treeNodePathKey, joinedPath, treeNode);
    };

    return map(
        {
          ...ops,
          onMoveCursor: (direction, treeNode)=>
            R.pipe(
                R.prop(treeNodeNameKeyKey),
                (treeNodeName) => {
                  return cursorMovementHandlerMapper(direction)(store.get().currentPathArr, treeNodeName)
                },
                updateCurrentPathArrInStore(store)
            )(treeNode),
        },
        transformNode,
        nodes
    );
});

const cursorMovementHandlerMapper =
  R.cond([
    [R.equals(MOVE_NEXT), () => moveNext],
    [R.equals(MOVE_DOWN), () => moveDown],
    [R.equals(MOVE_UP), () => moveUp],
  ])

const moveNext = R.curry((treeNodePathArr, treeNodeName) => R.init(treeNodePathArr).concat(treeNodeName));
const moveDown = R.curry((treeNodePathArr, treeNodeName)=> R.append(treeNodeName, treeNodePathArr));
const moveUp = R.curry((treeNodePathArr) => R.init(treeNodePathArr));

const updateCurrentPathArrInStore = R.curry((store, nextPathArr) => store.update({ currentPathArr: nextPathArr }));