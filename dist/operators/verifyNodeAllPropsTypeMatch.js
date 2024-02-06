'use strict';

var _internal_satisfiesAllPropTypes = require('../_internal/satisfiesAllPropTypes.js');

/* eslint-disable @typescript-eslint/no-unsafe-argument */
const R = require("ramda");
const verifyNodeAllPropsTypeMatch = R.curry((
// @TODO: type 적용
propTypePairs, node) => {
    return _internal_satisfiesAllPropTypes.satisfiesAllPropTypes(propTypePairs, node);
});

exports.verifyNodeAllPropsTypeMatch = verifyNodeAllPropsTypeMatch;
