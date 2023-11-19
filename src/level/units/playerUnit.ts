import { Team, Unit } from "./units";
import { RECALL_SPIRIT_FRIEND_ACTION, SUMMON_SPIRIT_FRIEND_ACTION } from "@/level/actions/spiritFriend";
import { ATTACK_ACTION, EXIT_LEVEL_ACTION, PICK_UP_ACTION, WAIT_ACTION, WALK_ACTION } from "@/level/actions/commonActions";
import { Inventory } from "@/level/items/inventory/inventory";
import { IMG_TYPE } from "../constants";
import { xy } from "../map/xy";
import { UnitType } from "./UnitType";
import { FORMATION_PLATE, LIGHTNING_FLAG } from "../items/itemTypes";

export const PLAYER_NAME = 'Azeena';

export const playerUnit = (at: xy): Unit => ({
    name: PLAYER_NAME,
    img: 'character',
    imgType: IMG_TYPE.STANDING,
    profileImg: 'player_profile.png',
    type: UnitType.PLAYER,
    data: {
        at,
        hp: 2,
        armour: 0,
        qi: 60,
        energy: 2
    },
    power: 2,
    team: Team.PLAYER,
    movement: 2,
    inventory: new Inventory([
        {
            type: LIGHTNING_FLAG,
            quantity: 4
        },
        {
            type: FORMATION_PLATE,
            quantity: 1
        }
    ]),
    actions: [
        SUMMON_SPIRIT_FRIEND_ACTION,
        RECALL_SPIRIT_FRIEND_ACTION,
        PICK_UP_ACTION,
        ATTACK_ACTION,
        WAIT_ACTION,
        WALK_ACTION,
        EXIT_LEVEL_ACTION
    ],
    battleDetails: {
        center: 70,
        rebound: 100,
        top: 30,
        height: 150,
        image: 'ch.png'
    }
});