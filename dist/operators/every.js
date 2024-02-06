'use strict';

var operators_deepFlatten = require('./deepFlatten.js');

const R = require("ramda");
const every = R.curry((ops, predicate, nodes) => R.pipe(operators_deepFlatten.deepFlatten(ops), R.all(predicate))(nodes));

exports.every = every;
