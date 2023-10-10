import { Ref, ref } from "vue";
import { xyd } from "../util";
import { ItemCategory, ItemType, items } from "../items/items";
import { xy } from "../map";
import { EffectType, addEffect, clearEffect } from "@/effects/effects";
import { render } from "@/canvas";

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

const activeFormations: Ref<Formation[]> = ref([]);

export const addActiveFormation = (title: string, at: xy, type: ItemType) => {
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

    activeFormations.value.push(newFormation);
    console.log(`formations: ${JSON.stringify(activeFormations.value)}`);
}

export const updateActiveFormations = () => {
    for (const formation of activeFormations.value) {
        formation.corners = checkFormationCorners(formation.at);
        if (!formation.corners.TL || !formation.corners.TR || !formation.corners.BL || !formation.corners.BR) {
            formation.status = FormationStatus.BROKEN;
        } else {
            formation.status = FormationStatus.IDLE;
        }
    }
}

export const removeActiveFormation = (at: xy) => {
    activeFormations.value.splice(activeFormations.value.findIndex(f => f.at.x === at.x && f.at.y === at.y));
}

export const hasActiveFormations = () => activeFormations.value.length > 0;

export const getActiveFormations = () => activeFormations.value;

export const activateFormation = (at: xy) => {
    const formation = activeFormations.value.find(f => f.at.x == at.x && f.at.y == at.y);
    if (formation) {
        formation.status = FormationStatus.ALIVE;
        applyEffects(formation);
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
    const formation = activeFormations.value.find(f => f.at.x == at.x && f.at.y == at.y);
    if (formation) {
        formation.status = FormationStatus.IDLE;
        clearEffect(at);
    }
}

const checkFormationCorners = (at: xy): FormationCorners => {
    const corners: FormationCorners = {};

    for (const item of items()) {

        if (item.type.category === ItemCategory.FLAG) {

            const xdiff = item.at.x - at.x;
            const ydiff = item.at.y - at.y;

            if (Math.abs(xdiff) === Math.abs(ydiff)) {
                const at = item.at;
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