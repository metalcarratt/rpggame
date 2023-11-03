import { Action } from "./actions";
import { attackUnit, currentTurnUnit, hasEnemies, player } from "@/level/units/units";
import { ATTACK_HOVER_COLOUR, CORNER, MOVEMENT_HOVER_COLOUR } from "@/level/constants";
import { takeItem } from "@/level/items/items";
import { takeInventoryItem } from "@/level/items/inventory/inventory";
import { gameOver } from "@/level/gameStatus";
import { SpaceCheckerFunction, findRangeAround } from "../map/util/findAround";
import { xy } from "../map/xy";
import { xyd } from "../map/xyd";
import { IMG_ATTACKING, IMG_EXITING, IMG_TAKING, IMG_WAITING, IMG_WALKING } from "@/imageLoader";

export const WAIT_ACTION: Action = {
    label: 'Wait',
    img: IMG_WAITING,
    perform: () => {
        currentTurnUnit().energy = 0;
    },
    precondition: () => true
}

export const ATTACK_ACTION: Action = {
    label: 'Attack',
    img: IMG_ATTACKING,
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
    img: IMG_WALKING,
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
    img: IMG_TAKING,
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
    img: IMG_EXITING,
    corners: CORNER.SQUARE,
    perform: () => gameOver(`Completed level!`, ''),
    precondition: () => !hasEnemies()
}