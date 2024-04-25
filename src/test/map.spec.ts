import { describe, expect, test } from "@jest/globals";

import { map } from "../operators/map";

describe("map", () => {
  test("각각의 노드에 대해서, 새 prop과 value를 추가한다", () => {
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
        newKey: "newValue",
        children: [
          {
            name: "1-1",
            newKey: "newValue",
            children: [
              {
                name: "1-1-1",
                newKey: "newValue",
                children: [
                  { name: "1-1-1-1", newKey: "newValue", children: [] },
                  { name: "1-1-1-2", newKey: "newValue", children: [] },
                ],
              },
            ],
          },
          { name: "1-1-2", newKey: "newValue", children: [] },
        ],
      },
      {
        name: "1-2",
        newKey: "newValue",
        children: [
          {
            name: "1-2-1",
            newKey: "newValue",
            children: [
              { name: "1-2-1-1", newKey: "newValue", children: [] },
              { name: "1-2-1-2", newKey: "newValue", children: [] },
            ],
          },
          { name: "1-2-2", newKey: "newValue", children: [] },
        ],
      },
      { name: "1-3", newKey: "newValue", children: [] },
    ];

    const opc = { childrenKey: "children" };
    const mapFunction = (node) => ({ ...node, newKey: "newValue" });
    expect(map(opc, mapFunction, originalNodes)).toEqual(expectedNodes);
  });

  test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
    const opc = { childrenKey: "children" };
    expect(map(opc, () => "newValue", [])).toEqual([]);
  });

  test("undefined인 경우, error를 throw한다.", () => {
    const opc = { childrenKey: "children" };
    expect(() => map(opc, () => "newValue", undefined)).toThrow();
  });
});