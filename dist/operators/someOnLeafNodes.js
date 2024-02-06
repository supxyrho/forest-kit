'use strict';

var operators_extractLeafNodes = require('./extractLeafNodes.js');

const R = require("ramda");
const someOnLeafNodes = R.curry((ops, predicate, nodes) => R.pipe(operators_extractLeafNodes.extractLeafNodes(ops), R.any(predicate))(nodes));

exports.someOnLeafNodes = someOnLeafNodes;
