'use strict';

var globals = require('@jest/globals');
var operators_mapBy = require('../operators/mapBy.js');

const R = require("ramda");
globals.describe("mapBy", () => {
    globals.describe("기본 설정", () => {
        globals.test("특정 조건의 노드에 대해서, 새 prop과 value를 추가한다", () => {
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
                {
                    name: "1",
                    children: [
                        {
                            name: "1-1",
                            newKey: "newValue",
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
                            newKey: "newValue",
                            children: [
                                { name: "1-2-1-1", children: [] },
                                { name: "1-2-1-2", children: [] },
                            ],
                        },
                        { name: "1-2-2", newKey: "newValue", children: [] },
                    ],
                },
                { name: "1-3", children: [] },
            ];
            const mapFunction = (node) => ({ ...node, newKey: "newValue" });
            const condition = (node) => ["1-1", "1-2-1", "1-2-2"].includes(node.name);
            const ops = {
                childrenKey: "children",
            };
            globals.expect(operators_mapBy.mapBy(ops, condition, mapFunction, originalNodes)).toEqual(expectedNodes);
        });
        globals.test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
            const ops = { childrenKey: "children" };
            globals.expect(operators_mapBy.mapBy(ops, () => true, () => "newValue", [])).toEqual([]);
        });
    });
    // @TODO: 추후 테스트 코드 blockName을 기획단게의 추상화 수준으로 변경
    globals.describe("applyTimesBoundary 설정", () => {
        globals.test("최대 map 적용 횟수가 0인 경우, error를 throw한다.", () => {
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
            const ops = {
                childrenKey: "children",
                applyTimesBoundary: [0, 0],
            };
            globals.expect(() => operators_mapBy.mapBy(ops, () => "mock", () => "mock", originalNodes)).toThrow();
        });
        globals.test("최대 map 적용 횟수가 1인 경우, 최대 1번만 map이 특정 조건을 만족하는 node에 적용된다. ", () => {
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
                {
                    name: "1",
                    children: [
                        {
                            name: "1-1",
                            newKey: "newValue",
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
            const ops = {
                childrenKey: "children",
                applyTimesBoundary: [0, 1],
            };
            const predicate = (node) => ["1-1"].includes(node.name);
            const mapFunction = (node) => ({ ...node, newKey: "newValue" });
            globals.expect(operators_mapBy.mapBy(ops, predicate, mapFunction, originalNodes)).toEqual(expectedNodes);
        });
        globals.test("최소 map 적용 횟수가 5인 경우, 실제 map 적용횟수가 5를 넘는 경우, error를 throw한다. ", () => {
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
            const ops = {
                childrenKey: "children",
                applyTimesBoundary: [5, 2],
            };
            globals.expect(() => operators_mapBy.mapBy(ops, R.always(true), R.identity, originalNodes)).toThrow();
        });
    });
});
