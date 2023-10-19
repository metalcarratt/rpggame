import { guideTick } from "@/level/guide/guide";
import { introDialog } from "@/level/guide/levelGuides";
import { Ref, ref } from "vue";

export type DialogType = {
    name: string,
    speech?: string,
    profileImg: string
}

const dialog: Ref<DialogType | undefined> = ref(introDialog[0]);

let dialogList: DialogType[] = [
    introDialog[1],
    introDialog[2],
    introDialog[3]
];

export const hasDialog = (): boolean => dialog.value !== undefined;

export const getDialog = () => dialog.value;

export const dialogNext = () => {
    if (dialogList.length > 0) {
        dialog.value = dialogList.splice(0, 1)[0];
    } else {
        dialog.value = undefined;
        guideTick();
    }
}

export const setDialog = (_dialog: DialogType[]) => {
    dialogList = _dialog;
    dialogNext();
}