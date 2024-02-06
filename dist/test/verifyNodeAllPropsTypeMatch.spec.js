'use strict';

var globals = require('@jest/globals');
var operators_verifyNodeAllPropsTypeMatch = require('../operators/verifyNodeAllPropsTypeMatch.js');

// @TODO: undefined를 각 인자에 넣은 경우에 대한 테스트 케이스 추가
globals.describe("verifyNodeAllPropsTypeMatch", () => {
    // @TODO: testName 개선
    globals.test("true를 반환한다.", () => {
        const originalNode = { name: "something", children: [] };
        globals.expect(operators_verifyNodeAllPropsTypeMatch.verifyNodeAllPropsTypeMatch({ name: "String", children: "Array" }, originalNode)).toEqual(true);
    });
    // @TODO: testName 개선
    globals.test("false를 반환한다.", () => {
        const originalNode = { name: "something", children: [] };
        globals.expect(operators_verifyNodeAllPropsTypeMatch.verifyNodeAllPropsTypeMatch({ name: "String", children: "nothing" }, originalNode)).toEqual(false);
    });
});
