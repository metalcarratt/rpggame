import { Action, clickAction } from "../actions/actions";
import { findPlayerVisible, visible } from "../visibility";
import { render } from "../canvas";
import { PLAYER_NAME, playerUnit } from "./playerUnit";
import { bossUnit } from "./spiderUnit";
import { CanTakeTurn, addStackUnit, currentStackUnit, initStack, nextStackUnit, removeStackUnit } from "../turn-stack/turnStack";
import { GAME_OVER_DEFEAT, gameOver, isGameOver } from "@/level/gameStatus";
import { WALK_ACTION } from "@/level/actions/commonActions";
import { Inventory } from "@/level/items/inventory/inventory";
import { items, takeItem } from "@/level/items/items";
import { IMG_TYPE } from "../constants";
import { eqXy } from "../map/util/eqXy";
import { xy } from "../map/xy";
import { UnitBattleDetails, startBattle } from "../battle/battle";
import { UnitType } from "./UnitType";
import { mouseUnit } from "./spiritUnit";
import { Ref, computed, ref } from "vue";

export enum Team {
    PLAYER,
    MOB,
    MONSTER
}

export interface UnitData {
    at: xy,
    energy: number,
    hp: number,
    armour: number,
    qi: number,
    inventory?: Inventory,
    meta?: Record<string, any>
}

export interface Unit extends CanTakeTurn {
    name: string,
    type: UnitType,
    img: string,
    imgType?: IMG_TYPE,
    data: UnitData,
    profileImg?: string,
    team: Team,
    movement: number,
    power: number,
    actions: Action[],
    autoMove?: () => boolean,
    battleDetails: UnitBattleDetails
}

export const units: Ref<Unit[]> = ref([]);

export function initUnits() {
    units.value = [];
    initStack();
    addUnit(createUnit(UnitType.PLAYER, {x: 0, y: 4}));
    addUnit(createUnit(UnitType.SPIDER, {x: 2, y: 7}));
}

export function addUnit(unit: Unit) {
    units.value.push(unit);
    addStackUnit(unit);
}

export function removeUnit(name: string) {
    const unitIndex = units.value.findIndex(unit => unit.name === name);
    if (unitIndex >= 0) {
        units.value.splice(unitIndex, 1);
        removeStackUnit(name);
    }
}

export const unitsZero = () => units.value = [];

export const player = () => units.value.find(unit => unit.name === PLAYER_NAME) as Unit;

export const playerTeam = () => units.value.filter(unit => unit.team === Team.PLAYER);

export const hasEnemies = () => units.value.filter(unit => unit.team === Team.MONSTER).length > 0;

export const unitAt = (at: xy): Unit => units.value.find(unit => unit.data.at.x === at.x && unit.data.at.y == at.y) as Unit;

export const currentTurnUnit = computed(() => currentStackUnit());

export function nextUnitTurn(): void {
    if (isGameOver()) {
        return;
    }
    
    nextStackUnit();

    const currentUnit = currentTurnUnit;
    if (currentUnit) {
        currentUnit.value.data.energy = currentUnit.value.movement;

        doMove(currentUnit.value);
    }
}

export function doMove(currentUnit: CanTakeTurn): void {
    console.log('do move');
    if (currentUnit.autoMove) {
        console.log(`## monster taking move (1)`);
        // console.log(`mob move`);
        const finished = currentUnit.autoMove();
        if (!finished) {
            if (visible[currentUnit.data.at.y][currentUnit.data.at.x]) {
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
    const attackee = units.value.find(unit => eqXy(unit.data.at, targetLocation));

    if (attackee) {

        // console.log(`attack - ${attacker.name} vs ${attackee.name}`);
        if (attackee.data.armour >= attacker.power) {
            attackee.data.armour -= attacker.power;
            // console.log(`attackee armour reduced to ${attackee.armour}`);

        } else {
            const remainingPower = attacker.power - attackee.data.armour;
            attackee.data.armour = 0;
            attackee.data.hp -= remainingPower;
            // console.log(`attackee health reduced to ${attackee.hp}`);
        }

        if (attackee.data.hp < 0) {
            // DEAD
            attackee.data.hp = 0;

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

type SavedUnit = {
    data: UnitData,
    type: UnitType,
    actionsMeta: {
        name: string,
        meta: any
    }[]
}

export const saveUnits = () =>
    JSON.stringify(units.value.map(
        unit => ({
            data: unit.data,
            type: unit.type,
            actionsMeta: unit.actions
                .filter(action => action.meta)
                .map(action => ({
                    name: action.label,
                    meta: action.meta
                }))
        }) as SavedUnit
    )); 

export const restoreUnits = (savedUnits: string) => {
    const parsedUnits = JSON.parse(savedUnits) as SavedUnit[];
    units.value = parsedUnits
        .map(unit => {
            const _unit = createUnit(unit.type, unit.data.at, unit.data);
            for (const actionMeta of unit.actionsMeta) {
                const foundAction = _unit.actions.find(action => action.label === actionMeta.name);
                if (foundAction) foundAction.meta = actionMeta.meta;
            }
            return _unit;
        });
    findPlayerVisible();
}


export const createUnit = (type: UnitType, at: xy, data?: UnitData): Unit => {
    let unit: Unit;
    switch (type) {
        case UnitType.PLAYER:
            unit = playerUnit(at);
            break;
        case UnitType.MOUSE:
            unit = mouseUnit(at);
            break;
        case UnitType.SPIDER:
            unit = bossUnit(at);
            break;
        default:
            throw `no unit for type ${type}`;
    }

    if (data) {
        unit.data = data;
    }

    return unit;
}