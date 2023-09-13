import { xy } from "@/map";
import { Team, Unit } from "./units";
import { images } from "@/imageLoader";
import { RECALL_SPIRIT_FRIEND_ACTION, SUMMON_SPIRIT_FRIEND_ACTION } from "@/actions/spiritFriend";
import { ATTACK_ACTION, WAIT_ACTION, WALK_ACTION } from "@/actions/commonActions";

export const playerUnit = (at: xy): Unit => ({
    name: 'player',
    img: images.character,
    x: at.x,
    y: at.y,
    hp: 2,
    armour: 0,
    qi: 60,
    power: 2,
    team: Team.PLAYER,
    movement: 2,
    actions: [
        SUMMON_SPIRIT_FRIEND_ACTION,
        RECALL_SPIRIT_FRIEND_ACTION,
        ATTACK_ACTION,
        WAIT_ACTION,
        WALK_ACTION
    ]
});