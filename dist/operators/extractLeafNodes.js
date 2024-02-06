'use strict';

var operators_isLeafNode = require('./isLeafNode.js');
var operators_deepFlatten = require('./deepFlatten.js');

const R = require("ramda");
const extractLeafNodes = R.curry((ops, nodes) => R.pipe(operators_deepFlatten.deepFlatten(ops), R.filter(operators_isLeafNode.isLeafNode(ops)))(nodes));

exports.extractLeafNodes = extractLeafNodes;
