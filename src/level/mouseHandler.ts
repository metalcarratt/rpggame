import { ref } from "vue";
import { moveTo } from './moving';
import { actionAt, getActionAt, performAction } from "@/level/actions/actions";
import { CELL_SIZE, dpi, getCanvas, offset, render } from "@/level/canvas";
import { currentTurnUnit, nextUnitTurn } from "@/level/units/units";
import { guideTick } from "./guide/guide";
import { xy } from "./map/xy";

export const mouseHover = ref(false);
export const mouseAt: { x: number, y: number } = { x: -1, y: -1 };

export const mouseMoveListener = (event: MouseEvent) => {
    const canvas = getCanvas();
    const rect = canvas.getBoundingClientRect();
    // console.log(`rect: ${rect.left}, ${rect.top}`)
    const x = Math.floor((event.clientX - rect.left) / CELL_SIZE * dpi);
    const y = Math.floor((event.clientY - rect.top) / CELL_SIZE * dpi);
    
    // console.log(event);
    mouseAt.x = x;
    mouseAt.y = y;
    // console.log(`x = ${mouseAt.value.x}, y = ${mouseAt.value.y}, event.clientX: ${event.clientX}, event.clientY: ${event.clientY}`);
    render();

    checkForHover(mouseAt);
}

const checkForHover = (mouseAt: xy) => {
    if (mouseOverMoveTo() || mouseOverActionAt()) {
        mouseHover.value = true;
    } else {
        mouseHover.value = false;
    }
}

const mouseOverMoveTo = () => 
    moveTo.some(loc => loc.x === (mouseAt.x + offset.x) && loc.y === (mouseAt.y + offset.y));

const mouseOverActionAt = () => 
    actionAt.some(loc => loc.x === (mouseAt.x + offset.x) && loc.y === (mouseAt.y + offset.y));

export function clickCanvas() {
    console.log('click');
    // if (mouseOverMoveTo()) {
    //     moveCharacter(mouseAt.x + offset.x, mouseAt.y + offset.y);
    //     nextUnitTurn();
    // } else 

    if (mouseOverActionAt()) {
        const actionAt = getActionAt(mouseAt.x, mouseAt.y);
        performAction({x: mouseAt.x + offset.x, y: mouseAt.y + offset.y, d: actionAt.d});
        // console.log(`unit has ${currentTurnUnit().energy} remaining`);
        if (currentTurnUnit.value.data.energy < 1) {
            nextUnitTurn();
        }
    }

    guideTick();
}