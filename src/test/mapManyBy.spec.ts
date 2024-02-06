import { describe, expect, test } from "@jest/globals";

import { mapManyBy } from "../operators/mapManyBy";

// @TODO: 테스트 케이스 추가
describe("mapManyBy", () => {
  test("특정 조건의 모든 노드에 대해서, 새 prop과 value를 추가한다. ", () => {
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
                newKey: "newValue",
                children: [
                  { name: "1-1-1-1", newKey: "newValue", children: [] },
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
    };
    const predicate = (node) => ["1-1", "1-1-1", "1-1-1-1"].includes(node.name);
    const mapFunction = (node) => ({ ...node, newKey: "newValue" });
    expect(mapManyBy(ops, predicate, mapFunction, originalNodes)).toEqual(
      expectedNodes,
    );
  });
});
