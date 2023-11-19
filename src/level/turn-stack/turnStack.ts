import { Ref, ref } from "vue";
import { Action } from "@/level/actions/actions";
import { Inventory } from "@/level/items/inventory/inventory";
import { Unit, units } from "../units/units";
import { xy } from "../map/xy";
import { findFormationUnit } from "../formations/formations";

export interface CanTakeTurn {
    name: string,
    actions?: Action[],
    movement: number,
    inventory?: Inventory,
    data: {
        at: xy,
        energy: number
    }
    autoMove?: () => boolean // true means finished
}

const turnStack: Ref<string[]> = ref([]);

const turnIndex = ref(0);

export function nextStackUnit() {
   let newIndex = turnIndex.value + 1;
    if (newIndex >= turnStack.value.length) {
        newIndex = 0;
    }
    turnIndex.value = newIndex;
}

export function currentStackUnit(): CanTakeTurn {
    console.log(`-- get current stack unit index=${turnIndex.value}`);
    // console.trace();
    const name = turnStack.value[turnIndex.value];
    console.log(`name=${name}, turnStack=${JSON.stringify(turnStack.value)}`);
    const unit = units.value.find(unit => unit.name === name) as Unit;
    if (unit) {
        return unit;
    }
    
    return findFormationUnit(name)?.unit as CanTakeTurn;
    
}

export function hasStackUnit(name: string): boolean {
    return turnStack.value.includes(name);
}

export function removeStackUnitKeepCurrent(name: string) {
    console.log(`removing unit ${name}`);
    const stackIndex = turnStack.value.indexOf(name);
    // console.log(`stack index: ${stackIndex}`);
    if (stackIndex > 0) {
        turnStack.value.splice(stackIndex, 1);
    }
}

export function removeStackUnit(name: string) {
    removeStackUnitKeepCurrent(name);
    nextStackUnit();
    console.log(`turn stack: ${JSON.stringify(turnStack.value)}`);
}

export function addStackUnit(unit: CanTakeTurn) {
    turnStack.value.push(unit.name);
}

export function initStack() {
    turnStack.value = [];
}

export function getStackUnits(): CanTakeTurn[] {
    return turnStack.value
        .map(name => {
            const unit = units.value.find(unit => unit.name === name)
            if (unit) return unit;
            return findFormationUnit(name)?.unit as CanTakeTurn
        })
        .filter(unit => !!unit) as CanTakeTurn[];
}

export function saveStack() {
    return JSON.stringify({
        stack: turnStack.value,
        index: turnIndex.value
    });
}

export function restoreStack(savedStack: string) {
    const saved = JSON.parse(savedStack);
    turnStack.value = saved.stack;
    turnIndex.value = saved.index;
}