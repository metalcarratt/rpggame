import { currentTurnUnit } from "./units/units";
import { findRangeAround } from "./util";

export let moveTo: {x: number, y: number}[] = [];

export function moveCharacter(x: number, y: number) {
    currentTurnUnit().x = x;
    currentTurnUnit().y = y;
}

export function clearMoveTo() {
    moveTo = [];
}

export function findMoveTo() {
    moveTo = findRangeAround(currentTurnUnit(), currentTurnUnit().movement);
}

