import { describe, expect, test, jest } from "@jest/globals";

import { tapManyBy } from "../operators/tapManyBy";

const R = require("ramda");

// @TODO: 테스트 케이스 추가
describe("tapManyBy", () => {
  test("설정 상 최대 5번 적용 가능 시, 5번만 tap이 적용된다. ", () => {
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

    const opc = {
      childrenKey: "children",
    };
    const predicate = (node) =>
      ["1", "1-1", "1-1-1", "1-1-1-1", "1-1-1-2"].includes(node.name);
    const callback = jest.fn(R.identity);
    tapManyBy(opc, predicate, callback, originalNodes);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});
