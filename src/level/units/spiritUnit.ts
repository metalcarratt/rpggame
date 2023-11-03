import { Team, Unit } from "./units";
import { images } from "@/imageLoader";
import { WAIT_ACTION, WALK_ACTION } from "@/level/actions/commonActions";
import { xy } from "../map/xy";

export const mouseUnit = (at: xy): Unit => ({
    name: 'Mouse',
    img: images.mouse,
    profileImg: 'mouse_profile.png',
    at,
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
    ],
    battleDetails: {
        center: 85,
        rebound: 105,
        top: 85,
        height: 80,
        image: 'mouse.png'
    }
});