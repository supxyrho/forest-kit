'use strict';

const R = require("ramda");
const ensureArray = (nodes) => R.cond([
    [R.isNil, R.always([])],
    [R.is(Array), R.identity],
    [R.is(Object), R.of(Array)],
])(nodes);

exports.ensureArray = ensureArray;
