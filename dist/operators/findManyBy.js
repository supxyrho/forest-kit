'use strict';

var operators_findBy = require('./findBy.js');

const R = require("ramda");
// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, Infinity],
};
const findManyBy = R.curry((ops, predicate, nodes) => operators_findBy.findBy({ ...defaultOps, ...ops }, predicate, nodes));

exports.findManyBy = findManyBy;
