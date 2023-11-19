import { Ref, ref } from "vue";
import { items } from "../items/items";
import { EffectType, addEffect, clearEffect, findEffectsForSource } from "@/level/effects/effects";
import { CanTakeTurn, addStackUnit, removeStackUnitKeepCurrent } from "@/level/turn-stack/turnStack";
import { attackUnit, player, unitAt } from "@/level/units/units";
import { xy } from "../map/xy";
import { eqXy } from "../map/util/eqXy";
import { ItemCategory } from "../items/itemTypes";

type FormationCorner = {
    at: xy,
    dist: number
}

type FormationCorners = {
    TL?: FormationCorner,
    TR?: FormationCorner,
    BL?: FormationCorner,
    BR?: FormationCorner
}

export type Formation = {
    title: string,
    type: string,
    at: xy,
    corners: FormationCorners,
    status: FormationStatus,
    unit?: CanTakeTurn
}

export enum FormationStatus {
    BROKEN = 'Broken',
    IDLE = 'Idle',
    ALIVE = 'Alive'
}

export const formationUnit = (at: xy, title: string): CanTakeTurn => ({
    name: title,
    data: {
        at,
        energy: 1
    },
    movement: 1,
    autoMove: () => {
        console.log('formation\'s turn');
        player().data.qi -= 2;
        const effects = findEffectsForSource(at);
        for (const effect of effects) {
            const unitAtEffect = unitAt(effect.at);
            if (unitAtEffect) {
                console.log(`attacking unit at ${unitAtEffect.data.at.x}, ${unitAtEffect.data.at.y}`);
                attackUnit({power: 20, name: 'lightning'}, effect.at);
            }
        }
        return true;
    },
    actions: []
});

const formations: Ref<Formation[]> = ref([]);

export const findFormationUnit = (name: string) => formations.value.find(formation => formation.title === name);

export const addFormation = (title: string, at: xy, type: string) => {
    const newFormation: Formation = {
        title,
        at,
        type,
        corners: {},
        status: FormationStatus.IDLE
    };
    newFormation.corners = checkFormationCorners(at);
    if (!newFormation.corners.TL || !newFormation.corners.TR || !newFormation.corners.BL || !newFormation.corners.BR) {
        newFormation.status = FormationStatus.BROKEN;
    }

    formations.value.push(newFormation);
    console.log(`formations: ${JSON.stringify(formations.value)}`);
}

export const updateFormations = () => {
    for (const formation of formations.value) {
        formation.corners = checkFormationCorners(formation.at);
        if (!formation.corners.TL || !formation.corners.TR || !formation.corners.BL || !formation.corners.BR) {
            formation.status = FormationStatus.BROKEN;
        } else {
            formation.status = FormationStatus.IDLE;
        }
    }
}

export const removeFormation = (at: xy) => {
    formations.value.splice(formations.value.findIndex(f => eqXy(f.at, at)));
}

export const hasFormations = () => formations.value.length > 0;

export const getFormations = () => formations.value;

export const activateFormation = (at: xy) => {
    const formation = formations.value.find(f => eqXy(f.at, at));
    if (formation) {
        formation.status = FormationStatus.ALIVE;
        applyEffects(formation);
        // add to stack
        console.log(`adding to stack formation: ${formation.title}`);
        
        const unit = formationUnit(at, formation.title);
        formation.unit = unit;
        addStackUnit(unit);
    }
}

const applyEffectsTL = (formation: Formation) => {
    const cornerAt = formation.corners?.TL?.at;
    if (cornerAt) {
        const formationAt = formation.at;
        // console.log(`TL from ${cornerAt.x}, ${cornerAt.y} to ${formationAt.x}, ${formationAt.y}`);
        for (let x = cornerAt.x; x < formationAt.x + 1; x++) {
            for (let y = cornerAt.y; y < formationAt.y + 1; y++) {
                // console.log(`TL check ${x}, ${y}`);
                addEffect({x, y}, EffectType.LIGHTNING, formationAt);
            }
        }
    }
}

const applyEffectsTR = (formation: Formation) => {
    const cornerAt = formation.corners?.TR?.at;
    if (cornerAt) {
        const formationAt = formation.at;
        // console.log(`TR from ${cornerAt.x}, ${cornerAt.y} to ${formationAt.x}, ${formationAt.y}`);
        for (let x = formationAt.x; x < cornerAt.x + 1; x++) {
            for (let y = cornerAt.y; y < formationAt.y + 1; y++) {
                // console.log(`TR check ${x}, ${y}`);
                addEffect({x, y}, EffectType.LIGHTNING, formationAt);
            }
        }
    }
}

const applyEffectsBL = (formation: Formation) => {
    const cornerAt = formation.corners?.BL?.at;
    if (cornerAt) {
        const formationAt = formation.at;
        // console.log(`BL from ${cornerAt.x}, ${cornerAt.y} to ${formationAt.x}, ${formationAt.y}`);
        for (let x = cornerAt.x; x < formationAt.x + 1; x++) {
            for (let y = formationAt.y; y < cornerAt.y + 1; y++) {
                // console.log(`BL check ${x}, ${y}`);
                addEffect({x, y}, EffectType.LIGHTNING, formationAt);
            }
        }
    }
}

const applyEffectsBR = (formation: Formation) => {
    const cornerAt = formation.corners?.BR?.at;
    if (cornerAt) {
        const formationAt = formation.at;
        // console.log(`BR from ${cornerAt.x}, ${cornerAt.y} to ${formationAt.x}, ${formationAt.y}`);
        for (let x = formationAt.x; x < cornerAt.x + 1; x++) {
            for (let y = formationAt.y; y < cornerAt.y + 1; y++) {
                // console.log(`BR check ${x}, ${y}`);
                addEffect({x, y}, EffectType.LIGHTNING, formationAt);
            }
        }
    }
}

const applyEffects = (formation: Formation) => {
    applyEffectsTL(formation);
    applyEffectsTR(formation);
    applyEffectsBL(formation);
    applyEffectsBR(formation);
    // render();
}

export const deactivateFormation = (at: xy) => {
    const formation = formations.value.find(f => eqXy(f.at, at));
    if (formation) {
        formation.status = FormationStatus.IDLE;
        clearEffect(at);

        if (formation) {
            console.log(`removing from stack formation: ${formation.title}`);
            removeStackUnitKeepCurrent(formation.title);
        }
    }
}

const checkFormationCorners = (at: xy): FormationCorners => {
    const corners: FormationCorners = {};

    for (const item of items()) {

        if (item.type.category === ItemCategory.FLAG) {

            const xdiff = item.at.x - at.x;
            const ydiff = item.at.y - at.y;

            if (Math.abs(xdiff) === Math.abs(ydiff)) {
                const at = JSON.parse(JSON.stringify(item.at));
                const dist = Math.abs(xdiff);
                if (xdiff < 0 && ydiff < 0) {
                    corners.TL = { at, dist };

                } else if (xdiff > 0 && ydiff < 0) {
                    corners.TR = { at, dist };

                } else if (xdiff < 0 && ydiff > 0) {
                    corners.BL = { at, dist };

                } else if (xdiff > 0 && ydiff > 0) {
                    corners.BR = { at, dist };

                }
            }
        }
    }

    return corners;
}

export const saveFormations = () => {
    const savedState = formations.value.map(({
        title,
        type,
        at,
        corners,
        status,
    }) => ({
        title,
        type,
        at,
        corners,
        status
    }));
    return JSON.stringify(savedState);
}

export const restoreFormations = (savedFormations: string) => {
    const savedState = JSON.parse(savedFormations) as any[];
    formations.value = savedState.map(({
        title,
        type,
        at,
        corners,
        status
    }) => ({
        title,
        type,
        at,
        corners,
        status,
        unit: formationUnit(at, title)
    }));
}