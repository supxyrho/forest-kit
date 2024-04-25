import { describe, expect, test } from "@jest/globals";

import { some } from "../operators/some";

describe("some", () => {
  test("모든 노드가 조건을 만족하지 않으면, false를 반환한다.", () => {
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

    const condition = (node) => node.name === "not exist";

    const opc = { childrenKey };
    expect(some(opc, condition, originalNodes)).toEqual(false);
  });

  test("특정 노드가 조건을 만족하면, true를 반환한다.", () => {
    const childrenKey = "children";
    const originalNodes = [
      { name: "1", children: [] },
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

    const opc = { childrenKey };
    const condition = (node) => node.name === "2-1-2";
    expect(some(opc, condition, originalNodes)).toEqual(true);
  });
});
