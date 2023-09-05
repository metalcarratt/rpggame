import { currentTurnUnit } from "./units/units";
import { findFreeRangeAround } from "./util";

export let moveTo: {x: number, y: number}[] = [];

export function moveCharacter(x: number, y: number) {
    currentTurnUnit().x = x;
    currentTurnUnit().y = y;
}

export function clearMoveTo() {
    moveTo = [];
}

export function findMoveTo() {
    moveTo = findFreeRangeAround(currentTurnUnit(), currentTurnUnit().movement);
}

