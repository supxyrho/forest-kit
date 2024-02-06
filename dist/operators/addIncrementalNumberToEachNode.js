'use strict';

var operators_map = require('./map.js');
var _internal_createNumberIncrementer = require('../_internal/createNumberIncrementer.js');

const R = require("ramda");
const addIncrementalNumberToEachNode = R.curry((ops, start, sequenceKey, nodes) => {
    const numberIncrementer = _internal_createNumberIncrementer.createNumberIncrementer(start);
    return operators_map.map(ops, (el) => R.assoc(sequenceKey, numberIncrementer.next())(el), nodes);
});

exports.addIncrementalNumberToEachNode = addIncrementalNumberToEachNode;
