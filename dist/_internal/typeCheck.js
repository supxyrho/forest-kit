'use strict';

const R = require("ramda");
const isNonArrayTypeObject = R.both(R.complement(R.is(Array)), R.is(Object));

exports.isNonArrayTypeObject = isNonArrayTypeObject;
