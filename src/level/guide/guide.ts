import { DialogType, setDialog } from "@/dialog/dialog";
import { Ref, ref } from "vue";
import { GuideDirection, GuideType, TargetType } from "../constants";
import { showHelp } from "@/settings";
import { Unit, currentTurnUnit, hasEnemies, player, playerTeam, units } from "../units/units";
import { eqXy } from "../map/util/eqXy";
import { items } from "../items/items";
import { visible } from "../visibility";
import { getFormations, hasFormations } from "../formations/formations";
import { isGameOver } from "../gameStatus";
import { SPIDER_BAIT } from "../items/itemTypes";
import { CanTakeTurn } from "../turn-stack/turnStack";
import { PICK_UP_ACTION } from "../actions/commonActions";



export type Guide = {
    name: string,
    type: GuideType,
    tooltip?: {
        text: string,
        direction: GuideDirection,
        location: {
            left: number,
            top: number
        },
        width?: number,
        target: TargetType,
        targetName: string
    },
    dialog?: DialogType[],
    ready: (gameState: GameState) => boolean,
    finished: (gameState: GameState) => boolean
}

let guides: Guide[] = [];

export const allGuides = () => guides;

const guideText: Ref<Guide | undefined> = ref();

export const getGuide = () => guideText.value;

export const hasTooltip = () => guideText.value?.type === GuideType.TOOLTIP && guideText.value?.tooltip && showHelp;

export const getTooltip = () => guideText.value?.tooltip;

export const setGuides = (_guides: Guide[]) => {
    guides = _guides;
    guideTick();
}

const itemVisible = (itemTitle: string) => items().some(item => 
    item.type.title === itemTitle
    && visible[item.at.y][item.at.x]);

const unitVisible = (unitName: string) => units.value.some(unit => 
    unit.name === unitName
    && visible[unit.data.at.y][unit.data.at.x]
);

type GameState = {
    player: Unit,
    currentTurnUnit: CanTakeTurn,
    playerTeam: Unit[],
    u: {
        eqXy: typeof eqXy,
        itemVisible: typeof itemVisible,
        unitVisible: typeof unitVisible,
        hasFormations: typeof hasFormations,
        getFormations: typeof getFormations,
        hasEnemies: typeof hasEnemies,
        isGameOver: typeof isGameOver
    },
    c: Record<string, any>
}

const createGameState = () => {
    return {
        player: player(),
        currentTurnUnit: currentTurnUnit.value,
        playerTeam: playerTeam(),
        u: {
            eqXy,
            itemVisible,
            unitVisible,
            hasFormations,
            getFormations,
            hasEnemies,
            isGameOver
        },
        c: {
            'SPIDER_BAIT': SPIDER_BAIT,
            'PICK_UP_ACTION': PICK_UP_ACTION
        }
    } as GameState;
}

export const guideTick = () => {
    const gameState = createGameState();

    console.log(`guide tick`);
    if (guideText.value?.finished(gameState)) {
        console.log(`guide finished`);
        guideText.value = undefined;
    }

    if (!guideText.value) {
        console.log(`looking for new guides`);
        for (let i = 0; i < guides.length; i++) {
            console.log(`found guide ${guides[i].name}`);
            if (guides[i].ready(gameState)) {
                console.log(`ready`);
                guideText.value = guides.splice(i, 1)[0];
                if (guideText.value.type === GuideType.DIALOG && guideText.value.dialog) {
                    setDialog(guideText.value.dialog);
                }
                return;
            }
        }
    }
}

const guideToString = ({
    name,
    type,
    tooltip,
    dialog,
    ready,
    finished
}: Guide) => ({
    name,
    type,
    tooltip,
    dialog,
    ready: ready.toString(),
    finished: finished.toString()
});

const stringToGuide = ({
    name,
    type,
    tooltip,
    dialog,
    ready,
    finished
}: any) => ({
    name,
    type,
    tooltip: tooltip ?? undefined,
    dialog: dialog ?? undefined,
    ready: eval(ready),
    finished: eval(finished)
});

export const saveGuides = () => {
    const converedGuideText = guideText.value ? guideToString(guideText.value) : undefined;
    console.log(`converedGuideText: ${JSON.stringify(converedGuideText)}`);
    return JSON.stringify({
        guides: guides.map(guideToString),
        guideText: converedGuideText
    });
}

export const restoreGuides = (savedGuides: string) => {
    const convertedGuides = JSON.parse(savedGuides) as any;
    guides = convertedGuides.guides.map(stringToGuide);
    guideText.value = stringToGuide(convertedGuides.guideText);
}