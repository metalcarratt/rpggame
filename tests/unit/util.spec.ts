import { units, unitsZero } from "@/units/units";
import { updateMap } from "@/map";
import { findFreeRangeAround, findFreeSpaceAround } from "@/util";
import { mouseUnit } from "@/units/spiritUnit";

const EMPTY_MAP = [
    [0,0,0],
    [0,1,0],
    [0,0,0]
];

const DIAGONAL_MAP = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
]

const CROSS_MAP = [
    [1,0,1],
    [0,1,0],
    [1,0,1]
]

const BIG_MAP = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

const MAZE_MAP = [
    [0,0,0],
    [0,1,0],
    [1,1,0]
]

describe('findFreeSpaceAround', () => {
    beforeEach(() => {
        unitsZero();
    });

    it('Finds all spaces on empty map', () => {
        updateMap(EMPTY_MAP);

        const spaces = findFreeSpaceAround({ x: 1, y: 1});

        expect(spaces.length).toBe(8);
        expect(spaces).toContainEqual({x: 0, y: 0});
        expect(spaces).toContainEqual({x: 2, y: 2});
    });

    it('Finds all spaces on map with terrain and units', () => {
        
        updateMap(DIAGONAL_MAP);
        units.push(
            mouseUnit({x: 0, y: 2})
        )

        const spaces = findFreeSpaceAround({ x: 1, y: 1});

        expect(spaces.length).toBe(5);
        expect(spaces).toContainEqual({x: 0, y: 1});
        expect(spaces).toContainEqual({x: 1, y: 2});
        expect(spaces).toContainEqual({x: 1, y: 0});
        expect(spaces).toContainEqual({x: 2, y: 0});
        expect(spaces).toContainEqual({x: 2, y: 1});
    });

    it('Finds all spaces from top left corner', () => {
        
        updateMap(CROSS_MAP);

        const spaces = findFreeSpaceAround({ x: 0, y: 0});

        expect(spaces.length).toBe(2);
        expect(spaces).toContainEqual({x: 0, y: 1});
        expect(spaces).toContainEqual({x: 1, y: 0});
    });

    it('Finds all spaces from bottom right corner', () => {
        
        updateMap(CROSS_MAP);

        const spaces = findFreeSpaceAround({ x: 2, y: 2});

        expect(spaces.length).toBe(2);
        expect(spaces).toContainEqual({x: 1, y: 2});
        expect(spaces).toContainEqual({x: 2, y: 1});
    });
});

describe('findFreeRangeAround', () => {
    beforeEach(() => {
        unitsZero();
    });

    it('Finds all spaces at range 1', () => {
        
        updateMap(BIG_MAP);

        const spaces = findFreeRangeAround({x: 2, y: 2}, 1);

        expect(spaces.length).toBe(8);
    });

    it('Finds all spaces at range 2', () => {
        
        updateMap(BIG_MAP);

        const spaces = findFreeRangeAround({x: 2, y: 2}, 2);

        expect(spaces.length).toBe(24);
    });

    it('Finds all spaces at range 3', () => {
        
        updateMap(MAZE_MAP);

        const spaces = findFreeRangeAround({x: 0, y: 2}, 3);

        expect(spaces.length).toBe(5);
        expect(spaces).toContainEqual({x: 0, y: 1});
        expect(spaces).toContainEqual({x: 0, y: 0});
        expect(spaces).toContainEqual({x: 1, y: 0});
        expect(spaces).toContainEqual({x: 2, y: 0});
        expect(spaces).toContainEqual({x: 2, y: 1});
    });

    it('Finds all spaces at range 4', () => {
        
        updateMap(MAZE_MAP);

        const spaces = findFreeRangeAround({x: 0, y: 2}, 4);

        expect(spaces.length).toBe(6);
    });
});