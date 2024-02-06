import { describe, expect, test } from "@jest/globals";

import { everyOnLeafNodes } from "../operators/everyOnLeafNodes";

const R = require("ramda");

describe("everyOnLeafNodes", () => {
  test("특정 단말 노드가 특정 조건을 만족하지 않으면, false를 반환한다.", () => {
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

    const ops = { childrenKey };
    expect(everyOnLeafNodes(ops, condition, originalNodes)).toEqual(false);
  });

  test("모든 단말 노드가 특정 조건을 만족하면, true를 반환한다.", () => {
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

    const ops = { childrenKey };
    const condition = R.is(Object);
    expect(everyOnLeafNodes(ops, condition, originalNodes)).toEqual(true);
  });
});
