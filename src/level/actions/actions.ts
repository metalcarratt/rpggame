import { Ref, ref } from "vue";
import { render } from "../canvas";
import { clearMoveTo } from "../moving";
import { currentTurnUnit, nextUnitTurn } from "../units/units";
import { PICK_UP_ACTION, WALK_ACTION } from "./commonActions";
import { findPlayerVisible } from "@/level/visibility";
import { CORNER } from "@/level/constants";
import { SpaceCheckerFunction, findRangeAround } from "../map/util/findAround";
import { xyd } from "../map/xyd";
import { isGameOver } from "../gameStatus";

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
        actionAt = findRangeAround(currentTurnUnit.value.data.at, range, action?.range.validator ?? SpaceCheckerFunction.EMPTY_SPACE);
        currentAction.value = action;
        render();
    } else {
        currentAction.value = action;
        performAction({x:0, y:0, d:0});
        console.log(`unit has ${currentTurnUnit.value.data.energy} remaining`);
        if (currentTurnUnit.value.data.energy < 1) {
            console.log('no energy left, next unit turn');
            nextUnitTurn();
        } 
        console.log('click action finished');
    }
}

export const performAction = (at: xyd) => {
    currentAction.value.perform(at);
    if (!currentAction.value.precondition() || currentTurnUnit.value.data.energy <= 0 || isGameOver()) {
        currentAction.value = WALK_ACTION;
    }
    
    findPlayerVisible();
    clickAction(currentAction.value);
}

export function getCurrentActions(): Action[] {
    const unit = currentTurnUnit.value;
    return unit.actions?.filter(action => action.precondition()) ?? [];
}