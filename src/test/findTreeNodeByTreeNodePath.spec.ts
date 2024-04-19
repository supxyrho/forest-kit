import { describe, expect, test } from "@jest/globals";

import { findTreeNodeByTreeNodePath } from "../operators/findTreeNodeByTreeNodePath";

describe("findTreeNodeByTreeNodePath", () => {
  test("주어진 트리 경로와 일치하는 트리를 탐색하여 반환한다.", () => {
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
            treeNodePath: "2-1",
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

    const expectedNodes = 
      {
        name: "1-1-1",
        treeNodePath: "1/1-1/1-1-1",
        children: [
          {
            name: "1-1-1-1",
            treeNodePath: "1/1-1/1-1-1/1-1-1-1",
            children: [],
          },
          {
            name: "1-1-1-2",
            treeNodePath: "1/1-1/1-1-1/1-1-1-2",
            children: [],
          },
        ],
      }

    const ops = { childrenKey: "children" };
    expect(
      findTreeNodeByTreeNodePath(ops, "1/1-1/1-1-1", "name", originalNodes)
    ).toEqual(expectedNodes);
  });
});
