'use strict';

var operators_traverseWithApply = require('./traverseWithApply.js');

const R = require("ramda");
const tap = R.curry((ops, tapFn, nodes) => operators_traverseWithApply.traverseWithApply(ops, R.tap(tapFn), nodes));

exports.tap = tap;
