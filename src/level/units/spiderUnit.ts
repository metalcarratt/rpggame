import { Team, Unit, attackUnit, player } from "./units";
import { images } from "@/imageLoader";
import { moveCharacter } from "@/level/moving";
import { findVisibleTo } from "@/level/visibility";
import { SPIDER_BAIT_NAME } from "@/level/items/randomItems";
import { items } from "@/level/items/items";
import { IMG_TYPE } from "../constants";
import { isNextTo } from "../map/util/isNextTo";
import { findRangeAround } from "../map/util/findAround";
import { findSpaceClosestTo } from "../map/util/findSpace";
import { xy } from "../map/xy";

const attack = (boss: Unit, target: xy) => {
    // console.log('ATTACK!!');
    attackUnit(boss, target);
    boss.energy = 0;
    if (boss.meta) {
        boss.meta.target = null;
    }
}

const identifyTarget = (boss: Unit, visible: boolean[][]) => {
    if (boss.meta) {
        const _player = player();
        if (_player && visible[_player.at.y][_player.at.x]) {
            boss.meta.target = _player.at;
            // console.log(`PLAYER IDENTFIED at ${_player.at.x}, ${_player.at.y}`);
            return;
        }

        const baits = items().filter(item => item.type.title === SPIDER_BAIT_NAME);
        for (const bait of baits) {
            if (visible[bait.at.y][bait.at.x]) {
                boss.meta.target = bait.at;
                // console.log(`BAIT IDENTFIED at ${bait.at.x}, ${bait.at.y}`);
                return;
            }
        }
    }
}

const charge = (boss: Unit, target: xy, visible: boolean[][]) => {
    const range = findRangeAround(boss.at, 1);
    // console.log(`range is ${JSON.stringify(range)}`);
    // console.log(`target is ${JSON.stringify(target)}`);
    // console.log(`visible is ${JSON.stringify(visible)}`);
    const closest = findSpaceClosestTo(visible, range, target, boss.at);
    console.log(`closest is ${closest.x}, ${closest.y}`);
    if (closest.x === -1 || closest.y === -1) {
        if (boss.meta) boss.meta.target = null;
        return;
    }
    console.log(`CHARGE from ${boss.at.x}, ${boss.at.y} to ${closest.x}, ${closest.y}`);
    moveCharacter(closest.x, closest.y);
    boss.energy--;
}

const idleWalk = (boss: Unit) => {
    const range = findRangeAround(boss.at, 1);
    const randomChoice = Math.floor(Math.random() * range.length);
    const toX = range[randomChoice].x;
    const toY = range[randomChoice].y;
    // console.log(`WALK to ${toX}, ${toY}`);
    moveCharacter(toX, toY);
    boss.energy = 0;
}

const bossMove = (boss: Unit): boolean => {
    console.log('boss move');
    // while (boss.energy > 0) {
        let visible = findVisibleTo([boss]);
        identifyTarget(boss, visible);
        // console.log(`visible: ${JSON.stringify(visible)}`);
        // const playerUnit = player();
        if (boss.meta && boss.meta.target != null) { //visible[playerUnit.y][playerUnit.x]) {
            // console.log('has a target');

            if (isNextTo(boss.at, boss.meta.target)) {
                // console.log('is next to target');
                console.log('attacking');
                attack(boss, boss.meta.target);
            } else {
                // console.log('moving toward target');
                console.log('charging');
                charge(boss, boss.meta.target, visible);
            }
        } else {
            // console.log('has no target');
            console.log('idling');
            idleWalk(boss);
        }
    // }

    visible = findVisibleTo([boss]);
    identifyTarget(boss, visible);
    return boss.energy <= 0;
}



export const bossUnit = (at: xy): Unit => ({
    name: 'Turqoise Spider',
    img: images.spider,
    imgType: IMG_TYPE.OVERSIZED,
    profileImg: 'spider_profile.png',
    at,
    hp: 2,
    armour: 10,
    qi: 0,
    power: 10,
    team: Team.MONSTER,
    movement: 8,
    energy: 8,
    actions: [],
    meta: {
        target: null
    },
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