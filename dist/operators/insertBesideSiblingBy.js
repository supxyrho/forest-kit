'use strict';

var operators_addPositionPropToEachNode = require('./addPositionPropToEachNode.js');
var operators_findOneBy = require('./findOneBy.js');
var operators_insertFromParentBy = require('./insertFromParentBy.js');
var operators_removePropToEachNode = require('./removePropToEachNode.js');

const R = require("ramda");
const insertBesideSiblingBy = R.curry((ops, predicate, newNodeOrNodes, nodes) => {
    const nodesWithPosition = operators_addPositionPropToEachNode.addPositionPropToEachNode(ops, "position", nodes);
    // @TODO: apply FP (functor or monad)
    const sibling = operators_findOneBy.findOneBy(ops, predicate, nodesWithPosition);
    const tmp = sibling.position.split(".");
    const siblingIdx = Number(tmp.pop() - 1);
    const parentPosition = tmp.join(".");
    ops = {
        ...ops,
        at: incOrDecByDirection(String(ops?.at ?? "right"), siblingIdx),
    };
    return R.pipe(operators_insertFromParentBy.insertFromParentBy(ops, R.propEq(parentPosition, "position"), newNodeOrNodes), operators_removePropToEachNode.removePropToEachNode(ops, "position"))(nodesWithPosition);
});
const incOrDecByDirection = (direction, number) => {
    switch (direction) {
        case "left":
            return number;
        case "right":
            return number + 1;
        default:
            throw new Error("invalid direction");
    }
};

exports.insertBesideSiblingBy = insertBesideSiblingBy;
