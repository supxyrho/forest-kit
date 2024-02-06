'use strict';

var operators_hasChildren = require('./hasChildren.js');

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const R = require("ramda");
const traverseWithApply = R.curry((ops, transformation, nodes) => R.pipe(R.when(R.complement(R.is(Array)), () => {
    throw new Error("Node Children Must be an Array");
}), R.when(R.is(Array), R.addIndex(R.map)(R.pipe(R.pipe(R.tap((el, index) => ops?.onMoveCursor && ops?.onMoveCursor("next", el, index)), transformation), R.ifElse(operators_hasChildren.hasChildren(ops), R.pipe(R.tap(() => {
    ops?.onMoveCursor && ops?.onMoveCursor("down");
}), R.over(R.lensProp(ops.childrenKey), traverseWithApply(ops, transformation)), R.tap(() => {
    ops?.onMoveCursor && ops?.onMoveCursor("up");
})), R.identity)))))(nodes));

exports.traverseWithApply = traverseWithApply;
