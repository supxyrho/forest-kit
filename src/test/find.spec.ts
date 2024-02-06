import { describe, expect, test } from "@jest/globals";

import { find } from "../operators/find";

describe("find", () => {
  test("특정 조건의 노드를 찾으면, 해당 노드를 반환한다.", () => {
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

    const ops = { childrenKey };
    const expectedNode = [expect.objectContaining({ name: "1-1" })];
    expect(find(ops, (node) => node.name === "1-1", originalNodes)).toEqual(
      expectedNode,
    );
  });

  test("특정 조건의 노드가 존재하지 않으면, 빈 배열 반환한다.", () => {
    const childrenKey = "children";

    const originalNodes = [
      { name: "1", children: [] },
      { name: "2", children: [] },
      { name: "3", children: [] },
    ];

    const ops = { childrenKey };
    expect(
      find(ops, (node) => node.name === "not exist", originalNodes),
    ).toEqual([]);
  });
});
