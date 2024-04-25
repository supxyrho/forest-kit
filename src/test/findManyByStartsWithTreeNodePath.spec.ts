import { describe, expect, test } from "@jest/globals";

import { findManyByStartsWithTreeNodePath } from "../operators/findManyByStartsWithTreeNodePath";

describe("findManyByStartsWithTreeNodePath", () => {
  test("treeNodePath를 포함하는 모든 트리 노드를 반환한다.", () => {
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

    const opc = { childrenKey: "children" };
    expect(
      findManyByStartsWithTreeNodePath(opc, "2/2-1", "name", originalNodes)
    ).toEqual(expectedNodes);
  });
});
