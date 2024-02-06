const R = require("ramda");

export const verifyAllPropsTypeMatch = R.curry(
  <TNode>(
    // @TODO: type 적용
    propTypePairs: any,
    object: TNode[] | null | object | undefined,
  ): TNode[] => {
    return R.all(satisfiesAllPropTypePairs(propTypePairs), object);
  },
);

const satisfiesAllPropTypePairs = R.all((propTypePair) => {
  const { propName, type } = propTypePair;
  return R.propSatisfies((value) => R.is(type, value), propName);
});
