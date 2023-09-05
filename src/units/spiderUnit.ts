import { xy } from "@/map";
import { Team, Unit } from "./units";
import { images } from "@/imageLoader";
import { findFreeRangeAround } from "@/util";
import { moveCharacter } from "@/moving";

export const bossUnit = (at: xy): Unit => ({
    name: 'boss',
    img: images.spider,
    x: at.x,
    y: at.y,
    team: Team.MONSTER,
    movement: 8,
    actions: [],
    mobMove() {
        const range = findFreeRangeAround({x: this.x, y: this.y}, 1);
        const randomChoice = Math.floor(Math.random() * range.length);
        moveCharacter(range[randomChoice].x, range[randomChoice].y);
    }
});