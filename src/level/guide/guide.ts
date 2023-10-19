import { DialogType, setDialog } from "@/dialog/dialog";
import { Ref, ref } from "vue";
import { GuideDirection, GuideType, TargetType } from "../constants";

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
    ready: () => boolean,
    finished: () => boolean
}

let guides: Guide[] = [];

const guideText: Ref<Guide | undefined> = ref();

export const getGuide = () => guideText.value;

export const hasTooltip = () => guideText.value?.type === GuideType.TOOLTIP && guideText.value?.tooltip;

export const getTooltip = () => guideText.value?.tooltip;

export const setGuides = (_guides: Guide[]) => {
    guides = _guides;
    guideTick();
}

export const guideTick = () => {
    console.log(`guide tick`);
    if (guideText.value?.finished()) {
        console.log(`guide finished`);
        guideText.value = undefined;
    }

    if (!guideText.value) {
        console.log(`looking for new guides`);
        for (let i = 0; i < guides.length; i++) {
            console.log(`found guide ${guides[i].name}`);
            if (guides[i].ready()) {
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