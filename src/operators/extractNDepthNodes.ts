import { deepFlatten } from "./deepFlatten";

import { countChar } from "../_internal/string";

import { type TOperatorSettings } from "../_internal/type";
import { addPositionPropToEachNode } from "./addPositionPropToEachNode";
import { removePropToEachNode } from "./removePropToEachNode";

const R = require("ramda");

export const extractNDepthNodes = R.curry(
  <TNode>(ops: TOperatorSettings, n: number, nodes: TNode[]): TNode[] =>
    R.pipe(
      addPositionPropToEachNode(ops, "position"),
      deepFlatten(ops),
      R.filter(R.pipe(R.prop("position"), countChar("."), R.equals(n))),
      removePropToEachNode(ops, "position")
    )(nodes)
);
