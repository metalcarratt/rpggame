import { SpaceCheckerFunction } from "@/util";
import { Action } from "./actions";
import { attackUnit, player, unitAt } from "@/units/units";
import { xy } from "@/map";

export const WAIT_ACTION: Action = {
    label: 'Wait',
    img: '/waiting.png',
    perform: () => {},
    precondition: () => true
}

export const ATTACK_ACTION: Action = {
    label: 'Attack',
    img: '/attack.png',
    range: 1,
    perform: (at: xy) => {
        const playerUnit = player();
        attackUnit(playerUnit, unitAt(at));
    },
    precondition: () => true,
    rangeValidator: SpaceCheckerFunction.ENEMY_UNIT
}