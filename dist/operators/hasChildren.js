'use strict';

const R = require("ramda");
const hasChildren = R.curry((ops, node) => R.pipe(R.when(R.complement(R.is(Object)), () => {
    throw new Error("Node must be an object.");
}), R.when(R.both(R.complement(R.is(Array)), R.complement(R.has(ops.childrenKey))), (node) => {
    throw new Error(`Node must have a children prop named "${ops.childrenKey}". ${JSON.stringify(node)}`);
}), R.ifElse(R.propIs(Array, ops.childrenKey), R.pipe(R.prop(ops.childrenKey), R.complement(R.isEmpty)), R.always(false)))(node));

exports.hasChildren = hasChildren;
