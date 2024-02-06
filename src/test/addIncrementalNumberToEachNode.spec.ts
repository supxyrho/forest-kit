import { describe, expect, test } from "@jest/globals";

import { addIncrementalNumberToEachNode } from "../operators/addIncrementalNumberToEachNode";

describe("addSequencePropEachNode", () => {
  test("각각의 노드에 대해서, 전위 순회 방식으로 지정된 sequnce prop으로 순차적인 증가 값이 할당된다.", () => {
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

    const ops = { childrenKey: "children" };
    expect(
      addIncrementalNumberToEachNode(ops, 0, "seq", originalNodes),
    ).toEqual(expectedNodes);
  });
});
