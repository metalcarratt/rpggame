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
        while (this.energy > 0) {
            const visible = findVisibleTo([this]);
            // console.log(`visible: ${JSON.stringify(visible)}`);
            const playerUnit = player();
            if (visible[playerUnit.y][playerUnit.x]) {
                // console.log('can see player');

                if (isNextTo(this, playerUnit)) {
                    // attack
                    // console.log('ATTACK!!');
                    attackUnit(this, playerUnit);
                    this.energy = 0;

                } else {
                    // charge
                    const range = findRangeAround({x: this.x, y: this.y}, 1);
                    const closest = findSpaceClosestTo(visible, range, playerUnit, this);
                    if (closest.x === -1 || closest.y === -1) {
                        this.energy = 0;
                        return;
                    }
                    moveCharacter(closest.x, closest.y);
                    this.energy--;
                    
                }
            } else {
                // console.log('can\'t see player');
                // idle
                const range = findRangeAround({x: this.x, y: this.y}, 1);
                const randomChoice = Math.floor(Math.random() * range.length);
                moveCharacter(range[randomChoice].x, range[randomChoice].y);
                this.energy = 0;
            }

        }
    }
});