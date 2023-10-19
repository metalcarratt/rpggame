import { Ref, ref } from "vue";
import { xy } from "@/level/map";
import { Action } from "@/level/actions/actions";
import { Inventory } from "@/level/items/inventory/inventory";

interface CanTakeTurn {
    name: string,
    at: xy,
    energy: number,
    actions?: Action[],
    movement: number,
    inventory?: Inventory,
    autoMove?: () => void
}

const turnStack: Ref<CanTakeTurn[]> = ref([]);

const turnIndex = ref(0);

export function nextStackUnit() {
   
    turnIndex.value++;
    if (turnIndex.value >= turnStack.value.length) {
        turnIndex.value = 0;
    }
}

export function currentStackUnit() {
    return turnStack.value[turnIndex.value];
}

export function removeStackUnit(name: string) {
    console.log(`removing unit ${name}`);
    const stackIndex = turnStack.value.findIndex(unit => unit.name === name);
    // console.log(`stack index: ${stackIndex}`);
    if (stackIndex > 0) {
        turnStack.value.splice(stackIndex, 1);
    }
    console.log(`turn stack: ${JSON.stringify(turnStack.value)}`);
}

export function addStackUnit(unit: CanTakeTurn) {
    turnStack.value.push(unit);
}

export function initStack() {
    turnStack.value = [];
}

export function getStack(): CanTakeTurn[] {
    return turnStack.value;
}