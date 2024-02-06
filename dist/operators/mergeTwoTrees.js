'use strict';

var operators_addPositionPropToEachNode = require('./addPositionPropToEachNode.js');
var operators_deepFlatten = require('./deepFlatten.js');
var operators_map = require('./map.js');
var operators_removePropToEachNode = require('./removePropToEachNode.js');

const R = require("ramda");
// @TODO: 너무 급조함... 추후 리팩토링
const mergeTwoTrees = R.curry((ops, leftNodes, rightNodes) => {
    const deepFlattenedLeftTree = R.pipe(operators_addPositionPropToEachNode.addPositionPropToEachNode(ops, "position"), operators_deepFlatten.deepFlatten(ops))(leftNodes);
    return R.pipe(operators_addPositionPropToEachNode.addPositionPropToEachNode(ops, "position"), operators_map.map(ops, (rightNode) => R.mergeAll([
        R.find((leftNode) => leftNode.position === rightNode.position, deepFlattenedLeftTree),
        rightNode,
    ])), operators_removePropToEachNode.removePropToEachNode(ops, "position"))(rightNodes);
});

exports.mergeTwoTrees = mergeTwoTrees;
