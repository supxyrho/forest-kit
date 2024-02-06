import { describe, expect, test } from "@jest/globals";

import { extractNDepthNodes } from "../operators/extractNDepthNodes";

describe("extractNDepthNodes", () => {
  test("특정 계층의 모든 노드를 반환한다.", () => {
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
      {
        name: "1-1-1",
        children: [
          { name: "1-1-1-1", children: [] },
          { name: "1-1-1-2", children: [] },
        ],
      },
      { name: "1-2-1-1", children: [] },
      { name: "1-2-1-2", children: [] },
    ];

    const ops = { childrenKey };
    expect(extractNDepthNodes(ops, 2, originalNodes)).toEqual(expectedNodes);
  });
});
