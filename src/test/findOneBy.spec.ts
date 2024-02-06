import { describe, expect, test } from "@jest/globals";

import { findOneBy } from "../operators/findOneBy";

// @TODO: 테스트 케이스 추가
describe("findOneBy", () => {
  // @TODO: 추후 test blockName 개선
  test("단일 find ... 생략 ", () => {
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

    const ops = {
      childrenKey,
    };
    const predicate = (node) =>
      ["1", "1-1", "1-1-1", "1-1-1-1"].includes(node.name);
    const expectedNode = expect.objectContaining({ name: "1" });
    expect(findOneBy(ops, predicate, originalNodes)).toEqual(expectedNode);
  });
});
