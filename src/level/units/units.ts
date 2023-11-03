import { imgData } from "../../imageLoader";
import { Action, clickAction } from "../actions/actions";
import { findPlayerVisible, visible } from "../visibility";
import { render } from "../canvas";
import { PLAYER_NAME, playerUnit } from "./playerUnit";
import { bossUnit } from "./spiderUnit";
import { CanTakeTurn, addStackUnit, currentStackUnit, initStack, nextStackUnit, removeStackUnit } from "./turnStack";
import { GAME_OVER_DEFEAT, gameOver, isGameOver } from "@/level/gameStatus";
import { WALK_ACTION } from "@/level/actions/commonActions";
import { Inventory } from "@/level/items/inventory/inventory";
import { items, takeItem } from "@/level/items/items";
import { IMG_TYPE } from "../constants";
import { eqXy } from "../map/util/eqXy";
import { xy } from "../map/xy";
import { UnitBattleDetails, startBattle } from "../battle/battle";

export enum Team {
    PLAYER,
    MOB,
    MONSTER
}

export interface Unit extends CanTakeTurn {
    name: string,
    img: imgData,
    imgType?: IMG_TYPE,
    at: xy,
    profileImg?: string,
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
    autoMove?: () => boolean,
    battleDetails: UnitBattleDetails
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
    if (unitIndex >= 0) {
        units.splice(unitIndex, 1);
        removeStackUnit(name);
    }
}

export const unitsZero = () => units = [];

export const player = () => units.find(unit => unit.name === PLAYER_NAME) as Unit;

export const playerTeam = () => units.filter(unit => unit.team === Team.PLAYER);

export const hasEnemies = () => units.filter(unit => unit.team === Team.MONSTER).length > 0;

export const unitAt = (at: xy): Unit => units.find(unit => unit.at.x === at.x && unit.at.y == at.y) as Unit;

export const currentTurnUnit = () => currentStackUnit();

export function nextUnitTurn(): void {
    if (isGameOver()) {
        return;
    }
    
    nextStackUnit();

    const currentUnit = currentTurnUnit();
    currentUnit.energy = currentUnit.movement;
    // console.log(`current unit energy: ${currentUnit.energy}`);
    // console.log(`current unit turn: ${currentUnit.name}`);

    // if (currentUnit.autoMove) {
    //     // console.log(`mob move`);
    //     currentUnit.autoMove();
    //     nextUnitTurn();
        
    // } else {
    //     // console.log(`player move`);
    //     // findMoveTo();
    //     startPlayerTurn();
    // }

    doMove(currentUnit);
}

export function doMove(currentUnit: CanTakeTurn): void {
    console.log('do move');
    if (currentUnit.autoMove) {
        console.log(`## monster taking move (1)`);
        // console.log(`mob move`);
        const finished = currentUnit.autoMove();
        if (!finished) {
            if (visible[currentUnit.at.y][currentUnit.at.x]) {
                console.log(`## render and set timer`);
                render();
                setTimeout(() => doMove(currentUnit), 400);
            } else {
                doMove(currentUnit);
            }
            return;
        } else {
            nextUnitTurn();
        }
        
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
    power: number,
    name: string,
    battleDetails?: UnitBattleDetails
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

            removeStackUnit(attackee.name);
            removeUnit(attackee.name);

            // console.log(`attackee dead`);
            if (attackee.name === PLAYER_NAME) {
                gameOver(`Defeated by ${attacker.name}`, GAME_OVER_DEFEAT);
            }
        }
        startBattle(attacker.power, attacker.battleDetails ?? null, attackee.battleDetails);
        render();

        return;
    }

    const item = items().find(item => item.at.x === targetLocation.x && item.at.y === targetLocation.y);

    if (item) {
        takeItem(item.at);
    }
}