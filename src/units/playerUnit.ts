import { xy } from "@/map";
import { Team, Unit } from "./units";
import { images } from "@/imageLoader";
import { RECALL_SPIRIT_FRIEND_ACTION, SUMMON_SPIRIT_FRIEND_ACTION } from "@/actions/spiritFriend";
import { ATTACK_ACTION, EXIT_LEVEL_ACTION, PICK_UP_ACTION, WAIT_ACTION, WALK_ACTION } from "@/actions/commonActions";
import { FORMATION_PLATE, Inventory, LIGHTNING_FLAG } from "@/items/inventory/inventory";

export const PLAYER_NAME = 'player';

export const playerUnit = (at: xy): Unit => ({
    name: PLAYER_NAME,
    img: images.character,
    at,
    hp: 2,
    armour: 0,
    qi: 60,
    power: 2,
    team: Team.PLAYER,
    movement: 2,
    energy: 2,
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
    ]
});