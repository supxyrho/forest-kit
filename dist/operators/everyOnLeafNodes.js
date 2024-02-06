'use strict';

var operators_extractLeafNodes = require('./extractLeafNodes.js');

const R = require("ramda");
const everyOnLeafNodes = R.curry((ops, predicate, nodes) => R.pipe(operators_extractLeafNodes.extractLeafNodes(ops), R.all(predicate))(nodes));

exports.everyOnLeafNodes = everyOnLeafNodes;
