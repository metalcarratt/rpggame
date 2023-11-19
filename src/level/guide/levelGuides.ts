import { IMG_PROFILE_COLD, IMG_PROFILE_IMG, IMG_PROFILE_READING } from "@/imageLoader";
import { SUMMON_LABEL } from "../actions/spiritFriend";
import { GuideDirection, GuideType, TargetType } from "../constants";

import { Guide, setGuides } from "./guide";

const NAME = 'Azeena';

export const introDialog = [
    {
        name: NAME,
        speech: `'Brrr... it's colder in here than I expected.'`,
        profileImg: IMG_PROFILE_COLD
    },
    {
        name: NAME,
        speech: `'According to the book, there are tens of thousands of these caves hidden in the north-western mountains that encircle the desert.'`,
        profileImg: IMG_PROFILE_READING
    },
    {
        name: NAME,
        speech: `'They are the remains of an ancient civilization that disappeared a long time ago and are now inhabited by monsters.'`,
        profileImg: IMG_PROFILE_READING
    },
    {
        name: NAME,
        speech: `'This one should just be the lair of a giant spider though. Even though it's tough, with a little bit of skill, I should be able to take it out.'`,
        profileImg: IMG_PROFILE_IMG
    }
]

const movementGuide = {
    name: 'movement guide',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: `Let's explore! I can move here!`,
        direction: GuideDirection.LEFT,
        location: {
            top: 290,
            left: 240
        },
        target: TargetType.CANVAS,
        targetName: TargetType.CANVAS
    },
    ready: () => true,
    finished: (gs) => !gs.u.eqXy(gs.player.data.at, {x: 0, y: 4})
} as Guide;

const baitDialog = {
    name: 'bait dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: `'Are those dead lizards?'`,
            profileImg: IMG_PROFILE_IMG
        },
        {
            name: NAME,
            speech: `'Apparantly spiders like to eat lizards. Maybe I can use them as bait?'`,
            profileImg: IMG_PROFILE_READING
        },
    ],
    ready: (gs) => gs.u.itemVisible(gs.c['SPIDER_BAIT']),
    finished: () => true
} as Guide;

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
    ready: (gs) => gs.u.itemVisible(gs.c['SPIDER_BAIT']),
    finished: (gs) => gs.c["PICK_UP_ACTION"]?.precondition ?? false
} as Guide;

const pickupTooltip: Guide = {
    name: 'pickup tooltip',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: `Click the 'take' action and then choose an item to take`,
        direction: GuideDirection.BOTTOM,
        location: {
            top: -100,
            left: 0
        },
        width: 260,
        target: TargetType.ACTION,
        targetName: 'Pick Up'
    },
    ready: (gs) => gs.c["PICK_UP_ACTION"]?.precondition ?? false,
    finished: (gs) => (gs.currentTurnUnit?.inventory?.quantity('Spider Bait') ?? 0) > 0 ?? false
} as Guide;

const spyDialog = {
    name: 'spy dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: `'This place is scary. I shouldn't just walk around aimlessly like this.'`,
            profileImg: IMG_PROFILE_IMG
        },
        {
            name: NAME,
            speech: `'I know. I can summon my spirit friend. She's a mouse, and whatever she can see, I can see.'`,
            profileImg: IMG_PROFILE_IMG
        },
    ],
    ready: (gs) => gs.currentTurnUnit.data.at.x >= 4,
    finished: () => true
} as Guide;

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
    ready: (ga) => ga.currentTurnUnit.data.at.x >= 4,
    finished: (gs) => gs.playerTeam.some(unit => unit.name === 'Mouse')
} as Guide;

const spiderDialog = {
    name: 'spider dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: `'That's the spider! I need to be careful. There's no way I could defeat that thing by just charging in.'`,
            profileImg: IMG_PROFILE_IMG
        },
        {
            name: NAME,
            speech: `'Lucky I bought materials for laying a formation. According to the book, I need to place a formation plate in the center of a large area and place a lightning flags at each corner.'`,
            profileImg: IMG_PROFILE_READING
        },
        {
            name: NAME,
            speech: `'Then I can activate the formation to release deadly lightning. Better not to get hit by that!'`,
            profileImg: IMG_PROFILE_READING
        },
        {
            name: NAME,
            speech: `'Okay! Let's try laying that formation plate somewhere!'`,
            profileImg: IMG_PROFILE_IMG
        },
    ],
    ready: (gs) => gs.u.unitVisible('Turqoise Spider'),
    finished: () => true
} as Guide;

const formationPlateDialog = {
    name: 'formation plate dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: `'I've laid the formation plate. Now I need to put a lightning flag in one of the four corners. It shouldn't matter how far they are as long as they are on the corner...'`,
            profileImg: IMG_PROFILE_READING
        }
    ],
    ready: (gs) => gs.u.hasFormations(),
    finished: () => true
} as Guide;

const formationCompleteDialog = {
    name: 'formation plate dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: `'The formation is complete. Once I lure the spider here I can activate the formation to zap it.'`,
            profileImg: IMG_PROFILE_READING
        },
        {
            name: NAME,
            speech: `'Better not stand in range of the formation when it's active..!'`,
            profileImg: IMG_PROFILE_IMG
        }
    ],
    ready: (gs) => gs.u.hasFormations() && gs.u.getFormations()[0].status === "Idle",
    finished: () => true
} as Guide;

const spiderDeadDialog = {
    name: 'spider dialog',
    type: GuideType.DIALOG,
    dialog: [
        {
            name: NAME,
            speech: `'I killed it! I actually killed it! I can't believe I really did it!'`,
            profileImg: IMG_PROFILE_IMG
        },
        {
            name: NAME,
            speech: `'Phew! Now that's over, I can leave this place once I'm ready'`,
            profileImg: IMG_PROFILE_IMG
        }
    ],
    ready: (gs) => !gs.u.hasEnemies(),
    finished: () => true
} as Guide;

const exitTooltip: Guide = {
    name: 'exit tooltip',
    type: GuideType.TOOLTIP,
    tooltip: {
        text: 'Click the \'exit level\' action to leave the cave.',
        direction: GuideDirection.BOTTOM_RIGHT,
        location: {
            top: -100,
            left: -150
        },
        width: 260,
        target: TargetType.ACTION,
        targetName: 'Exit Level'
    },
    ready: (gs) => !gs.u.hasEnemies(),
    finished: (gs) => gs.u.isGameOver()
} as Guide;

export const initGuides = () => {
    setGuides([
        movementGuide,
        baitDialog,
        baitTooltip,
        pickupTooltip,
        spyDialog,
        spyTooltip,
        spiderDialog,
        formationPlateDialog,
        formationCompleteDialog,
        spiderDeadDialog,
        exitTooltip
    ]);
}