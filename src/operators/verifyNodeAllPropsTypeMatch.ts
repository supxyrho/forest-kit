import { satisfiesAllPropTypes } from "../_internal/satisfiesAllPropTypes";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
const R = require("ramda");

export const verifyNodeAllPropsTypeMatch = R.curry(
  <TNode>(
    // @TODO: 현재 사용 예시는, { key: type } 형태의 object를 받아야 하지만, 현재 any로 처리되고 있음
    // @TODO: 보다 직관적으로 [ [key, type], [key, type] ] 형태로 변경
    propTypePairs: any,
    node: TNode
  ): boolean => {
    return satisfiesAllPropTypes(propTypePairs, node);
  }
);
