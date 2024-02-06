'use strict';

var operators_mapBy = require('./mapBy.js');

const R = require("ramda");
// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, 1],
};
const mapOneBy = R.curry((ops, predicate, transformation, nodes) => operators_mapBy.mapBy({ ...defaultOps, ...ops }, predicate, transformation, nodes));

exports.mapOneBy = mapOneBy;
