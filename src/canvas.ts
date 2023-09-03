import { map, xy } from "./map";
import { images } from "./imageLoader";
import { visible } from "./visibility";
import { currentTurnUnit, units } from "./units";
import { moveCharacter, moveTo } from './moving';
import { actionAt } from "./actions";
import { mouseAt, mouseMoveListener } from "./mouseHandler";

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
}

function drawImage(img: HTMLImageElement, at: xy) {
    if (visible[at.y][at.x]) {
        // console.log('visible');
        const canvas = getCanvas();
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(
            img,
            (at.x - offset.x) * CELL_SIZE,
            (at.y - offset.y) * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

export const render = () => {
    const canvas = getCanvas();
    const ctx = canvas.getContext("2d");

    if (ctx) {
        // console.log(`canvas.width: ${canvas.width}, canvas.height: ${canvas.height}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawCells(ctx);
        drawCurrentUnitBg(ctx);
        drawUnits();
        drawCursor(ctx);
    }
};

function drawCells(ctx: CanvasRenderingContext2D) {
    // console.log('draw cells');
    for (let y = 0 + offset.y; y < map.length; y++) {
        for (let x = 0 + offset.x; x < map[0].length; x++) {
            // console.log(`drawing ${x}, ${y}`);
            if (map[y][x] === 0) {
                // console.log('floor');
                drawImage(images.floor.img as HTMLImageElement, {x, y});
            } else if (map[y][x] === 1) {
                // console.log('cave');
                drawImage(images.cave.img as HTMLImageElement, {x, y});
            }

            drawMoveToBg(ctx, {x, y});
            drawActionAtBg(ctx, {x, y});
        }
    }
}

function drawCurrentUnitBg(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 207, 71, 0.3)';
    ctx.fillRect(
        (currentTurnUnit().x - offset.x) * CELL_SIZE,
        (currentTurnUnit().y - offset.y) * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
    );
}

function drawUnits() {
    for (const unit of units) {
        drawImage(unit.img.img as HTMLImageElement, unit);
    }
}

function drawCursor(ctx: CanvasRenderingContext2D) {
    // console.log(`Drawing cursor at ${mouseAt.value.x}, ${mouseAt.value.y}`);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.rect(mouseAt.x * CELL_SIZE, mouseAt.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.stroke();
}

function drawMoveToBg(ctx: CanvasRenderingContext2D, at: xy) {
    if (moveTo.some(loc => loc.x === at.x && loc.y === at.y)) {
        ctx.fillStyle = 'rgba(255, 98, 164, 0.3)';
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
        ctx.fillStyle = 'rgba(143, 50, 168, 0.3)';
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