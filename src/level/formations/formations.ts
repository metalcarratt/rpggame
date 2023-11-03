import { Ref, ref } from "vue";
import { ItemCategory, ItemType, items } from "../items/items";
import { EffectType, addEffect, clearEffect, findEffectsForSource } from "@/level/effects/effects";
import { addStackUnit, removeStackUnit } from "@/level/units/turnStack";
import { attackUnit, player, unitAt } from "@/level/units/units";
import { xy } from "../map/xy";
import { eqXy } from "../map/util/eqXy";

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
    type: ItemType,
    at: xy,
    corners: FormationCorners,
    status: FormationStatus
}

export enum FormationStatus {
    BROKEN = 'Broken',
    IDLE = 'Idle',
    ALIVE = 'Alive'
}

const formations: Ref<Formation[]> = ref([]);

export const addFormation = (title: string, at: xy, type: ItemType) => {
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
        addStackUnit({
            name: 'Lightning Array',
            at: formation.at,
            energy: 1,
            movement: 1,
            autoMove: () => {
                console.log('formation\'s turn');
                player().qi -= 2;
                const effects = findEffectsForSource(formation.at);
                for (const effect of effects) {
                    const unitAtEffect = unitAt(effect.at);
                    if (unitAtEffect) {
                        console.log(`attacking unit at ${unitAtEffect.at.x}, ${unitAtEffect.at.y}`);
                        attackUnit({power: 20, name: 'lightning'}, effect.at);
                    }
                }
                return true;
            }
        });
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
            removeStackUnit(formation.title);
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