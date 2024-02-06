'use strict';

var operators_deepFlatten = require('./deepFlatten.js');
var operators_addPositionPropToEachNode = require('./addPositionPropToEachNode.js');
var operators_removePropToEachNode = require('./removePropToEachNode.js');

const R = require("ramda");
const extractNDepthNodes = R.curry((ops, n, nodes) => R.pipe(operators_addPositionPropToEachNode.addPositionPropToEachNode(ops, "position"), operators_deepFlatten.deepFlatten(ops), R.filter(R.pipe(R.prop("position"), countChar("."), R.equals(n))), operators_removePropToEachNode.removePropToEachNode(ops, "position"))(nodes));
// @TODO : internal 폴더로 분리
const countChar = R.curry((char, str) => R.pipe(R.split(""), R.filter(R.equals(char)), R.length)(str));

exports.extractNDepthNodes = extractNDepthNodes;
