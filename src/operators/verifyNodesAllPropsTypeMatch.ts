import { verifyNodeAllPropsTypeMatch } from "./verifyNodeAllPropsTypeMatch";

const R = require("ramda");

export const verifyNodesAllPropsTypeMatch = R.curry(
  <TNode>(
    // @TODO: type 적용
    propTypePairs: any,
    nodes: TNode[],
  ): boolean => R.all(verifyNodeAllPropsTypeMatch(propTypePairs), nodes),
);
