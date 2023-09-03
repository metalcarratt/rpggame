import { render } from "./canvas";
import { currentTurnUnit, nextUnitTurn } from "./units";
import { findFreeRangeAround } from "./util";
import { findVisible } from "./visibility";

export let moveTo: {x: number, y: number}[] = [];

export function moveCharacter(x: number, y: number) {
    currentTurnUnit().x = x;
    currentTurnUnit().y = y;
    nextUnitTurn();
}

export function clearMoveTo() {
    moveTo = [];
}

export function findMoveTo() {
    moveTo = findFreeRangeAround(currentTurnUnit(), currentTurnUnit().movement);
}

