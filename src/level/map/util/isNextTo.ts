import { xy } from "../xy";


export function isNextTo(from: xy, to: xy) {
    return from.x >= to.x - 1 
    && from.x <= to.x + 1 
    && from.y >= to.y - 1 
    && from.y <= to.y + 1
    && !(from.x === to.x && from.y === to.y);
}