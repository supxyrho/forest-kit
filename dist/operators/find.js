'use strict';

var operators_deepFlatten = require('./deepFlatten.js');

const R = require("ramda");
const find = R.curry((ops, predicate, nodes) => R.pipe(operators_deepFlatten.deepFlatten(ops), R.filter(predicate))(nodes));

exports.find = find;
