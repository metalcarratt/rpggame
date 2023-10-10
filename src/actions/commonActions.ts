import { SpaceCheckerFunction, findRangeAround, xyd } from "@/util";
import { Action } from "./actions";
import { attackUnit, currentTurnUnit, player, unitAt } from "@/units/units";
import { xy } from "@/map";
import { ATTACK_HOVER_COLOUR, MOVEMENT_HOVER_COLOUR } from "@/constants";
import { takeItem } from "@/items/items";
import { takeInventoryItem } from "@/items/inventory/inventory";

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
        attackUnit(playerUnit, unitAt(at));
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
        console.log(`walking to ${at.x}, ${at.y} with d=${at.d}`);
        currentTurnUnit().x = at.x;
        currentTurnUnit().y = at.y;
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
        return findRangeAround({x: currentTurnUnit().x, y: currentTurnUnit().y}, 1, SpaceCheckerFunction.ITEM).length > 0;
    }
}