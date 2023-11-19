import { findRangeAround } from "./map/util/findAround";
import { currentTurnUnit } from "./units/units";

export let moveTo: {x: number, y: number}[] = [];

export function moveCharacter(x: number, y: number) {
    currentTurnUnit.value.data.at.x = x;
    currentTurnUnit.value.data.at.y = y;
}

export function clearMoveTo() {
    moveTo = [];
}

export function findMoveTo() {
    moveTo = findRangeAround(currentTurnUnit.value.data.at, currentTurnUnit.value.movement);
}

