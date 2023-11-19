import { Team, Unit } from "./units";
import { WAIT_ACTION, WALK_ACTION } from "@/level/actions/commonActions";
import { xy } from "../map/xy";
import { UnitType } from "./UnitType";

export const mouseUnit = (at: xy): Unit => ({
    name: 'Mouse',
    img: 'mouse',
    profileImg: 'mouse_profile.png',
    type: UnitType.MOUSE,
    data: {
        at,
        hp: 1,
        armour: 0,
        qi: 0,
        energy: 4,
    },
    power: 0,
    team: Team.PLAYER,
    movement: 4,
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