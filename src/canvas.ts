import { map, xy } from "./map";
import { images } from "./imageLoader";
import { visible } from "./visibility";
import { Unit, currentTurnUnit, units } from "./units/units";
import { moveTo } from './moving';
import { actionAt, currentActionColour } from "./actions/actions";
import { mouseAt, mouseMoveListener } from "./mouseHandler";
import { CURRENT_UNIT_COLOUR, MOVEMENT_HOVER_COLOUR } from "./constants";
import { PlacedItem, items } from "./items/items";
import { Effect, EffectType, effects } from "./effects/effects";

export let dpi = 0;
export const CELL_SIZE = 100;

export const offset = {
    x: 0,
    y: 0
}

export const getCanvas = () => document.getElementById("myCanvas") as HTMLCanvasElement;

function setCanvasForDpi() {
    const canvas = getCanvas();
    dpi = window.devicePixelRatio;//get canvas
    const style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    const style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);//scale the canvas
    canvas.setAttribute('height', '' + style_height * dpi);
    canvas.setAttribute('width', '' + style_width * dpi);
}

export function initCanvas() {
    const canvas = getCanvas();
    setCanvasForDpi();

    canvas.addEventListener('mousemove', mouseMoveListener);

    setInterval(animations, 200);
}

let phase = 1;
const animations = () => {
    // console.log(`animate ${phase}`);
    phase++;
    if (phase > 4) {
        phase = 1;
    }

    const canvas = getCanvas();
    const ctx = canvas.getContext("2d");
    if (ctx) {
        for (const effect of effects) {
            drawCell(ctx, effect.at);
        }
    }
}

function drawImage(img: HTMLImageElement, at: xy) {
    // console.log(`visible: ${JSON.stringify(visible)}`);
    // console.log(`at: ${JSON.stringify(at)}`);
    if (visible[at.y][at.x]) {
        
        const canvas = getCanvas();
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const x = (at.x - offset.x) * CELL_SIZE;
        const y = (at.y - offset.y) * CELL_SIZE;

        ctx.drawImage(
            img,
            x,
            y,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawUnit(unit: Unit) {
    drawImage(unit.img.img as HTMLImageElement, unit);

    if (visible[unit.y][unit.x]) {
        const canvas = getCanvas();
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const x = (unit.x - offset.x) * CELL_SIZE;
        const y = (unit.y - offset.y) * CELL_SIZE;
        ctx.font = "25px Arial";

        ctx.fillStyle = "white";
        ctx.fillText(`${unit.armour}`, x + CELL_SIZE - 90, y + CELL_SIZE);

        ctx.fillStyle = "red";
        ctx.fillText(`${unit.hp}`, x + CELL_SIZE - 55, y + CELL_SIZE);

        ctx.fillStyle = "yellow";
        ctx.fillText(`${unit.qi}`, x + CELL_SIZE - 30, y + CELL_SIZE);
    }
}

export const render = () => {
    const canvas = getCanvas();
    const ctx = canvas.getContext("2d");

    if (ctx) {
        // console.log(`canvas.width: ${canvas.width}, canvas.height: ${canvas.height}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawCells(ctx);
        // drawCurrentUnitBg(ctx);
        // drawItems();
        // drawUnits();
        // drawEffects();
        // drawCursor(ctx);
    }
};

function drawCells(ctx: CanvasRenderingContext2D) {
    // console.log('draw cells');
    for (let y = 0 + offset.y; y < map.length; y++) {
        for (let x = 0 + offset.x; x < map[0].length; x++) {
            drawCell(ctx, {x, y});
        }
    }
}

function drawCell(ctx: CanvasRenderingContext2D, at: xy) {
    // console.log(`drawing ${x}, ${y}`);
    if (map[at.y][at.x] === 0) {
        // console.log('floor');
        drawImage(images.floor.img as HTMLImageElement, at);
    } else if (map[at.y][at.x] === 1) {
        // console.log('cave');
        drawImage(images.cave.img as HTMLImageElement, at);
    }

    drawMoveToBg(ctx, at);
    drawActionAtBg(ctx, at);

    drawCurrentUnitBg(ctx, at);
    drawItems(at);
    drawUnits(at);
    drawEffects(at);
    drawCursor(ctx, at);
}

function drawCurrentUnitBg(ctx: CanvasRenderingContext2D, at: xy) {
    if (currentTurnUnit().x === at.x && currentTurnUnit().y === at.y) {
        ctx.fillStyle = CURRENT_UNIT_COLOUR;
        ctx.fillRect(
            (currentTurnUnit().x - offset.x) * CELL_SIZE,
            (currentTurnUnit().y - offset.y) * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawUnits(at: xy) {
    const unit = units.find(unit => unit.x === at.x && unit.y === at.y);
    // for (const unit of units) {
    if (unit) {
        drawUnit(unit);
    }
    // }
}

function drawItem(item: PlacedItem) {
    drawImage(item.type.img.img as HTMLImageElement, item.at);
}

function drawItems(at: xy) {
    const item = items().find(item => item.at.x === at.x && item.at.y === at.y);
    // for (const item of items()) {
    if (item) {
        drawItem(item);
    }
    // }
}

function drawEffect(effect: Effect) {
    // console.log(`draw effect`);
    if (effect.type === EffectType.LIGHTNING) {
        switch (phase) {
            case 1:
                return drawImage(images.lightning1.img as HTMLImageElement, effect.at);
            case 2:
                return drawImage(images.lightning2.img as HTMLImageElement, effect.at);
            case 3:
                return drawImage(images.lightning3.img as HTMLImageElement, effect.at);
            case 4:
                return drawImage(images.lightning4.img as HTMLImageElement, effect.at);
        }
        
    }
}

function drawEffects(at: xy) {
    const effect = effects.find(effect => effect.at.x === at.x && effect.at.y === at.y);
    // for (const effect of effects) {
    if (effect) {
        drawEffect(effect);
    }
    // }
}

function drawCursor(ctx: CanvasRenderingContext2D, at: xy) {
    if (mouseAt.x === at.x && mouseAt.y === at.y) {
        // console.log(`Drawing cursor at ${mouseAt.value.x}, ${mouseAt.value.y}`);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.rect(mouseAt.x * CELL_SIZE, mouseAt.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.stroke();
    }
}

function drawMoveToBg(ctx: CanvasRenderingContext2D, at: xy) {
    if (moveTo.some(loc => loc.x === at.x && loc.y === at.y)) {
        ctx.fillStyle = MOVEMENT_HOVER_COLOUR;
        ctx.fillRect(
            (at.x - offset.x) * CELL_SIZE,
            (at.y - offset.y) * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

function drawActionAtBg(ctx: CanvasRenderingContext2D, at: xy) {
    if (actionAt.some(loc => loc.x === at.x && loc.y === at.y)) {
        ctx.fillStyle = currentActionColour();
        ctx.fillRect(
            (at.x - offset.x) * CELL_SIZE,
            (at.y - offset.y) * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

export function shiftRight() {
    offset.x++;
    render();
}

export function shiftLeft() {
    if (offset.x > 0) { 
        offset.x--;
        render();
    }
}

export function shiftUp() {
    if (offset.y > 0) {
        offset.y--;
        render();
    }
}

export function shiftDown() {
    offset.y++;
    render();
}