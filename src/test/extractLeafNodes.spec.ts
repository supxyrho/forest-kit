import { describe, expect, test } from "@jest/globals";

import { extractLeafNodes } from "../operators/extractLeafNodes";

describe("extractLeafNodes", () => {
  test("모든 단말 노드를 반환한다.", () => {
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
      { name: "1-1-1-1", children: [] },
      { name: "1-1-1-2", children: [] },
      { name: "1-1-2", children: [] },
      { name: "1-2-1-1", children: [] },
      { name: "1-2-1-2", children: [] },
      { name: "1-2-2", children: [] },
      { name: "1-3", children: [] },
    ];

    const opc = { childrenKey };
    expect(extractLeafNodes(opc, originalNodes)).toEqual(expectedNodes);
  });

  test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
    const childrenKey = "children";
    const opc = { childrenKey };
    expect(extractLeafNodes(opc, [])).toEqual([]);
  });
});
