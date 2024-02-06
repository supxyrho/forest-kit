'use strict';

var globals = require('@jest/globals');
var operators_deepFlatten = require('../operators/deepFlatten.js');

globals.describe("deepFlatten", () => {
    globals.test("다중 root node를 가진 배열에 대해서, 순차적이면서, 전위순회 순서로 1depth 형식의 node의 배열을 반환한다. ", () => {
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
        const expectedNodes = [
            globals.expect.objectContaining({ name: "1" }),
            globals.expect.objectContaining({ name: "1-1" }),
            globals.expect.objectContaining({ name: "1-1-1" }),
            globals.expect.objectContaining({ name: "1-1-1-1" }),
            globals.expect.objectContaining({ name: "1-1-1-2" }),
            globals.expect.objectContaining({ name: "1-1-2" }),
            globals.expect.objectContaining({ name: "1-2" }),
            globals.expect.objectContaining({ name: "1-2-1" }),
            globals.expect.objectContaining({ name: "1-2-1-1" }),
            globals.expect.objectContaining({ name: "1-2-1-2" }),
            globals.expect.objectContaining({ name: "1-2-2" }),
            globals.expect.objectContaining({ name: "1-3" }),
        ];
        const ops = { childrenKey };
        globals.expect(operators_deepFlatten.deepFlatten(ops, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
        const childrenKey = "children";
        const originalNodes = [];
        const ops = { childrenKey };
        globals.expect(operators_deepFlatten.deepFlatten(ops, originalNodes)).toEqual([]);
    });
    globals.test("배열 타입이 아닌 경우, error를 throw한다", () => {
        const childrenKey = "children";
        const originalNodes = `Invalid node type`;
        const ops = { childrenKey };
        globals.expect(() => operators_deepFlatten.deepFlatten(ops, originalNodes)).toThrow();
    });
    globals.test("자식 prop이 존재하지 않는 경우, error를 throw한다.", () => {
        const childrenKey = "children";
        const originalNodes = [{}];
        const ops = { childrenKey };
        globals.expect(() => operators_deepFlatten.deepFlatten(ops, originalNodes)).toThrow();
    });
});
