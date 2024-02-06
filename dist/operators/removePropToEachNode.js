'use strict';

var operators_map = require('./map.js');

const R = require("ramda");
const removePropToEachNode = R.curry((ops, propKey, nodes) => operators_map.map(ops, R.dissoc(propKey), nodes));

exports.removePropToEachNode = removePropToEachNode;
