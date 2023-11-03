import { xy } from "../map/xy";

export type Effect = {
    at: xy,
    type: EffectType,
    source: xy
}

export enum EffectType {
    LIGHTNING
}

export let effects: Effect[] = [
    // {
    //     at: {x: 2, y: 4},
    //     type: EffectType.LIGHTNING,
    //     source: {x: 0, y: 0}
    // }
];

export const addEffect = (at: xy, type: EffectType, source: xy) => {
    if (!effects.find(effect => effect.at.x === at.x && effect.at.y === at.y)) {
        // console.log(`adding effect at ${at.x}, ${at.y}`);
        effects.push({
            at,
            type,
            source
        });
    }
}

export const clearEffect = (source: xy) => {
    effects = effects.filter(effect => !(effect.source.x === source.x && effect.source.y === source.y));
}

export const findEffectsForSource = (source: xy) => 
    effects.filter(effect => effect.source.x === source.x && effect.source.y === source.y);
