import { PICK_UP_ACTION } from "../actions/commonActions";
import { SUMMON_LABEL } from "../actions/spiritFriend";
import { GuideDirection, GuideType, TargetType } from "../constants";
import { Inventory } from "../items/inventory/inventory";
import { items } from "../items/items";
import { SPIDER_BAIT_NAME } from "../items/randomItems";
import { currentTurnUnit, player, playerTeam, units } from "../units/units";
import { eqXy } from "../util";
import { visible } from "../visibility";
import { Guide, setGuides } from "./guide";

const NAME = 'Azeena';
const PROFILE_IMG = 'profile.png';
const PROFILE_COLD = 'profile_cold.png';
const PROFILE_READING = 'profile_reading.png';

export const introDialog = [
    {
        name: NAME,
        speech: '\'Brrr... It\'s colder in here than I expected.\'',
        profileImg: PROFILE_COLD
    },
    {
        name: NAME,
        speech: '\'According to the book, there are tens of thousands of these caves hidden in the north-western mountains that encircle the desert.\'',
        profileImg: PROFILE_READING
    },
    {
        name: NAME,
        speech: '\'They are the remains of an ancient civilization that disappeared a long time ago and are now inhabited by monsters.\'',
        profileImg: PROFILE_READING
    },
    {
        name: NAME,
        speech: '\'This one should just be the lair of a giant spider though. Even though it\'s tough, with a little bit of skill, I should be able to take it out.\'',
        profileImg: PROFILE_IMG
    }
]

const movementGuide = {
    name: 'movement guide',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: 'Let\'s explore! I can move here!',
        direction: GuideDirection.LEFT,
        location: {
            top: 290,
            left: 240
        },
        target: TargetType.CANVAS,
        targetName: TargetType.CANVAS
    },
    ready: () => true,
    finished: () => !eqXy(player().at, {x: 0, y: 4})
};

const baitVisible = () => items().some(item => 
    item.type.title === SPIDER_BAIT_NAME
    && visible[item.at.y][item.at.x]
)

const baitDialog = {
    name: 'bait dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: '\'Are those dead lizards?\'',
            profileImg: PROFILE_IMG
        },
        {
            name: NAME,
            speech: '\'Apparantly spiders like to eat lizards. Maybe I can use them as bait?\'',
            profileImg: PROFILE_READING
        },
    ],
    ready: baitVisible,
    finished: () => true
}

const baitTooltip = {
    name: 'bait tooltip',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: 'Move within range of the dead lizards',
        direction: GuideDirection.LEFT,
        location: {
            top: 160,
            left: 240
        },
        target: TargetType.CANVAS,
        targetName: TargetType.CANVAS
    },
    ready: baitVisible,
    finished: PICK_UP_ACTION.precondition
}

const pickupTooltip: Guide = {
    name: 'pickup tooltip',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: 'Click the \'take\' action and then choose an item to take',
        direction: GuideDirection.BOTTOM,
        location: {
            top: -100,
            left: 0
        },
        width: 260,
        target: TargetType.ACTION,
        targetName: 'Pick Up'
    },
    ready: PICK_UP_ACTION.precondition,
    finished: () => currentTurnUnit()?.inventory?.items.some(item => item.type.title === SPIDER_BAIT_NAME) ?? false
}

const spyDialog = {
    name: 'spy dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: '\'This place is scary. I shouldn\'t just walk around aimlessly like this.\'',
            profileImg: PROFILE_IMG
        },
        {
            name: NAME,
            speech: '\'I know. I can summon my spirit friend. She\'s a mouse, and whatever she can see, I can see.\'',
            profileImg: PROFILE_IMG
        },
    ],
    ready: () => currentTurnUnit().at.x >= 4,
    finished: () => true
}

const spyTooltip: Guide = {
    name: 'spy tooltip',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: 'Click the \'summon\' action to summon my spirit friend.',
        direction: GuideDirection.BOTTOM,
        location: {
            top: -100,
            left: 0
        },
        width: 260,
        target: TargetType.ACTION,
        targetName: SUMMON_LABEL
    },
    ready: () => currentTurnUnit().at.x >= 4,
    finished: () => playerTeam().some(unit => unit.name === 'Mouse')
}

const spiderVisible = () => units.some(unit => 
    unit.name === 'Turqoise Spider'
    && visible[unit.at.y][unit.at.x]
)

const spiderDialog = {
    name: 'spider dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: '\'That\'s the spider! I need to be careful. There\'s no way I could defeat that thing by just charging in.\'',
            profileImg: PROFILE_IMG
        },
        {
            name: NAME,
            speech: '\'Lucky I bought materials for laying a formation. According to the book, I need to place one formation plate in the center and four lightning flags at each corner.\'',
            profileImg: PROFILE_READING
        },
        {
            name: NAME,
            speech: '\'Then I can activate the formation to release deadly lightning. Better not to get hit by that!\'',
            profileImg: PROFILE_READING
        },
        {
            name: NAME,
            speech: '\'Okay, Azeena! This it it. You can do it!\'',
            profileImg: PROFILE_IMG
        },
    ],
    ready: spiderVisible,
    finished: () => true
}

export const initGuides = () => {
    setGuides([
        movementGuide,
        baitDialog,
        baitTooltip,
        pickupTooltip,
        spyDialog,
        spyTooltip,
        spiderDialog
    ]);
}