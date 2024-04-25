import { describe, expect, test } from "@jest/globals";

import { findManyBy } from "../operators/findManyBy";

// @TODO: 테스트 케이스 추가
describe("findManyBy", () => {
  test("특정 조건의 노드를 찾으면, 해당 조건을 만족하는 모든 노드를 반환한다.", () => {
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

    const expectedNodes = [
      expect.objectContaining({ name: "1-1-1" }),
      expect.objectContaining({ name: "1-1-1-1" }),
      expect.objectContaining({ name: "1-1-1-2" }),
    ];

    const opc = { childrenKey };
    const predicate = (node) =>
      ["1-1-1", "1-1-1-1", "1-1-1-2"].includes(node.name);
    expect(findManyBy(opc, predicate, originalNodes)).toEqual(expectedNodes);
  });

  test("특정 조건의 노드가 존재하지 않으면, 빈 배열을 반환한다.", () => {
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

    const opc = { childrenKey };
    const predicate = (node) => ["not exist"].includes(node.name);
    expect(findManyBy(opc, predicate, originalNodes)).toEqual([]);
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
    };
    const predicate = (node) =>
      ["1", "1-1", "1-1-1", "1-1-1-1"].includes(node.name);
    const expectedNodes = [
      expect.objectContaining({ name: "1" }),
      expect.objectContaining({ name: "1-1" }),
      expect.objectContaining({ name: "1-1-1" }),
      expect.objectContaining({ name: "1-1-1-1" }),
    ];
    expect(findManyBy(opc, predicate, originalNodes)).toEqual(expectedNodes);
  });
});
