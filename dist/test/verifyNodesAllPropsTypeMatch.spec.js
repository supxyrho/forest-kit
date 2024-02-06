'use strict';

var globals = require('@jest/globals');
var operators_verifyNodesAllPropsTypeMatch = require('../operators/verifyNodesAllPropsTypeMatch.js');

// @TODO: undefined를 각 인자에 넣은 경우에 대한 테스트 케이스 추가
globals.describe("verifyNodesAllPropsTypeMatch", () => {
    // @TODO: testName 개선
    globals.test("true를 반환한다.", () => {
        const originalNode = [
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
        globals.expect(operators_verifyNodesAllPropsTypeMatch.verifyNodesAllPropsTypeMatch({ name: "String", children: "Array" }, originalNode)).toEqual(true);
    });
    // @TODO: testName 개선
    globals.test("false를 반환한다.", () => {
        const originalNode = [
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
        globals.expect(operators_verifyNodesAllPropsTypeMatch.verifyNodesAllPropsTypeMatch({ name: "String", children: "Number" }, originalNode)).toEqual(false);
    });
});
