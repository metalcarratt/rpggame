import { Ref, ref } from "vue";
import { Unit } from "./units";
import { xy } from "@/map";
import { Action } from "@/actions/actions";
import { Inventory } from "@/items/inventory/inventory";

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

export function nextStackUnit() {
    const unitTaken = turnStack.value.splice(0, 1)[0];
    turnStack.value.push(unitTaken);
}

export function currentStackUnit() {
    return turnStack.value[0];
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