import { xy } from "@/map";
import { Team, Unit, attackUnit, player } from "./units";
import { images } from "@/imageLoader";
import { findRangeAround, findSpaceClosestTo, isNextTo } from "@/util";
import { moveCharacter } from "@/moving";
import { findVisibleTo } from "@/visibility";

export const bossUnit = (at: xy): Unit => ({
    name: 'boss',
    img: images.spider,
    x: at.x,
    y: at.y,
    hp: 2,
    armour: 10,
    qi: 0,
    power: 10,
    team: Team.MONSTER,
    movement: 8,
    energy: 8,
    actions: [],
    mobMove() {
        const visible = findVisibleTo([this]);
        // console.log(`visible: ${JSON.stringify(visible)}`);
        const playerUnit = player();
        if (visible[playerUnit.y][playerUnit.x]) {
            // console.log('can see player');

            if (isNextTo(this, playerUnit)) {
                // attack
                // console.log('ATTACK!!');
                attackUnit(this, playerUnit);

            } else {
                // charge
                const range = findRangeAround({x: this.x, y: this.y}, 8);
                const closest = findSpaceClosestTo(visible, range, playerUnit, this);
                moveCharacter(closest.x, closest.y);
            }
        } else {
            // console.log('can\'t see player');
            // idle
            const range = findRangeAround({x: this.x, y: this.y}, 1);
            const randomChoice = Math.floor(Math.random() * range.length);
            moveCharacter(range[randomChoice].x, range[randomChoice].y);
        }

        
    }
});