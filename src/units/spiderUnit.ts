import { xy } from "@/map";
import { Team, Unit, player } from "./units";
import { images } from "@/imageLoader";
import { findFreeRangeAround, findSpaceClosestTo } from "@/util";
import { moveCharacter } from "@/moving";
import { findVisibleTo } from "@/visibility";

export const bossUnit = (at: xy): Unit => ({
    name: 'boss',
    img: images.spider,
    x: at.x,
    y: at.y,
    team: Team.MONSTER,
    movement: 8,
    actions: [],
    mobMove() {
        const visible = findVisibleTo([this]);
        // console.log(`visible: ${JSON.stringify(visible)}`);
        const playerUnit = player();
        if (visible[playerUnit.y][playerUnit.x]) {
            console.log('can see player');
            // charge
            const range = findFreeRangeAround({x: this.x, y: this.y}, 8);
            const closest = findSpaceClosestTo(visible, range, playerUnit, this);
            moveCharacter(closest.x, closest.y);
        } else {
            console.log('can\'t see player');
            // idle
            const range = findFreeRangeAround({x: this.x, y: this.y}, 1);
            const randomChoice = Math.floor(Math.random() * range.length);
            moveCharacter(range[randomChoice].x, range[randomChoice].y);
        }

        
    }
});