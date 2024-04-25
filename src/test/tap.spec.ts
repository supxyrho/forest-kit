import { describe, expect, test, jest } from "@jest/globals";

import { tap } from "../operators/tap";

const R = require("ramda");

describe("tap", () => {
  test("각각의 노드에 대해서, 콜백 함수를 호출한다.", () => {
    const childrenKey = "children";
    const originalNodes = [
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

    const opc = { childrenKey };
    const callback = jest.fn(R.identity);
    tap(opc, callback, originalNodes);
    expect(callback).toHaveBeenCalledTimes(12);
  });
});
