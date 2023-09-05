import { Ref, ref } from "vue";
import { Unit } from "./units";

const turnStack: Ref<Unit[]> = ref([]);

export function nextStackUnit() {
    const unitTaken = turnStack.value.splice(0, 1)[0];
    turnStack.value.push(unitTaken);
}

export function currentStackUnit() {
    return turnStack.value[0];
}

export function removeStackUnit(name: string) {
    const stackIndex = turnStack.value.findIndex(unit => unit.name === name);
    turnStack.value.splice(stackIndex, 1);
}

export function addStackUnit(unit: Unit) {
    turnStack.value.push(unit);
}

export function initStack() {
    turnStack.value = [];
}

export function getStack(): Unit[] {
    return turnStack.value;
}