import { describe, expect, test } from "@jest/globals";

import { reduce} from "../operators/reduce";

describe("reduce", () => {
  test("모든 노드를 순차적으로 순회하면서 각 트리 내 value를 합산한다..", () => {
    const childrenKey = "children";
    const originalNodes = [
      {
        name: "1",
        value: 1,
        children: [
          {
            name: "1-1",
            value: 2,
            children: [
              {
                name: "1-1-1",
                value: 3,
                children: [
                  { name: "1-1-1-1", value: 4, children: [] },
                  { name: "1-1-1-2", value: 5, children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", value: 6, children: [] },
        ],
      },
      {
        name: "1-2",
        value: 7,
        children: [
          {
            name: "1-2-1",
            value: 8,
            children: [
              { name: "1-2-1-1", value: 9, children: [] },
              { name: "1-2-1-2", value: 10, children: [] },
            ],
          },
          { name: "1-2-2", value: 11, children: [] },
        ],
      },
      { name: "1-3", value: 12, children: [] },
    ];

    const opc = { childrenKey };
    const reducer= (acc, treeNode) => acc + treeNode.value;
    expect(reduce(opc, reducer, 0, originalNodes)).toEqual(78);
  });
});
