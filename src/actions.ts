import { render } from "./canvas";
import { xy } from "./map";
import { clearMoveTo } from "./moving";
import { Unit, addUnit, currentTurnUnit, mouseUnit, nextUnitTurn, units } from "./units";
import { findFreeRangeAround } from "./util";

export type Action = {
    label: string,
    img: string,
    range: number,
    meta?: any,
    perform: (at: xy) => void,
    precondition: () => boolean
}

export let actionAt: xy[] = [];

export const clearActionAt = () => actionAt = [];

export const SUMMON_SPIRIT_FRIEND_ACTION: Action = {
    label: 'Spirit Friend',
    img: '/mouse_profile.png',
    range: 1,
    meta: {
        deployed: false
    },
    perform(at: xy) {
        addUnit(mouseUnit(at));
        this.meta['deployed'] = true;
    },
    precondition() {
        return this.meta['deployed'] === false;
    }
}

let clickedAction: Action | null = null;

export const clickAction = (action: Action) => {
    clearMoveTo();
    actionAt = findFreeRangeAround(currentTurnUnit(), action.range);
    clickedAction = action;
    render();
}

export const performAction = (at: xy) => {
    clickedAction?.perform(at);
    clickedAction = null;
    clearActionAt();
    nextUnitTurn();
}

export function getCurrentActions(): Action[] {
    const unit = currentTurnUnit();
    return unit.actions.filter(action => action.precondition());
}