import { describe, expect, test } from "@jest/globals";

import { hasChildren } from "../operators/hasChildren";

describe("hasChildren", () => {
  test("node의 자식이 배열이면서 길이가 1 이상인 경우, true를 반환한다.", () => {
    const ops = {
      childrenKey: "children",
    };
    const node = { [ops.childrenKey]: [{ name: "children 1-1" }] };

    expect(hasChildren(ops, node)).toEqual(true);
  });

  test("node의 자식이 빈 배열인 경우, false를 반환한다.", () => {
    const ops = {
      childrenKey: "children",
    };
    const node = { [ops.childrenKey]: [] };

    expect(hasChildren(ops, node)).toEqual(false);
  });

  test("node가 객체 타입이 아닌 경우, error를 throw한다", () => {
    const ops = {
      childrenKey: "children",
    };
    const node = `Invalid node type`;

    expect(() => hasChildren(ops, node)).toThrow();
  });

  test("node의 자식 prop이 존재하지 않는 경우, error를 throw한다.", () => {
    const node = {};

    expect(() =>
      hasChildren({ childrenKey: "Invalid children key" }, node),
    ).toThrow();
  });
});
