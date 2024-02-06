'use strict';

var operators_filterBy = require('./filterBy.js');

const R = require("ramda");
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, Infinity],
};
const filterManyBy = R.curry((ops, predicate, nodes) => operators_filterBy.filterBy({ ...defaultOps, ...ops }, predicate, nodes));

exports.filterManyBy = filterManyBy;
