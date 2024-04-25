import { map } from "./map";

import { type TOperatorConfig } from "../_internal/type";
import { Store } from "../_internal/store";

import { MOVE_DOWN, MOVE_NEXT, MOVE_UP } from "../_internal/constants";

const R = require("ramda");

export const addTreeNodePathPropToEachNode = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    treeNodePathKey: string,
    treeNodeNameKey: string,
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
          ...opc,
          onMoveCursor: (direction, treeNode)=>
            R.pipe(
                R.prop(treeNodeNameKey),
                (treeNodeName)=> cursorMovementHandlerMapper(direction)(store.get().currentPathArr,treeNodeName),
                updatePathArrInStore(store)
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

const moveNext = R.curry((pathArr, treeNodeName) => R.init(pathArr).concat(treeNodeName));
const moveDown = R.curry((pathArr, treeNodeName)=> R.append(treeNodeName, pathArr));
const moveUp = R.curry((pathArr) => R.init(pathArr));

const updatePathArrInStore = R.curry((store, nextPathArr) => store.update({ currentPathArr: nextPathArr }));