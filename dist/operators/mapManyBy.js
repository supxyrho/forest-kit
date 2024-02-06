'use strict';

var operators_mapBy = require('./mapBy.js');

const R = require("ramda");
// @TODO: applyTimesBoundary 대신 maxApplyTimes, minApplyTimes 로 변경
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, Infinity],
};
const mapManyBy = R.curry((ops, predicate, transformation, nodes) => operators_mapBy.mapBy({ ...defaultOps, ...ops }, predicate, transformation, nodes));

exports.mapManyBy = mapManyBy;
