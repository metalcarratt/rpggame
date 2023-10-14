import { SpaceCheckerFunction, findRangeAround, xyd } from "@/level/util";
import { Action } from "./actions";
import { attackUnit, currentTurnUnit, hasEnemies, player } from "@/level/units/units";
import { xy } from "@/level/map";
import { ATTACK_HOVER_COLOUR, CORNER, MOVEMENT_HOVER_COLOUR } from "@/level/constants";
import { takeItem } from "@/level/items/items";
import { takeInventoryItem } from "@/level/items/inventory/inventory";
import { gameOver } from "@/level/gameStatus";

export const WAIT_ACTION: Action = {
    label: 'Wait',
    img: '/waiting.png',
    perform: () => {
        currentTurnUnit().energy = 0;
    },
    precondition: () => true
}

export const ATTACK_ACTION: Action = {
    label: 'Attack',
    img: '/attack.png',
    range: {
        range: 1,
        validator: SpaceCheckerFunction.ENEMY_UNIT,
        colour: ATTACK_HOVER_COLOUR
    },
    perform: (at: xy) => {
        const playerUnit = player();
        attackUnit(playerUnit, at);
        currentTurnUnit().energy = 0;
    },
    precondition: () => true
}

export const WALK_ACTION: Action = {
    label: 'Walk',
    img: '/walk.png',
    range: {
        range: () => currentTurnUnit().energy,
        validator: SpaceCheckerFunction.EMPTY_SPACE,
        colour: MOVEMENT_HOVER_COLOUR
    },
    perform: (at: xyd) => {
        // console.log(`walking to ${at.x}, ${at.y} with d=${at.d}`);
        currentTurnUnit().at = JSON.parse(JSON.stringify(at));
        currentTurnUnit().energy -= at.d;
    },
    precondition: () => true
}

export const PICK_UP_ACTION: Action = {
    label: 'Pick Up',
    img: '/take.png',
    range: {
        range: 1,
        validator: SpaceCheckerFunction.ITEM,
        colour: MOVEMENT_HOVER_COLOUR
    },
    perform: (at: xyd) => {
        const item = takeItem(at);
        takeInventoryItem(item);
    },
    precondition: () => {
        return findRangeAround(currentTurnUnit().at, 1, SpaceCheckerFunction.ITEM).length > 0;
    }
}

export const EXIT_LEVEL_ACTION: Action = {
    label: 'Exit Level',
    img: '/exit.png',
    corners: CORNER.SQUARE,
    perform: () => gameOver(),
    precondition: () => !hasEnemies()
}