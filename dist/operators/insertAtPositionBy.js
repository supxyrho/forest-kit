'use strict';

var operators_addPositionPropToEachNode = require('./addPositionPropToEachNode.js');
var operators_insertFromParentBy = require('./insertFromParentBy.js');
var operators_removePropToEachNode = require('./removePropToEachNode.js');

const R = require("ramda");
const insertAtPosition = R.curry((ops, position, newNodeOrNodes, nodes) => {
    const nodesWithPosition = operators_addPositionPropToEachNode.addPositionPropToEachNode(ops, "position", nodes);
    // @TODO: apply FP (functor or monad)
    const tmp = position?.split(".");
    // 1depth에 대한 예외처리
    const tmpIdx = Number(tmp?.pop() ?? 0) - 1;
    const parentPosition = tmp.join(".");
    ops = {
        ...ops,
        at: incOrDecByDirection(String(ops?.at ?? "current"), tmpIdx),
    };
    return R.pipe(operators_insertFromParentBy.insertFromParentBy(ops, R.propEq(parentPosition, "position"), newNodeOrNodes), operators_removePropToEachNode.removePropToEachNode(ops, "position"))(nodesWithPosition);
});
const incOrDecByDirection = (direction, number) => {
    switch (direction) {
        case "left":
            if (number === 0) {
                // @TODO: 0 or throw Error?
                return 0;
            }
            return number - 1;
        case "current":
            return number;
        // @TODO: right가 범위를 벗어나는 경우에 대한 예외 처리 및 관련 테스트 케이스 추가
        case "right":
            return number + 1;
        default:
            throw new Error("invalid direction");
    }
};

exports.insertAtPosition = insertAtPosition;
