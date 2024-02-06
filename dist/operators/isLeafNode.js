'use strict';

var operators_hasChildren = require('./hasChildren.js');

const R = require("ramda");
const isLeafNode = R.curry((ops, node) => R.pipe(operators_hasChildren.hasChildren(ops), R.complement(R.identity))(node));

exports.isLeafNode = isLeafNode;
