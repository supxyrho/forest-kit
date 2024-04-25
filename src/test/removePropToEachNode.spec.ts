import { describe, expect, test } from "@jest/globals";

import { removePropToEachNode } from "../operators/removePropToEachNode";

describe("removePropToEachNode", () => {
  test("각각의 노드에 대해서, 특정 prop을 제거한다", () => {
    const childrenKey = "children";
    const originalNodes = [
      {
        name: "1",
        seq: 1,
        children: [
          {
            name: "1-1",
            seq: 2,
            children: [
              {
                name: "1-1-1",
                seq: 3,
                children: [
                  { name: "1-1-1-1", seq: 4, children: [] },
                  { name: "1-1-1-2", seq: 5, children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", seq: 6, children: [] },
        ],
      },
      {
        name: "1-2",
        seq: 7,
        children: [
          {
            name: "1-2-1",
            seq: 8,
            children: [
              { name: "1-2-1-1", seq: 9, children: [] },
              { name: "1-2-1-2", seq: 10, children: [] },
            ],
          },
          { name: "1-2-2", seq: 11, children: [] },
        ],
      },
      { name: "1-3", seq: 12, children: [] },
    ];

    const expectedNodes = [
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
    expect(removePropToEachNode(opc, "seq", originalNodes)).toEqual(
      expectedNodes,
    );
  });

  test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
    const opc = { childrenKey: "children" };
    expect(removePropToEachNode(opc, "seq", [])).toEqual([]);
  });
});
