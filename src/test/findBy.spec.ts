import { describe, expect, test } from "@jest/globals";

import { findBy } from "../operators/findBy";

describe("find", () => {
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
    expect(() => findBy(opc, () => true, originalNodes)).toThrow();
  });

  test("최대 find 적용 횟수가 1인 경우, 최대 1번만 특정 조건을 만족하는 node에 적용된다. ", () => {
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
      applyTimesBoundary: [0, 1],
    };
    const predicate = (node) => ["1-1-1-1"].includes(node.name);
    const expectedNode = [expect.objectContaining({ name: "1-1-1-1" })];
    expect(findBy(opc, predicate, originalNodes)).toEqual(expectedNode);
  });

  // @TODO: 추후 test blockName 개선
  test("다중 find ... 생략 ", () => {
    const childrenKey = "children";

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
      childrenKey,
      applyTimesBoundary: [0, Infinity],
    };
    const predicate = (node) =>
      ["1", "1-1", "1-1-1", "1-1-1-1"].includes(node.name);
    const expectedNodes = [
      expect.objectContaining({ name: "1" }),
      expect.objectContaining({ name: "1-1" }),
      expect.objectContaining({ name: "1-1-1" }),
      expect.objectContaining({ name: "1-1-1-1" }),
    ];

    expect(findBy(opc, predicate, originalNodes)).toEqual(
      expect.arrayContaining(expectedNodes),
    );
  });

  test("최소 filter 적용 횟수가 100인 경우, 실제 find 적용횟수가 미달일 시, error를 throw한다. ", () => {
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
    expect(() => findBy(opc, predicate, originalNodes)).toThrow();
  });
});
