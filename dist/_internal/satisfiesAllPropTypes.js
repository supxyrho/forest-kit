'use strict';

const R = require("ramda");
// @TODO: internal 폴더로 분리
const satisfiesAllPropTypes = R.curry((propsWithTypes, obj) => R.equals(R.toPairs(propsWithTypes), R.pipe(R.toPairs, R.map(([key, value]) => [key, R.type(value)]))(obj)));

exports.satisfiesAllPropTypes = satisfiesAllPropTypes;
