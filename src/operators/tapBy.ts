/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { tap } from "./tap";

import { type TOperatorConfig } from "../_internal/type";

import { createCounter } from "../_internal/counter";

const R = require("ramda");

const defaultOps: TOperatorConfig = {
  childrenKey: "children",
  applyTimesBoundary: [0, Infinity],
};

// @TODO: 에러 문구 영문화
// @TODO: 에러 쓰로우 로직 또한 개별적으로 함수 합성을 통해서, 람다식만으로 해당 로직을 구현할수 있도록 하자
export const tapBy = R.curry(
  <TNode>(
    opc: TOperatorConfig,
    predicate: (node: TNode) => boolean,
    tapFn: (node: TNode) => void,
    nodes: TNode[],
  ): TNode[] => {
    opc = { ...defaultOps, ...opc };
    const [minApplyTimes, maxApplyTimes] = opc.applyTimesBoundary;

    if (R.lte(maxApplyTimes, 0)) {
      throw new Error(
        `오류: 매개 변수 applyTimesBoundary[1]의 값 (${maxApplyTimes}는 0보다 커야 합니다. applyTimesBoundary[1] 값을 확인하거나 조정해 주세요.`,
      );
    }

    const counter = createCounter();
    const result = tap(
      opc,
      R.when(
        R.both(predicate, R.pipe(counter.getCount, R.lt(R.__, maxApplyTimes))),
        R.pipe(
          tapFn,
          R.tap(() => counter.up()),
        ),
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
