import { currentTurnUnit } from "./units/units";
import { findRangeAround } from "./util";

export let moveTo: {x: number, y: number}[] = [];

export function moveCharacter(x: number, y: number) {
    currentTurnUnit().at.x = x;
    currentTurnUnit().at.y = y;
}

export function clearMoveTo() {
    moveTo = [];
}

export function findMoveTo() {
    moveTo = findRangeAround(currentTurnUnit().at, currentTurnUnit().movement);
}

