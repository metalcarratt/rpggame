import { imgData } from "../imageLoader";
import { Action, clickAction } from "../actions/actions";
import { findPlayerVisible } from "../visibility";
import { render } from "../canvas";
import { PLAYER_NAME, playerUnit } from "./playerUnit";
import { bossUnit } from "./spiderUnit";
import { addStackUnit, currentStackUnit, initStack, nextStackUnit, removeStackUnit } from "./turnStack";
import { gameOver } from "@/gameStatus";
import { xy } from "@/map";
import { WALK_ACTION } from "@/actions/commonActions";
import { Inventory } from "@/items/inventory/inventory";
import { items, takeItem } from "@/items/items";
import { eqXy } from "@/util";

export enum Team {
    PLAYER,
    MOB,
    MONSTER
}

export type Unit = {
    name: string,
    img: imgData,
    at: xy,
    // x: number,
    // y: number,
    team: Team,
    movement: number,
    energy: number,
    hp: number,
    armour: number,
    qi: number,
    power: number,
    inventory?: Inventory,
    actions: Action[],
    meta?: Record<string, any>,
    autoMove?: () => void
}

export let units: Unit[] = [];

export function initUnits() {
    units = [];
    initStack();
    addUnit(playerUnit({x: 0, y: 4}));
    addUnit(bossUnit({x: 2, y: 7}));
}

export function addUnit(unit: Unit) {
    units.push(unit);
    addStackUnit(unit);
}

export function removeUnit(name: string) {
    const unitIndex = units.findIndex(unit => unit.name === name);
    units.splice(unitIndex, 1);

    removeStackUnit(name);
}

export const unitsZero = () => units = [];

export const player = () => units.find(unit => unit.name === PLAYER_NAME) as Unit;

export const playerTeam = () => units.filter(unit => unit.team === Team.PLAYER);

export const unitAt = (at: xy): Unit => units.find(unit => unit.at.x === at.x && unit.at.y == at.y) as Unit;

export const currentTurnUnit = () => currentStackUnit();

export function nextUnitTurn(): void {
    nextStackUnit();

    const currentUnit = currentTurnUnit();
    currentUnit.energy = currentUnit.movement;
    // console.log(`current unit energy: ${currentUnit.energy}`);
    // console.log(`current unit turn: ${currentUnit.name}`);

    if (currentUnit.autoMove) {
        // console.log(`mob move`);
        currentUnit.autoMove();
        nextUnitTurn();
        
    } else {
        // console.log(`player move`);
        // findMoveTo();
        startPlayerTurn();
    }
}

export function startPlayerTurn() {
    findPlayerVisible();
    clickAction(WALK_ACTION);
    render();
}

interface Attacker {
    power: number
}

export function attackUnit(attacker: Attacker, targetLocation: xy) {
    const attackee = units.find(unit => eqXy(unit.at, targetLocation));

    if (attackee) {

        // console.log(`attack - ${attacker.name} vs ${attackee.name}`);
        if (attackee.armour >= attacker.power) {
            attackee.armour -= attacker.power;
            // console.log(`attackee armour reduced to ${attackee.armour}`);

        } else {
            const remainingPower = attacker.power - attackee.armour;
            attackee.armour = 0;
            attackee.hp -= remainingPower;
            // console.log(`attackee health reduced to ${attackee.hp}`);
        }

        if (attackee.hp < 0) {
            // DEAD
            attackee.hp = 0;
            // console.log(`attackee dead`);
            if (attackee.name === 'player') {
                gameOver();
            }
        }

        return;
    }

    const item = items().find(item => item.at.x === targetLocation.x && item.at.y === targetLocation.y);

    if (item) {
        takeItem(item.at);
    }
}