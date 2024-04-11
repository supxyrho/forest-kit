import { describe, expect, test } from "@jest/globals";

import { addTreePathPropToEachNode } from "../operators/addTreePathPropToEachNode";

describe("addTreePathPropToEachNode", () => {
  test("각각의 노드에 대해서, 트리 경로를 부여한다.", () => {
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
            treePath: "2-1",
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
        name: "1",
        treePath: "1",
        children: [
          {
            name: "1-1",
            treePath: "1/1-1",
            children: [
              {
                name: "1-1-1",
                treePath: "1/1-1/1-1-1",
                children: [
                  {
                    name: "1-1-1-1",
                    treePath: "1/1-1/1-1-1/1-1-1-1",
                    children: [],
                  },
                  { name: "1-1-1-2", treePath: "1/1-1/1-1-1/1-1-1-2", children: [] },
                ],
              },
            ],
          },
          { name: "1-2", treePath: "1/1-2", children: [] },
        ],
      },
      {
        name: "2",
        treePath: "2",
        children: [
          {
            name: "2-1",
            treePath: "2/2-1",
            children: [
              { name: "2-1-1", treePath: "2/2-1/2-1-1", children: [] },
              { name: "2-1-2", treePath: "2/2-1/2-1-2", children: [] },
            ],
          },
          { name: "2-2", treePath: "2/2-2", children: [] },
        ],
      },
      { name: "3", treePath: "3", children: [] },
    ];

    const ops = { childrenKey: "children" };
    expect(addTreePathPropToEachNode(ops, "treePath", "name", "/", originalNodes)).toEqual(
      expectedNodes,
    );
  });
});
