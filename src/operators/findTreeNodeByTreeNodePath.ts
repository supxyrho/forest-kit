import { pipe } from '../pipleline'
import { type TOperatorSettings } from "../_internal/type";

import { addTreeNodePathPropToEachNode } from "./addTreeNodePathPropToEachNode";
import { findOneBy } from "./findOneBy";

const R = require("ramda");

export const findTreeNodeByTreeNodePath = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    targetTreeNodePath: string,
    treeNodeNameKey: string,
    nodes: TNode[]
  ): TNode[] => 
  pipe(
    addTreeNodePathPropToEachNode(ops, 'treeNodePath', treeNodeNameKey, '/'),
    findOneBy(
      ops, 
      R.pipe(
          R.prop('treeNodePath'),
          R.equals(targetTreeNodePath)
      )
    ),
  )(nodes)
);
