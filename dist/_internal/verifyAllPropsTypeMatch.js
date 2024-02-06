'use strict';

const R = require("ramda");
const verifyAllPropsTypeMatch = R.curry((
// @TODO: type 적용
propTypePairs, object) => {
    return R.all(satisfiesAllPropTypePairs(propTypePairs), object);
});
const satisfiesAllPropTypePairs = R.all((propTypePair) => {
    const { propName, type } = propTypePair;
    return R.propSatisfies((value) => R.is(type, value), propName);
});

exports.verifyAllPropsTypeMatch = verifyAllPropsTypeMatch;
