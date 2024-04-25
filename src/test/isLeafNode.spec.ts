import { describe, expect, test } from "@jest/globals";

import { isLeafNode } from "../operators/isLeafNode";

describe("isLeafNode", () => {
  test("node의 자식이 배열이면서 길이가 0인 경우, true를 반환한다.", () => {
    const childrenKey = "children";
    const node = { [childrenKey]: [] };

    const opc = { childrenKey };
    expect(isLeafNode(opc, node)).toEqual(true);
  });

  test("node의 자식이 배열이면서 길이가 1 이상인 경우, false를 반환한다.", () => {
    const childrenKey = "children";
    const node = { [childrenKey]: [{ name: "children 1-1" }] };

    const opc = { childrenKey };
    expect(isLeafNode(opc, node)).toEqual(false);
  });

  test("node가 객체 타입이 아닌 경우, error를 throw한다", () => {
    const childrenKey = "children";
    const node = `Invalid node type`;

    const opc = { childrenKey };
    expect(() => isLeafNode(opc, node)).toThrow();
  });

  test("node의 자식 prop이 존재하지 않는 경우, error를 throw한다.", () => {
    const node = {};

    const opc = { childrenKey: "Invalid children key" };
    expect(() => isLeafNode(opc, node)).toThrow();
  });
});
