import { satisfiesAllPropTypes } from "../_internal/satisfiesAllPropTypes";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
const R = require("ramda");

export const verifyNodeAllPropsTypeMatch = R.curry(
  <TNode>(
    // @TODO: type 적용
    propTypePairs: any,
    node: TNode,
  ): boolean => {
    return satisfiesAllPropTypes(propTypePairs, node);
  },
);
