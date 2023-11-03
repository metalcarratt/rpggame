import { addUnit, currentTurnUnit, removeUnit } from "@/level/units/units";
import { Action } from "./actions";
import { mouseUnit } from "@/level/units/spiritUnit";
import { ATTACK_HOVER_COLOUR } from "@/level/constants";
import { SpaceCheckerFunction } from "../map/util/findAround";
import { xy } from "../map/xy";
import { hasStackUnit } from "../units/turnStack";
import { IMG_RECALL_MOUSE, IMG_SUMMON_MOUSE } from "@/imageLoader";

export const SUMMON_LABEL = 'Spirit Friend';
const DEPLOYED_ATTRIBUTE = 'deployed';

export const SUMMON_SPIRIT_FRIEND_ACTION: Action = {
    label: SUMMON_LABEL,
    img: IMG_SUMMON_MOUSE,
    range: {
        range: 1,
        validator: SpaceCheckerFunction.EMPTY_SPACE,
        colour: ATTACK_HOVER_COLOUR
    },
    meta: {
        [DEPLOYED_ATTRIBUTE]: false
    },
    perform(at: xy) {
        addUnit(mouseUnit(at));
        this.meta[DEPLOYED_ATTRIBUTE] = true;
        currentTurnUnit().energy = 0;
    },
    precondition() {
        return this.meta[DEPLOYED_ATTRIBUTE] === false;
    }
}

export const RECALL_SPIRIT_FRIEND_ACTION: Action = {
    label: 'Recall',
    img: IMG_RECALL_MOUSE,
    perform() {
        console.log('perform recall');
        removeUnit('Mouse');
        const actions = currentTurnUnit().actions?.find(action => action.label === SUMMON_LABEL);
        if (actions) {
            actions.meta[DEPLOYED_ATTRIBUTE] = false;
        }
        currentTurnUnit().energy = 0;
    },
    precondition() {
        return hasStackUnit('Mouse');
    }
}