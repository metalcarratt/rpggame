import { items } from "./items/items";
import { map, xy } from "./map";
import { Team, units } from "./units/units";

export type xyd = {
    x: number,
    y: number,
    d: number
}

export enum SpaceCheckerFunction {
    EMPTY_SPACE,
    ENEMY_UNIT,
    WALL,
    ITEM
}

export const EMPTY_SPACE_CHECKER = (at: xy) => {
    // console.log('in empty space checeer');
        return map[at.y][at.x] === 0
        && !(units.some(unit => eqXy(unit.at, at)))};
    
export const ENEMY_UNIT_CHECKER = (at: xy) => {
        // console.log('in enemy unit checker');
        return map[at.y][at.x] === 0
        && units.some(unit => eqXy(unit.at, at) && unit.team === Team.MONSTER)};

export const WALL_CHECKER = (at: xy) =>
        map[at.y][at.x] !== 0
        && !(units.some(unit => eqXy(unit.at, at)));

export const ITEM_CHECKER = (at: xy) => 
        items().some(item => item.at.x === at.x && item.at.y === at.y);


export function findFreeSpaceAround(around: xy, validateFn?: SpaceCheckerFunction): xy[] {
    const _validateFn = validateFn ?? SpaceCheckerFunction.EMPTY_SPACE;
    return findSpaceAroundInternal(around, [], _validateFn);
}

const doValidate = (at: xy, fn: SpaceCheckerFunction) => {
    switch (fn) {
        case SpaceCheckerFunction.EMPTY_SPACE:
            return EMPTY_SPACE_CHECKER(at);
        case SpaceCheckerFunction.ENEMY_UNIT:
            return ENEMY_UNIT_CHECKER(at);
        case SpaceCheckerFunction.WALL:
            return WALL_CHECKER(at);
        case SpaceCheckerFunction.ITEM:
            return ITEM_CHECKER(at);
    }
}

function findSpaceAroundInternal(around: xy, existingSpaces: xy[], validateFn: SpaceCheckerFunction): xy[] {
    // console.log(`findSpaceAroundInternal, validate: ${validateFn}`);
    const spacesAround: xy[] = [];

    for (let iterx = around.x - 1; iterx < (around.x + 2); iterx++) {
        for (let itery = around.y - 1; itery < (around.y + 2); itery++) {
            if (
                iterx >= 0
                && iterx < map[0].length
                && itery >= 0
                && itery < map.length
                && doValidate({ x: iterx, y: itery}, validateFn)
                && !(spacesAround.some(move => move.x == iterx && move.y === itery))
                && !(existingSpaces.some(move => move.x == iterx && move.y === itery))
            ) {
                spacesAround.push({
                    x: iterx,
                    y: itery
                });
            }
        }
    }

    return spacesAround;
}

export function findRangeAround(around: xy, range: number, validateFn?: SpaceCheckerFunction): xyd[] {
    // console.log(`findFreeRangeAround, around: ${JSON.stringify(around)}, range: ${range}}`);
    // console.log(`findFreeRangeAround, validate: ${validateFn}`);
    const _validateFn = validateFn ?? SpaceCheckerFunction.EMPTY_SPACE;
    // console.log(`validate function: ${_validateFn}`);
    const spaces1 = findFreeSpaceAround(around, _validateFn);
    let spacesAround: xyd[] = spaces1.map(space => ({...space, d: 1}));
    

    for (let n = 0; n < range - 1; n++) {
        // console.log(`n=${n}`);
        const length = spacesAround.length;
        for (let iter = 0; iter < length; iter++) {
            const spaces = findSpaceAroundInternal(spacesAround[iter], spacesAround, _validateFn);
            spacesAround = spacesAround.concat(spaces.map(space => ({...space, d: n + 2})));
        }
    }

    return spacesAround;
}

export function isNextTo(from: xy, to: xy) {
    return from.x >= to.x - 1 
    && from.x <= to.x + 1 
    && from.y >= to.y - 1 
    && from.y <= to.y + 1
}

export function findSpaceClosestTo(spaces: boolean[][], moves: xy[], target: xy, from: xy): xy {
    const visibleLocations = moves.filter(move => spaces[move.y][move.x] && map[move.y][move.x] === 0);
    const attackableLocations = visibleLocations.filter(move => isNextTo(move, target));

    let closestLocation = {x: -1, y: -1};
    let closestDistance = -1;
    for (const location of attackableLocations) {
        const distance = Math.abs(target.x - from.x) + Math.abs(target.y - from.y);
        if (closestDistance === - 1 || closestDistance > distance ) {
            closestDistance = distance;
            closestLocation = location;
        }
    }

    // todo may not be in range

    return closestLocation;
}

export const eqXy = (at1: xy, at2: xy) => at1.x === at2.x && at1.y === at2.y;