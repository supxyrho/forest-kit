'use strict';

var globals = require('@jest/globals');
var operators_hasChildren = require('../operators/hasChildren.js');

globals.describe("hasChildren", () => {
    globals.test("node의 자식이 배열이면서 길이가 1 이상인 경우, true를 반환한다.", () => {
        const ops = {
            childrenKey: "children",
        };
        const node = { [ops.childrenKey]: [{ name: "children 1-1" }] };
        globals.expect(operators_hasChildren.hasChildren(ops, node)).toEqual(true);
    });
    globals.test("node의 자식이 빈 배열인 경우, false를 반환한다.", () => {
        const ops = {
            childrenKey: "children",
        };
        const node = { [ops.childrenKey]: [] };
        globals.expect(operators_hasChildren.hasChildren(ops, node)).toEqual(false);
    });
    globals.test("node가 객체 타입이 아닌 경우, error를 throw한다", () => {
        const ops = {
            childrenKey: "children",
        };
        const node = `Invalid node type`;
        globals.expect(() => operators_hasChildren.hasChildren(ops, node)).toThrow();
    });
    globals.test("node의 자식 prop이 존재하지 않는 경우, error를 throw한다.", () => {
        const node = {};
        globals.expect(() => operators_hasChildren.hasChildren({ childrenKey: "Invalid children key" }, node)).toThrow();
    });
});
