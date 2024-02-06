'use strict';

var operators_mapBy = require('./mapBy.js');
var _internal_store = require('../_internal/store.js');
var _internal_typeCheck = require('../_internal/typeCheck.js');

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const R = require("ramda");
const insertFromParentBy = R.curry((ops, predicate, newNodeOrNodes, nodes) => {
    const store = _internal_store.Store({ isInserted: false });
    const result = operators_mapBy.mapBy(ops, predicate, R.ifElse(() => R.equals(false, store.get().isInserted), R.pipe(R.tap(() => {
        store.update({ isInserted: true });
    }), R.over(R.lensProp(ops.childrenKey), insertAt(ops?.at ?? "last", newNodeOrNodes))), R.identity), nodes);
    const isInserted = store.get().isInserted;
    if (!isInserted)
        throw new Error("Node is not inserted");
    return result;
});
// @TODO: 함수 합성으로 내부 구현
// @TODO: error 예외 문구 수정
const insertAt = (at, newNodes) => (nodes) => {
    if (_internal_typeCheck.isNonArrayTypeObject(newNodes)) {
        newNodes = [newNodes];
    }
    if (at === "first")
        return R.concat(newNodes, nodes);
    else if (at === "last")
        return R.concat(nodes, newNodes);
    else if (at < 0 || at > nodes.length)
        throw new Error(`@TODO: 추후 정의 1 ${at}, ${JSON.stringify(newNodes)}, ${JSON.stringify(nodes)}`);
    else if (typeof at === "number")
        return R.insertAll(at, newNodes, nodes);
    throw new Error("@TODO: 추후 정의 2");
};

exports.insertFromParentBy = insertFromParentBy;
