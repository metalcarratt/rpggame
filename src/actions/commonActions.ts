import { SpaceCheckerFunction } from "@/util";
import { Action } from "./actions";
import { attackUnit, currentTurnUnit, player, unitAt } from "@/units/units";
import { xy } from "@/map";
import { ATTACK_HOVER_COLOUR, MOVEMENT_HOVER_COLOUR } from "@/constants";

export const WAIT_ACTION: Action = {
    label: 'Wait',
    img: '/waiting.png',
    perform: () => {},
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
    },
    precondition: () => true
}

export const WALK_ACTION: Action = {
    label: 'Walk',
    img: '/walk.png',
    range: {
        range: () => currentTurnUnit().movement,
        validator: SpaceCheckerFunction.EMPTY_SPACE,
        colour: MOVEMENT_HOVER_COLOUR
    },
    perform: (at: xy) => {
        currentTurnUnit().x = at.x;
        currentTurnUnit().y = at.y;
    },
    precondition: () => true
}