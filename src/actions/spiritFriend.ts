import { xy } from "@/map";
import { addUnit, currentTurnUnit, mouseUnit, removeUnit } from "@/units";
import { Action } from "./actions";

const SUMMON_LABEL = 'Spirit Friend';
const IMG = '/mouse_profile.png';
const DEPLOYED_ATTRIBUTE = 'deployed';

export const SUMMON_SPIRIT_FRIEND_ACTION: Action = {
    label: SUMMON_LABEL,
    img: IMG,
    range: 1,
    meta: {
        [DEPLOYED_ATTRIBUTE]: false
    },
    perform(at: xy) {
        addUnit(mouseUnit(at));
        this.meta[DEPLOYED_ATTRIBUTE] = true;
    },
    precondition() {
        return this.meta[DEPLOYED_ATTRIBUTE] === false;
    }
}

export const RECALL_SPIRIT_FRIEND_ACTION: Action = {
    label: 'Recall',
    img: IMG,
    perform() {
        console.log('perform recall');
        removeUnit('mouse');
        const actions = currentTurnUnit().actions.find(action => action.label === SUMMON_LABEL);
        if (actions) {
            actions.meta[DEPLOYED_ATTRIBUTE] = false;
        }
    },
    precondition() {
        return currentTurnUnit().actions.find(action => action.label === SUMMON_LABEL)?.meta[DEPLOYED_ATTRIBUTE] === true;
    }
}