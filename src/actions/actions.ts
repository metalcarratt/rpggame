import { Ref, ref } from "vue";
import { render } from "../canvas";
import { clearMoveTo } from "../moving";
import { currentTurnUnit, nextUnitTurn } from "../units/units";
import { SpaceCheckerFunction, findRangeAround, xyd } from "../util";
import { WALK_ACTION } from "./commonActions";
import { findPlayerVisible } from "@/visibility";
import { CORNER } from "@/constants";

export type ActionRange = {
    range: number | (() => number),
    validator: SpaceCheckerFunction,
    colour: string
}

export type Action = {
    label: string,
    img: string,
    corners?: CORNER,
    range?: ActionRange,
    meta?: any,
    perform: (at: xyd) => void,
    precondition: () => boolean,
    // rangeValidator?: SpaceCheckerFunction
}

export let actionAt: xyd[] = [];

export const clearActionAt = () => actionAt = [];

const currentAction: Ref<Action> = ref(WALK_ACTION);

export const currentActionColour = () => currentAction.value.range?.colour as string;

export const isCurrentAction = (action: Action) => currentAction.value.label === action.label;

export const initAction = () => clickAction(currentAction.value);

export const getActionAt = (x: number, y: number) => actionAt.find(_actionAt => _actionAt.x === x && _actionAt.y === y) as xyd;

export const clickAction = (action: Action) => {
    clearMoveTo();
    if (action.range) {
        // console.log(`action.range, action=${JSON.stringify(action)}, rangeValidator=${JSON.stringify(action?.range.validator)}`);
        const range = typeof action.range.range === 'number' ? action.range.range : action.range.range();
        actionAt = findRangeAround(currentTurnUnit().at, range, action?.range.validator ?? SpaceCheckerFunction.EMPTY_SPACE);
        currentAction.value = action;
        render();
    } else {
        currentAction.value = action;
        performAction({x:0, y:0, d:0});
        console.log(`unit has ${currentTurnUnit().energy} remaining`);
        if (currentTurnUnit().energy < 1) {
            nextUnitTurn();
        }
    }
}

export const performAction = (at: xyd) => {
    currentAction.value.perform(at);
    currentAction.value = WALK_ACTION;
    clearActionAt();
    findPlayerVisible();
    clickAction(currentAction.value);
}

export function getCurrentActions(): Action[] {
    const unit = currentTurnUnit();
    return unit.actions?.filter(action => action.precondition()) ?? [];
}