const R = require("ramda");

import { pipe } from "../pipleline";
import { type TOperatorConfig } from "../_internal/type";

import { addTreeNodePathPropToEachNode } from "./addTreeNodePathPropToEachNode";
import { deepFlatten } from "./deepFlatten";

export const findManyByStartsWithTreeNodePath = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    prefixTreeNodePath: string,
    treeNodeNameKey: string,
    nodes: TNode[]
  ): TNode[] =>
    pipe(
      // @TODO: TreeNodePath라는 네이밍 말고, 유일 식별자로서 생성하도록 만든다. 해당 함수 호출 전 treeNode 중 treeNodePath라는 prop이 존재할 수도 있다. react-table 같은 라이브러리 내에서는 어떻게 사용하는지 리서치해본다.
      addTreeNodePathPropToEachNode(opc, "treeNodePath", treeNodeNameKey, "/"),
      deepFlatten(opc),
      R.filter(R.pipe(R.prop("treeNodePath"), R.startsWith(prefixTreeNodePath)))
    )(nodes)
);
