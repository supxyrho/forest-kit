import { describe, expect, test } from "@jest/globals";

import { ensureArray } from "../operators/ensureArray";

describe("ensureArray", () => {
  test("undefined인 경우, 빈 배열을 반환한다.", () => {
    expect(ensureArray(undefined)).toEqual([]);
  });

  test("Array인 경우, 그대로 반환한다.", () => {
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

    expect(ensureArray(originalNodes)).toEqual(originalNodes);
  });

  test("Object 타입인 경우, Array로 래핑 후 반환한다.", () => {
    const originalNode = { name: "something", children: [] };
    expect(ensureArray(originalNode)).toEqual([originalNode]);
  });
});
