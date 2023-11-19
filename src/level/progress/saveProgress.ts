import { Ref, ref } from "vue";
import { restoreMap, saveMap } from "../map/map";
import { doMove, restoreUnits, saveUnits } from "../units/units";
import { restoreItems, saveItems } from "../items/items";
import { restoreFormations, saveFormations } from "../formations/formations";
import { currentStackUnit, restoreStack, saveStack } from "../turn-stack/turnStack";
import { restoreGuides, saveGuides } from "../guide/guide";
import { restoreMapped, saveMapped } from "../visibility";
import { render } from "../canvas";
import { restoreEffects, saveEffects } from "../effects/effects";
import { restoreGameStatus } from "../gameStatus";

type SavedProgress = {
    time: string,
    map: string,
    units: string,
    items: string,
    formations: string,
    stack: string,
    effects: string,
    guides: string,
    mapped: string
}

const saves: Ref<SavedProgress[]> = ref([]);

export const addSave = () => {
    const savedMap = saveMap();
    const savedUnits = saveUnits();
    const savedItems = saveItems();
    const savedFormations = saveFormations();
    const savedStack = saveStack();
    const savedEffects = saveEffects();
    const savedGuides = saveGuides();
    const savedMapped = saveMapped();

    const time = saves.value.length + 1 + ' - ' + new Date().toLocaleString().split(', ')[1]; 

    const currentProgress = {
        time,
        map: savedMap,
        units: savedUnits,
        items: savedItems,
        formations: savedFormations,
        stack: savedStack,
        effects: savedEffects,
        guides: savedGuides,
        mapped: savedMapped
    }
    console.log(currentProgress);

    saves.value.push(currentProgress);
}

export const hasSaves = (): boolean => saves.value.length > 0;

export const getSaves = () => saves.value.map(save => save.time);

export const restoreSave = (time: string) => {
    console.log(`restoring ${time}`);
    const save = saves.value.find(save => save.time === time);

    if (save) {
        restoreGameStatus();
        restoreMap(save.map);
        restoreUnits(save.units);
        restoreStack(save.stack);
        restoreItems(save.items);
        restoreFormations(save.formations);
        restoreEffects(save.effects);
        restoreMapped(save.mapped);
        restoreGuides(save.guides);
        doMove(currentStackUnit());
        render();
    }
}