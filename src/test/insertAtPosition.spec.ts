/* eslint-disable prettier/prettier */
import { describe, expect, test } from "@jest/globals";

import { insertAtPosition } from "../operators/insertAtPositionBy";

describe("insertBesideSiblingBy", () => {

  describe("객체 삽입" ,() => { 
    test("기본 설정 시, 특정 Position의 index에 삽입한다.", () => {
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
                    { name: "newNode", children: [] },
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

      const opc = {
        childrenKey, 
      };
      const position = '1.1.1.2'
      const newNode = { name: "newNode", children: [] };

      expect(
        insertAtPosition(opc, position, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("left 삽입 옵션 시, 특정 Position의 이전 index에 삽입한다.", () => {
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
        {
          name: "1",
          children: [
            {
              name: "1-1",
              children: [
                {
                  name: "1-1-1",
                  children: [
                    { name: "newNode", children: [] },
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

      const opc = {
        childrenKey,
        at: 'left' 
      };
      const position = '1.1.1.1'
      const newNode = { name: "newNode", children: [] };

      expect(
        insertAtPosition(opc, position, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    // @TODO: left이면서 0번 인덱스 위치에서의 테스트 케이스 작성

    test("right 삽입 옵션 시, 특정 Position의 다음 index에 삽입한다.", () => {
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
                { name: "newNode", children: [] },
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

      const opc = {
        childrenKey,
        at: "right",
      };
      const position = '1.1.1'
      const newNode = { name: "newNode", children: [] };

      expect(
        insertAtPosition(opc, position, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });
  });

  // @TODO: right 옵션이면서 마지막 index로 삽입하는 경우에 대한 테스트케이스 추가

  describe("배열 삽입" ,() => { 
    test("기본 설정 시, 특정 Position에 index에 삽입한다.", () => {
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
        {
          name: "1",
          children: [
            {
              name: "1-1",
              children: [
                {
                  name: "1-1-1",
                  children: [
                    { name: "newNode-1", children: [] },
                    { name: "newNode-2", children: [] },
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

      const opc = {
        childrenKey,
      };
      const position = '1.1.1.1'
      const newNodes = [ { name: "newNode-1", children: [] }, { name: "newNode-2", children: [] } ];

      expect(
        insertAtPosition(opc, position, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("left 삽입 옵션 시, 특정 Position의 이전 index에 삽입한다.", () => {
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
        {
          name: "1",
          children: [
            {
              name: "1-1",
              children: [
                { name: "newNode-1", children: [] },
                { name: "newNode-2", children: [] },
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

      const opc = {
        childrenKey,
        at: "left",
      };
      const position = '1.1.1'
      const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];

      expect(
        insertAtPosition(opc, position, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("right 삽입 옵션 시, 특정 position의 다음 index에 삽입한다.", () => {
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
                { name: "newNode-1", children: [] },
                { name: "newNode-2", children: [] },
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

      const opc = {
        childrenKey,
        at: "right",
      };
      const position = '1.1.1'
      const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];

      expect(
        insertAtPosition(opc, position, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });
  })
});
