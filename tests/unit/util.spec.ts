import { unitsZero } from "@/level/units/units";
import { LEVEL1, map, updateMap } from "@/level/map/map";
import { findSpaceClosestTo } from "@/level/map/util/findSpace";

const NARROW_MAP = [
    [0,0,0,0]
];

describe('findSpaceClosestTo', () => {
    beforeEach(() => {
        unitsZero();
    });

    it('...', () => {
        updateMap(LEVEL1);

        console.log(`${JSON.stringify(map)}`);

        const range = [{"x":1,"y":6,"d":1},{"x":1,"y":7,"d":1},{"x":1,"y":8,"d":1},{"x":2,"y":6,"d":1},{"x":2,"y":8,"d":1},{"x":3,"y":6,"d":1},{"x":3,"y":7,"d":1},{"x":3,"y":8,"d":1}];
        const target = {"x":7,"y":7,"d":1};
        const visible = [
            [false,false,false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false,false,true],
            [false,false,false,false,false,false,false,false,false,true,false],
            [true,true,true,true,true,false,false,false,true,false,false],
            [true,true,true,true,true,true,true,true,true,false,false],
            [true,true,true,true,true,true,true,true,true,false,false],
            [true,true,true,true,true,true,true,true,true,false,false],
            [true,true,true,true,true,false,true,true,true,true,false]
        ];

        const result = findSpaceClosestTo(visible, range, target, {x: 2, y: 7});
        console.log(`findSpaceClosestTo = ${JSON.stringify(result)}`);
        expect(result.x).toBe(3);
        expect(result.y).toBe(7);
    });

    it('fsct2', () => {
        updateMap(NARROW_MAP);

        console.log(`${JSON.stringify(map)}`);

        const range = [{"x":1,"y":0,"d":1}];
        const target = {"x":3,"y":0,"d":1};
        const visible = [[true,true,true,true]];

        const result = findSpaceClosestTo(visible, range, target, {x: 2, y: 7});
        console.log(`findSpaceClosestTo = ${JSON.stringify(result)}`);
        expect(result.x).toBe(1);
        expect(result.y).toBe(0);
    });
});

