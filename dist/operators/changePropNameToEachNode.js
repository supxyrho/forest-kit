'use strict';

var operators_map = require('./map.js');

const R = require("ramda");
const changePropNameToEachNode = R.curry((ops, propKey, newPropKey, nodes) => operators_map.map(ops, (el) => R.mergeAll([
    { [newPropKey]: R.prop(propKey)(el) },
    R.omit([propKey])(el),
]), nodes));

exports.changePropNameToEachNode = changePropNameToEachNode;
