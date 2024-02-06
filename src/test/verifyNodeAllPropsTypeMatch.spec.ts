import { describe, expect, test } from "@jest/globals";

import { verifyNodeAllPropsTypeMatch } from "../operators/verifyNodeAllPropsTypeMatch"

// @TODO: undefined를 각 인자에 넣은 경우에 대한 테스트 케이스 추가
describe("verifyNodeAllPropsTypeMatch", () => {
  // @TODO: testName 개선
  test("true를 반환한다.", () => {
    const originalNode = { name: "something", children: [] };
    expect(
      verifyNodeAllPropsTypeMatch(
        { name: "String", children: "Array" },
        originalNode,
      ),
    ).toEqual(true);
  });

  // @TODO: testName 개선
  test("false를 반환한다.", () => {
    const originalNode = { name: "something", children: [] };
    expect(
      verifyNodeAllPropsTypeMatch(
        { name: "String", children: "nothing" },
        originalNode,
      ),
    ).toEqual(false);
  });
});
