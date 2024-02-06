'use strict';

var operators_traverseWithApply = require('./traverseWithApply.js');

const R = require("ramda");
const map = R.curry((ops, transformation, nodes) => operators_traverseWithApply.traverseWithApply(ops, transformation, nodes));

exports.map = map;
