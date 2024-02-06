import { describe, expect, test } from "@jest/globals";

import { addPositionPropToEachNode } from "../operators/addPositionPropToEachNode";

describe("addPositionPropToEachNode", () => {
  test("각각의 노드에 대해서, 전위 순회 방식으로 지정된 position prop의 값에 유니크한 값이 할당된다.", () => {
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
            position: "2-1",
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
        position: "1",
        children: [
          {
            name: "1-1",
            position: "1.1",
            children: [
              {
                name: "1-1-1",
                position: "1.1.1",
                children: [
                  {
                    name: "1-1-1-1",
                    position: "1.1.1.1",
                    children: [],
                  },
                  { name: "1-1-1-2", position: "1.1.1.2", children: [] },
                ],
              },
            ],
          },
          { name: "1-2", position: "1.2", children: [] },
        ],
      },
      {
        name: "2",
        position: "2",
        children: [
          {
            name: "2-1",
            position: "2.1",
            children: [
              { name: "2-1-1", position: "2.1.1", children: [] },
              { name: "2-1-2", position: "2.1.2", children: [] },
            ],
          },
          { name: "2-2", position: "2.2", children: [] },
        ],
      },
      { name: "3", position: "3", children: [] },
    ];

    const ops = { childrenKey: "children" };
    expect(addPositionPropToEachNode(ops, "position", originalNodes)).toEqual(
      expectedNodes,
    );
  });
});
