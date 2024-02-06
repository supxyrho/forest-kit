'use strict';

var globals = require('@jest/globals');
var operators_isLeafNode = require('../operators/isLeafNode.js');

globals.describe("isLeafNode", () => {
    globals.test("node의 자식이 배열이면서 길이가 0인 경우, true를 반환한다.", () => {
        const childrenKey = "children";
        const node = { [childrenKey]: [] };
        const ops = { childrenKey };
        globals.expect(operators_isLeafNode.isLeafNode(ops, node)).toEqual(true);
    });
    globals.test("node의 자식이 배열이면서 길이가 1 이상인 경우, false를 반환한다.", () => {
        const childrenKey = "children";
        const node = { [childrenKey]: [{ name: "children 1-1" }] };
        const ops = { childrenKey };
        globals.expect(operators_isLeafNode.isLeafNode(ops, node)).toEqual(false);
    });
    globals.test("node가 객체 타입이 아닌 경우, error를 throw한다", () => {
        const childrenKey = "children";
        const node = `Invalid node type`;
        const ops = { childrenKey };
        globals.expect(() => operators_isLeafNode.isLeafNode(ops, node)).toThrow();
    });
    globals.test("node의 자식 prop이 존재하지 않는 경우, error를 throw한다.", () => {
        const node = {};
        const ops = { childrenKey: "Invalid children key" };
        globals.expect(() => operators_isLeafNode.isLeafNode(ops, node)).toThrow();
    });
});
