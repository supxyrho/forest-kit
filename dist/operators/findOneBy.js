'use strict';

var operators_findBy = require('./findBy.js');

const R = require("ramda");
// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, 1],
};
const findOneBy = R.curry((ops, predicate, nodes) => R.pipe(operators_findBy.findBy({ ...defaultOps, ...ops }, predicate), R.head)(nodes));

exports.findOneBy = findOneBy;
