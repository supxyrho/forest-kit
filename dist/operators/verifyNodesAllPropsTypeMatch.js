'use strict';

var operators_verifyNodeAllPropsTypeMatch = require('./verifyNodeAllPropsTypeMatch.js');

const R = require("ramda");
const verifyNodesAllPropsTypeMatch = R.curry((
// @TODO: type 적용
propTypePairs, nodes) => R.all(operators_verifyNodeAllPropsTypeMatch.verifyNodeAllPropsTypeMatch(propTypePairs), nodes));

exports.verifyNodesAllPropsTypeMatch = verifyNodesAllPropsTypeMatch;
