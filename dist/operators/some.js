'use strict';

var operators_deepFlatten = require('./deepFlatten.js');

const R = require("ramda");
const some = R.curry((ops, predicate, nodes) => R.pipe(operators_deepFlatten.deepFlatten(ops), R.any(predicate))(nodes));

exports.some = some;
