import { describe, expect, test } from "@jest/globals";

import { findManyByStartsWithTreeNodePath } from "../operators/findManyByStartsWithTreeNodePath";

describe("findManyByStartsWithTreeNodePath", () => {
  test("각각의 노드를 대상으로, 트리 경로를 부여한다.", () => {
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
          { name: "1-2", children: [] },
        ],
      },
      {
        name: "2",
        children: [
          {
            name: "2-1",
            children: [
              { name: "2-1-1", children: [] },
              { name: "2-1-2", children: [] },
            ],
          },
          { name: "2-2", children: [] },
        ],
      },
      { name: "3", children: [] },
    ];

    const expectedNodes = [
          {
            name: "2-1",
            treeNodePath: "2/2-1",
            children: [
              { name: "2-1-1", treeNodePath: "2/2-1/2-1-1", children: [] },
              { name: "2-1-2", treeNodePath: "2/2-1/2-1-2", children: [] },
            ],
          },
          { name: "2-1-1", treeNodePath: "2/2-1/2-1-1", children: [] },
          { name: "2-1-2", treeNodePath: "2/2-1/2-1-2", children: [] },
    ];

    const ops = { childrenKey: "children" };
    expect(
      findManyByStartsWithTreeNodePath(ops, "2/2-1", "name", originalNodes)
    ).toEqual(expectedNodes);
  });
});
