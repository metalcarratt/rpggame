import { xy } from "@/map";
import { Team, Unit } from "./units";
import { images } from "@/imageLoader";
import { WAIT_ACTION } from "@/actions/commonActions";

export const mouseUnit = (at: xy): Unit => ({
    name: 'mouse',
    img: images.mouse,
    x: at.x,
    y: at.y,
    team: Team.PLAYER,
    movement: 4,
    actions: [
        WAIT_ACTION
    ]
});