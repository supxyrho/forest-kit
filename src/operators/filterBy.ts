/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { filter } from "./filter";

import { type TOperatorSettings } from "../_internal/type";

import { createCounter } from "../_internal/counter";

const R = require("ramda");

const defaultOps: TOperatorSettings = {
  childrenKey: "children",
  applyTimesBoundary: [0, Infinity],
};

// @TODO: 에러 문구 영문화
// @TODO: 에러 쓰로우 로직 또한 개별적으로 함수 합성을 통해서, 람다식만으로 해당 로직을 구현할수 있도록 하자
export const filterBy = R.curry(
  <TNode>(
    ops: TOperatorSettings,
    predicate: (node: TNode) => boolean,
    nodes: TNode[],
  ): TNode[] => {
    ops = { ...defaultOps, ...ops };
    const [minApplyTimes, maxApplyTimes] = ops.applyTimesBoundary;

    if (R.lte(maxApplyTimes, 0)) {
      throw new Error(
        `오류: 매개 변수 applyTimesBoundary[1]의 값 (${maxApplyTimes}는 0보다 커야 합니다. applyTimesBoundary[1] 값을 확인하거나 조정해 주세요.`,
      );
    }

    const counter = createCounter();
    const result = filter(
      ops,
      applyPredicateWithLimit(
        maxApplyTimes,
        counter.getCount,
        counter.up,
        predicate,
      ),
      nodes,
    );

    const totalApplyTimes = counter.getCount();
    if (R.lt(totalApplyTimes, minApplyTimes)) {
      throw new Error(
        `오류: 최소한 총 map 적용 횟수(${totalApplyTimes})는 매개 변수 applyTimesBoundary[0]의 값 (${minApplyTimes})와 동일하거나 커야 합니다. applyTimesBoundary[0] 값을 확인하거나 조정해 주세요.`,
      );
    }

    return result;
  },
);

const applyPredicateWithLimit = R.curry(
  (maxCount, getCount, countUp, predicate) =>
    R.pipe(
      R.both(predicate, () => R.lt(getCount(), maxCount)),
      R.when(
        R.equals(R.T()),
        R.tap(() => countUp()),
      ),
      R.not,
    ),
);
