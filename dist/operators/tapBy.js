'use strict';

var operators_tap = require('./tap.js');
var _internal_counter = require('../_internal/counter.js');

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const R = require("ramda");
const defaultOps = {
    childrenKey: "children",
    applyTimesBoundary: [0, Infinity],
};
// @TODO: 에러 문구 영문화
// @TODO: 에러 쓰로우 로직 또한 개별적으로 함수 합성을 통해서, 람다식만으로 해당 로직을 구현할수 있도록 하자
const tapBy = R.curry((ops, predicate, tapFn, nodes) => {
    ops = { ...defaultOps, ...ops };
    const [minApplyTimes, maxApplyTimes] = ops.applyTimesBoundary;
    if (R.lte(maxApplyTimes, 0)) {
        throw new Error(`오류: 매개 변수 applyTimesBoundary[1]의 값 (${maxApplyTimes}는 0보다 커야 합니다. applyTimesBoundary[1] 값을 확인하거나 조정해 주세요.`);
    }
    const counter = _internal_counter.createCounter();
    const result = operators_tap.tap(ops, R.when(R.both(predicate, R.pipe(counter.getCount, R.lt(R.__, maxApplyTimes))), R.pipe(tapFn, R.tap(() => counter.up()))), nodes);
    const totalApplyTimes = counter.getCount();
    if (R.lt(totalApplyTimes, minApplyTimes)) {
        throw new Error(`오류: 최소한 총 map 적용 횟수(${totalApplyTimes})는 매개 변수 applyTimesBoundary[0]의 값 (${minApplyTimes})와 동일하거나 커야 합니다. applyTimesBoundary[0] 값을 확인하거나 조정해 주세요.`);
    }
    return result;
});

exports.tapBy = tapBy;
