import { ref } from "vue";
import { moveCharacter, moveTo } from './moving';
import { actionAt, performAction } from "./actions/actions";
import { xy } from "./map";
import { CELL_SIZE, dpi, getCanvas, offset, render } from "./canvas";
import { nextUnitTurn } from "./units/units";

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
    if (mouseOverMoveTo()) {
        moveCharacter(mouseAt.x + offset.x, mouseAt.y + offset.y);
        nextUnitTurn();
    } else if (mouseOverActionAt()) {
        performAction({x: mouseAt.x + offset.x, y: mouseAt.y + offset.y});
        nextUnitTurn();
    }
}