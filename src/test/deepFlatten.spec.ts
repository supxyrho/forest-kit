import { describe, expect, test } from "@jest/globals";

import { deepFlatten } from "../operators/deepFlatten";

describe("deepFlatten", () => {
  test("다중 root node를 가진 배열에 대해서, 순차적이면서, 전위순회 순서로 1depth 형식의 node의 배열을 반환한다. ", () => {
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
      expect.objectContaining({ name: "1" }),
      expect.objectContaining({ name: "1-1" }),
      expect.objectContaining({ name: "1-1-1" }),
      expect.objectContaining({ name: "1-1-1-1" }),
      expect.objectContaining({ name: "1-1-1-2" }),
      expect.objectContaining({ name: "1-1-2" }),
      expect.objectContaining({ name: "1-2" }),
      expect.objectContaining({ name: "1-2-1" }),
      expect.objectContaining({ name: "1-2-1-1" }),
      expect.objectContaining({ name: "1-2-1-2" }),
      expect.objectContaining({ name: "1-2-2" }),
      expect.objectContaining({ name: "1-3" }),
    ];

    const opc = { childrenKey };
    expect(deepFlatten(opc, originalNodes)).toEqual(expectedNodes);
  });

  test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
    const childrenKey = "children";
    const originalNodes = [];

    const opc = { childrenKey };
    expect(deepFlatten(opc, originalNodes)).toEqual([]);
  });

  test("배열 타입이 아닌 경우, error를 throw한다", () => {
    const childrenKey = "children";
    const originalNodes = `Invalid node type`;

    const opc = { childrenKey };
    expect(() => deepFlatten(opc, originalNodes)).toThrow();
  });

  test("자식 prop이 존재하지 않는 경우, error를 throw한다.", () => {
    const childrenKey = "children";
    const originalNodes = [{}];

    const opc = { childrenKey };
    expect(() => deepFlatten(opc, originalNodes)).toThrow();
  });
});
