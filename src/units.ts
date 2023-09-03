import { Ref, ref } from "vue";
import { images, imgData } from "./imageLoader";
import { Action, SUMMON_SPIRIT_FRIEND_ACTION } from "./actions";
import { xy } from "./map";
import { findMoveTo } from "./moving";
import { findVisible } from "./visibility";
import { render } from "./canvas";

export enum Team {
    PLAYER,
    MOB,
    MONSTER
}

export type Unit = {
    name: string,
    img: imgData,
    x: number,
    y: number,
    team: Team,
    movement: number,
    actions: Action[]
}

export const playerUnit = (at: xy): Unit => ({
    name: 'player',
    img: images.character,
    x: at.x,
    y: at.y,
    team: Team.PLAYER,
    movement: 2,
    actions: [
        SUMMON_SPIRIT_FRIEND_ACTION
    ]
});

export const bossUnit = (at: xy): Unit => ({
    name: 'boss',
    img: images.spider,
    x: at.x,
    y: at.y,
    team: Team.MONSTER,
    movement: 8,
    actions: []
});

export const mouseUnit = (at: xy): Unit => ({
    name: 'mouse',
    img: images.mouse,
    x: at.x,
    y: at.y,
    team: Team.PLAYER,
    movement: 4,
    actions: []
});

export let units: Unit[] = [];

export function initUnits() {
    units = [];
    turnStack.value = [];
    addUnit(playerUnit({x: 0, y: 4}));
    addUnit(bossUnit({x: 2, y: 7}));
    // addUnit(mouseUnit({x: 3, y: 2}));
}

export function addUnit(unit: Unit) {
    units.push(unit);
    turnStack.value.push(unit);
}

export const unitsZero = () => units = [];

export const player = units.find(unit => unit.name === 'player') as Unit;

export const playerTeam = () => units.filter(unit => unit.team === Team.PLAYER);

export const turnStack: Ref<Unit[]> = ref([]);

export const currentTurnUnit = () => turnStack.value[0];

export function nextUnitTurn(): void {
    const unitTaken = turnStack.value.splice(0, 1)[0];
    turnStack.value.push(unitTaken);

    if (currentTurnUnit().team !== Team.PLAYER) {
        return nextUnitTurn();
    }
    console.log(`current unit turn: ${currentTurnUnit().name}`);
    findMoveTo();
    findVisible();
    render();
}