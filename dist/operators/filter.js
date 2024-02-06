'use strict';

var operators_hasChildren = require('./hasChildren.js');

const R = require("ramda");
const filter = R.curry((ops, predicate, nodes) => R.pipe(R.filter(predicate), R.map(R.ifElse(operators_hasChildren.hasChildren(ops), R.over(R.lensProp(ops.childrenKey), filter(ops, predicate)), R.identity)))(nodes));

exports.filter = filter;
