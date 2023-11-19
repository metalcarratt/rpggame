import { Team, Unit, attackUnit, player } from "./units";
import { moveCharacter } from "@/level/moving";
import { findVisibleTo } from "@/level/visibility";
import { items } from "@/level/items/items";
import { IMG_TYPE } from "../constants";
import { isNextTo } from "../map/util/isNextTo";
import { findRangeAround } from "../map/util/findAround";
import { findSpaceClosestTo } from "../map/util/findSpace";
import { xy } from "../map/xy";
import { UnitType } from "./UnitType";
import { SPIDER_BAIT } from "../items/itemTypes";

const attack = (boss: Unit, target: xy) => {
    // console.log('ATTACK!!');
    attackUnit(boss, target);
    boss.data.energy = 0;
    if (boss.data.meta) {
        boss.data.meta.target = null;
    }
}

const identifyTarget = (boss: Unit, visible: boolean[][]) => {
    if (boss.data.meta) {
        const _player = player();
        if (_player && visible[_player.data.at.y][_player.data.at.x]) {
            boss.data.meta.target = _player.data.at;
            console.log(`PLAYER IDENTFIED at ${_player.data.at.x}, ${_player.data.at.y}`);
            return;
        }

        const baits = items().filter(item => item.type.title === SPIDER_BAIT);
        for (const bait of baits) {
            if (visible[bait.at.y][bait.at.x]) {
                boss.data.meta.target = bait.at;
                console.log(`BAIT IDENTFIED at ${bait.at.x}, ${bait.at.y}`);
                return;
            }
        }
    }
}

const charge = (boss: Unit, target: xy, visible: boolean[][]) => {
    const range = findRangeAround(boss.data.at, 1);
    // console.log(`range is ${JSON.stringify(range)}`);
    // console.log(`target is ${JSON.stringify(target)}`);
    // console.log(`visible is ${JSON.stringify(visible)}`);
    const closest = findSpaceClosestTo(visible, range, target, boss.data.at);
    console.log(`closest is ${closest.x}, ${closest.y}`);
    if (closest.x === -1 || closest.y === -1) {
        if (boss.data.meta) boss.data.meta.target = null;
        return;
    }
    console.log(`CHARGE from ${boss.data.at.x}, ${boss.data.at.y} to ${closest.x}, ${closest.y}`);
    moveCharacter(closest.x, closest.y);
    boss.data.energy--;
}

const idleWalk = (boss: Unit) => {
    const range = findRangeAround(boss.data.at, 1);
    const randomChoice = Math.floor(Math.random() * range.length);
    const toX = range[randomChoice].x;
    const toY = range[randomChoice].y;
    // console.log(`WALK to ${toX}, ${toY}`);
    moveCharacter(toX, toY);
    boss.data.energy = 0;
}

const bossMove = (boss: Unit): boolean => {
    console.log('boss move');
    // while (boss.energy > 0) {
        let visible = findVisibleTo([boss]);
        identifyTarget(boss, visible);
        // console.log(`visible: ${JSON.stringify(visible)}`);
        // const playerUnit = player();
        if (boss.data.meta && boss.data.meta.target != null) { //visible[playerUnit.y][playerUnit.x]) {
            // console.log('has a target');

            if (isNextTo(boss.data.at, boss.data.meta.target)) {
                // console.log('is next to target');
                console.log('attacking');
                attack(boss, boss.data.meta.target);
            } else {
                // console.log('moving toward target');
                console.log('charging');
                charge(boss, boss.data.meta.target, visible);
            }
        } else {
            // console.log('has no target');
            console.log('idling');
            idleWalk(boss);
        }
    // }

    visible = findVisibleTo([boss]);
    identifyTarget(boss, visible);
    return boss.data.energy <= 0;
}



export const bossUnit = (at: xy): Unit => ({
    name: 'Turqoise Spider',
    img: 'spider',
    imgType: IMG_TYPE.OVERSIZED,
    type: UnitType.SPIDER,
    profileImg: 'spider_profile.png',
    data: {
        at,
        hp: 2,
        armour: 10,
        qi: 0,
        energy: 8,
        meta: {
            target: null
        }
    },
    power: 10,
    team: Team.MONSTER,
    movement: 8,
    actions: [],
    autoMove() {
        return bossMove(this);
    },
    battleDetails: {
        center: 35,
        rebound: 55,
        top: 40,
        height: 180,
        image: 'spider2.png'
    }
});