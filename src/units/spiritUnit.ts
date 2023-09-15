import { xy } from "@/map";
import { Team, Unit } from "./units";
import { images } from "@/imageLoader";
import { WAIT_ACTION, WALK_ACTION } from "@/actions/commonActions";

export const mouseUnit = (at: xy): Unit => ({
    name: 'mouse',
    img: images.mouse,
    x: at.x,
    y: at.y,
    hp: 1,
    armour: 0,
    qi: 0,
    power: 0,
    team: Team.PLAYER,
    movement: 4,
    energy: 4,
    actions: [
        WAIT_ACTION,
        WALK_ACTION

    ]
});