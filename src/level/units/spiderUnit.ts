import { xy } from "@/level/map";
import { Team, Unit, attackUnit, player } from "./units";
import { images } from "@/imageLoader";
import { findRangeAround, findSpaceClosestTo, isNextTo } from "@/level/util";
import { moveCharacter } from "@/level/moving";
import { findVisibleTo } from "@/level/visibility";
import { SPIDER_BAIT_NAME } from "@/level/items/randomItems";
import { items } from "@/level/items/items";
import { IMG_TYPE } from "../constants";

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
    const range = findRangeAround(boss.at, boss.movement);
    const closest = findSpaceClosestTo(visible, range, target, boss.at);
    // console.log(`closest is ${closest.x}, ${closest.y}`);
    if (closest.x === -1 || closest.y === -1) {
        boss.energy = 0;
        return;
    }
    // console.log(`CHARGE to ${closest.x}, ${closest.y}`);
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

const bossMove = (boss: Unit) => {
    while (boss.energy > 0) {
        const visible = findVisibleTo([boss]);
        identifyTarget(boss, visible);
        // console.log(`visible: ${JSON.stringify(visible)}`);
        // const playerUnit = player();
        if (boss.meta && boss.meta.target != null) { //visible[playerUnit.y][playerUnit.x]) {
            // console.log('has a target');

            if (isNextTo(boss.at, boss.meta.target)) {
                // console.log('is next to target');
                attack(boss, boss.meta.target);
            } else {
                // console.log('moving toward target');
                charge(boss, boss.meta.target, visible);
            }
        } else {
            // console.log('has no target');
            idleWalk(boss);
        }
    }

    const visible = findVisibleTo([boss]);
    identifyTarget(boss, visible);
}

export const bossUnit = (at: xy): Unit => ({
    name: 'boss',
    img: images.spider,
    imgType: IMG_TYPE.OVERSIZED,
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
        bossMove(this);
    }
});