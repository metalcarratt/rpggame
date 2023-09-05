import { render } from "../canvas";
import { xy } from "../map";
import { clearMoveTo } from "../moving";
import { currentTurnUnit, nextUnitTurn } from "../units/units";
import { findFreeRangeAround } from "../util";

export type Action = {
    label: string,
    img: string,
    range?: number,
    meta?: any,
    perform: (at: xy) => void,
    precondition: () => boolean
}

export let actionAt: xy[] = [];

export const clearActionAt = () => actionAt = [];

let clickedAction: Action | null = null;

export const clickAction = (action: Action) => {
    clearMoveTo();
    if (action.range) {
        actionAt = findFreeRangeAround(currentTurnUnit(), action.range);
        clickedAction = action;
        render();
    } else {
        clickedAction = action;
        performAction({x:0, y:0});
        nextUnitTurn();
    }
}

export const performAction = (at: xy) => {
    clickedAction?.perform(at);
    clickedAction = null;
    clearActionAt();
    
}

export function getCurrentActions(): Action[] {
    const unit = currentTurnUnit();
    return unit.actions.filter(action => action.precondition());
}