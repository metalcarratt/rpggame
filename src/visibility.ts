import { map, xy } from "./map";
import { playerTeam } from "./units";

export let visible: boolean[][] = [];

export function findVisible() {
    // console.log('find visible');
    visible = [];
    for (let y = 0; y < map.length; y++) {
        visible[y] =[];
        for (let x = 0; x < map[0].length; x++) {
            visible[y][x] = false;
        }
    }

    for (const unit of playerTeam()) {
        followRight(unit);
        followLeft(unit);
        followUp(unit);
        followDown(unit);
        followUpLeft(unit);
        followDownRight(unit);
        followUpRight(unit);
        followDownLeft(unit);
    }
}

const cangoLeft = (x: number) => x >= 0;
const cangoUp = (y: number) => y >= 0;
const cangoRight = (x: number) =>  x < map[0].length;
const cangoDown = (y: number) =>  y < map.length;
const canMove = (x: number, y: number) => map[y][x] !== 1;

function followRight(from: xy) {
    const y = from.y;
    let x = from.x;
    visible[y][x] = true;
    while (cangoRight(x) && canMove(x, y)) {
        x++;
        visible[y][x] = true;
        followUpRight({x, y});
        followDownRight({x, y});
    }
}

function followLeft(from: xy) {
    const y = from.y;
    let x = from.x;
    visible[y][x] = true;
    while (cangoLeft(x) && canMove(x, y)) {
        x--;
        visible[y][x] = true;
        followUpLeft({x, y});
        followDownLeft({x, y});
    }
}

function followUp(from: xy) {
    let y = from.y;
    const x = from.x;
    visible[y][x] = true;
    while (cangoUp(y) && canMove(x, y)) {
        y--;
        visible[y][x] = true;
        followUpLeft({x, y});
        followUpRight({x, y});
    }
}

function followDown(from: xy) {
    let y = from.y;
    const x = from.x;
    visible[y][x] = true;
    while (cangoDown(y) && canMove(x, y)) {
        y++;
        visible[y][x] = true;
        followDownLeft({x, y});
        followDownRight({x, y});
    }
}

function followUpLeft(from: xy) {
    let y = from.y;
    let x = from.x;
    visible[y][x] = true;
    while (cangoUp(y) && cangoLeft(x) && canMove(x, y)) {
        x--;
        y--;
        visible[y][x] = true;
    }
}

function followDownRight(from: xy) {
    let y = from.y;
    let x = from.x;
    visible[y][x] = true;
    while (cangoRight(x) && cangoDown(y) && canMove(x, y)) {
        x++;
        y++;
        visible[y][x] = true;
    }
}

function followUpRight(from: xy) {
    let y = from.y;
    let x = from.x;
    visible[y][x] = true;
    while (cangoUp(y) && cangoRight(x) && canMove(x, y)) {
        x++;
        y--;
        visible[y][x] = true;
    }
}

function followDownLeft(from: xy) {
    let y = from.y;
    let x = from.x;
    visible[y][x] = true;
    while (cangoDown(y) && cangoLeft(x) && canMove(x, y)) {
        x--;
        y++;
        visible[y][x] = true;
    }
}