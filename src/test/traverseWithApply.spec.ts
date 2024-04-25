import { describe, expect, test, jest } from "@jest/globals";

import { traverseWithApply } from "../operators/traverseWithApply";

const R = require("ramda");

describe("traverseWithApply", () => {
  test("각각의 노드에 대해서, 콜백 함수를 호출한다.", () => {
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

    const callback = jest.fn(R.identity);
    const opc = {
      childrenKey: "children",
    };
    traverseWithApply(opc, callback, originalNodes);
    expect(callback).toHaveBeenCalledTimes(12);
  });

  test("빈 배열인 경우, 콜백 함수를 호출하지 않으며 빈 배열을 반환한다", () => {
    const callback = jest.fn(R.identity);
    const opc = {
      childrenKey: "children",
    };
    expect(traverseWithApply(opc, callback, [])).toEqual([]);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test("undefined인 경우, error를 throw한다.", () => {
    const opc = {
      childrenKey: "children",
    };
    expect(() => traverseWithApply(opc, R.identity, undefined)).toThrow();
  });
});
