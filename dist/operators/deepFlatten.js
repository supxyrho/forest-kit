'use strict';

var operators_hasChildren = require('./hasChildren.js');

const R = require("ramda");
const deepFlatten = R.curry((ops, nodes) => R.pipe(R.chain((node) => R.ifElse(operators_hasChildren.hasChildren(ops), R.pipe(R.prop(ops.childrenKey), deepFlatten(ops), R.concat([node])), R.always([node]))(node)))(nodes));

exports.deepFlatten = deepFlatten;
