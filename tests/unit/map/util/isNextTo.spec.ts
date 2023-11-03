import { isNextTo } from "@/level/map/util/isNextTo";

describe('isNextTo', () => {
    it('isNextTo', () => {
        expect(isNextTo({x: 1, y: 1}, {x: 2, y: 2})).toBe(true);
        expect(isNextTo({x: 3, y: 1}, {x: 2, y: 2})).toBe(true);
        expect(isNextTo({x: 3, y: 3}, {x: 2, y: 2})).toBe(true);
        expect(isNextTo({x: 1, y: 3}, {x: 2, y: 2})).toBe(true);

        expect(isNextTo({x: 0, y: 0}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 2, y: 0}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 4, y: 0}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 0, y: 2}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 0, y: 4}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 4, y: 2}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 2, y: 4}, {x: 2, y: 2})).toBe(false);
        expect(isNextTo({x: 4, y: 4}, {x: 2, y: 2})).toBe(false);
    })
});