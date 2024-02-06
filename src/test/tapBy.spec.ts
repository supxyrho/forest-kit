import { describe, expect, test, jest } from "@jest/globals";

import { tapBy } from "../operators/tapBy";

const R = require("ramda");

describe("tapBy", () => {
  // @TODO: 추후 테스트 코드 blockName을 기획단게의 추상화 수준으로 변경
  test("설정상 최대 적용 횟수가 0인 경우, error를 throw한다.", () => {
    const originalNodes = [
      {
        name: "1",
        children: [
          {
            name: "1-1",
            children: [
              {
                name: "1-1-1",
                children: [
                  { name: "1-1-1-1", children: [] },
                  { name: "1-1-1-2", children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", children: [] },
        ],
      },
      {
        name: "1-2",
        children: [
          {
            name: "1-2-1",
            children: [
              { name: "1-2-1-1", children: [] },
              { name: "1-2-1-2", children: [] },
            ],
          },
          { name: "1-2-2", children: [] },
        ],
      },
      { name: "1-3", children: [] },
    ];

    const ops = {
      childrenKey: "children",
      applyTimesBoundary: [0, 0],
    };

    expect(() => tapBy(ops, R.T, () => "nothing", originalNodes)).toThrow();
  });

  test("설정상 최대 적용 횟수가 1인 경우, 최대 1번만 tap이 특정 조건을 만족하는 node에 적용된다. ", () => {
    const originalNodes = [
      {
        name: "1",
        children: [
          {
            name: "1-1",
            children: [
              {
                name: "1-1-1",
                children: [
                  { name: "1-1-1-1", children: [] },
                  { name: "1-1-1-2", children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", children: [] },
        ],
      },
      {
        name: "1-2",
        children: [
          {
            name: "1-2-1",
            children: [
              { name: "1-2-1-1", children: [] },
              { name: "1-2-1-2", children: [] },
            ],
          },
          { name: "1-2-2", children: [] },
        ],
      },
      { name: "1-3", children: [] },
    ];

    const ops = {
      childrenKey: "children",
      applyTimesBoundary: [0, 1],
    };
    const callback = jest.fn(R.identity);
    tapBy(ops, R.T, callback, originalNodes);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("설정상 최대 적용 횟수가 5인 경우, 최대 5번만 tap이 특정 조건을 만족하는 node에 적용된다. ", () => {
    const originalNodes = [
      {
        name: "1",
        children: [
          {
            name: "1-1",
            children: [
              {
                name: "1-1-1",
                children: [
                  { name: "1-1-1-1", children: [] },
                  { name: "1-1-1-2", children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", children: [] },
        ],
      },
      {
        name: "1-2",
        children: [
          {
            name: "1-2-1",
            children: [
              { name: "1-2-1-1", children: [] },
              { name: "1-2-1-2", children: [] },
            ],
          },
          { name: "1-2-2", children: [] },
        ],
      },
      { name: "1-3", children: [] },
    ];

    const ops = {
      childrenKey: "children",
      applyTimesBoundary: [0, 5],
    };
    const callback = jest.fn(R.identity);
    const predicate = (node) =>
      ["1", "1-1", "1-1-1", "1-1-1-1", "1-1-1-2"].includes(node.name);
    tapBy(ops, predicate, callback, originalNodes);
    expect(callback).toHaveBeenCalledTimes(5);
  });

  test("설정 상 최소적용 횟수가 5인 경우, 실제 tapBy 적용횟수가 5를 넘는 경우, error를 throw한다. ", () => {
    const originalNodes = [
      {
        name: "1",
        children: [
          {
            name: "1-1",
            children: [
              {
                name: "1-1-1",
                children: [
                  { name: "1-1-1-1", children: [] },
                  { name: "1-1-1-2", children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", children: [] },
        ],
      },
      {
        name: "1-2",
        children: [
          {
            name: "1-2-1",
            children: [
              { name: "1-2-1-1", children: [] },
              { name: "1-2-1-2", children: [] },
            ],
          },
          { name: "1-2-2", children: [] },
        ],
      },
      { name: "1-3", children: [] },
    ];

    const ops = {
      childrenKey: "children",
      applyTimesBoundary: [5, 2],
    };
    const callback = jest.fn(R.identity);
    expect(() => tapBy(ops, R.always(true), callback, originalNodes)).toThrow();
  });
});
