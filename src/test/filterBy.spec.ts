import { describe, expect, test } from "@jest/globals";

import { filterBy } from "../operators/filterBy";

// @TODO: 테스트 케이스 추가
describe("filterBy", () => {
  // @TODO: 추후 테스트 코드 blockName을 기획단게의 추상화 수준으로 변경
  test("최대 filter 적용 횟수가 0인 경우, error를 throw한다.", () => {
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

    const opc = {
      childrenKey: "children",
      applyTimesBoundary: [0, 0],
    };
    expect(() => filterBy(opc, () => true, originalNodes)).toThrow();
  });

  test("최대 filter 적용 횟수가 1인 경우, 최대 1번만 특정 조건을 만족하는 node에 적용된다. ", () => {
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

    const expectedNodes = [
      {
        name: "1",
        children: [
          {
            name: "1-1",
            children: [
              {
                name: "1-1-1",
                children: [
                  // { name: "1-1-1-1", children: [] },
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

    const opc = {
      childrenKey: "children",
      applyTimesBoundary: [0, 1],
    };
    const predicate = (node) =>
      ["1-1-1-1", "1-1-1-2", "1-2-1-1", "1-2-1-2"].includes(node.name);
    expect(filterBy(opc, predicate, originalNodes)).toEqual(expectedNodes);
  });

  test("최소 filter 적용 횟수가 100인 경우, 실제 map 적용횟수가 미달일 시, error를 throw한다. ", () => {
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

    const opc = {
      childrenKey: "children",
      applyTimesBoundary: [100, Infinity],
    };
    const predicate = (node) =>
      ["1-1-1-1", "1-1-1-2", "1-2-1-1", "1-2-1-2"].includes(node.name);
    expect(() => filterBy(opc, predicate, originalNodes)).toThrow();
  });
});
