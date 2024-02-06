'use strict';

var operators_tapBy = require('./tapBy.js');

const R = require("ramda");
// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, Infinity],
};
const tapManyBy = R.curry((ops, predicate, tapFn, nodes) => operators_tapBy.tapBy({ ...defaultOps, ...ops }, predicate, tapFn, nodes));

exports.tapManyBy = tapManyBy;
