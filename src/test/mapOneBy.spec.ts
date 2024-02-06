import { describe, expect, test } from "@jest/globals";

import { mapOneBy } from "../operators/mapOneBy";

const R = require("ramda");

// @TODO: 테스트 케이스 추가
describe("mapOnceBy", () => {
  test("특정 조건의 노드에 대해서, 새 prop과 value를 추가한다. ", () => {
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
            newKey: "newValue",
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
    const predicate = (node) => ["1-1"].includes(node.name);
    const mapFunction = (node) => ({ ...node, newKey: "newValue" });
    expect(mapOneBy(ops, predicate, mapFunction, originalNodes)).toEqual(
      expectedNodes,
    );
  });
});
