import { describe, expect, test } from "@jest/globals";

import { filterOneBy } from "../operators/filterOneBy";

// @TODO: 테스트 케이스 추가
describe("filterOneBy", () => {
  test("특정 조건을 만족시키는 단일 노드를 삭제한다. ", () => {
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
        children: [{ name: "1-1-2", children: [] }],
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
    const predicate = (node) => ["1-1"].includes(node.name);
    expect(filterOneBy(ops, predicate, originalNodes)).toEqual(expectedNodes);
  });
});
