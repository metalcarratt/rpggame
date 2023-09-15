import { map, xy } from "./map";
import { Unit, playerTeam } from "./units/units";

export let visible: boolean[][] = [];

export function findPlayerVisible() {
    visible = findVisibleTo(playerTeam());
}

export function findVisibleTo(units: Unit[]): boolean[][] {
    const _visible: boolean[][] = [];
    
    for (let y = 0; y < map.length; y++) {
        _visible[y] =[];
        for (let x = 0; x < map[0].length; x++) {
            _visible[y][x] = false;
        }
    }
    

    for (const unit of units) {
    //     console.log(`_visible: ${JSON.stringify(_visible)}`);
    // console.log(`x: ${unit.x}. y: ${unit.y}`)
        followRight(unit, _visible);
        followLeft(unit, _visible);
        followUp(unit, _visible);
        followDown(unit, _visible);
        followUpLeft(unit, _visible);
        followDownRight(unit, _visible);
        followUpRight(unit, _visible);
        followDownLeft(unit, _visible);
    }

    return _visible;
}

const cangoLeft = (x: number) => x >= 0;
const cangoUp = (y: number) => y >= 0;
const cangoRight = (x: number) =>  x < map[0].length;
const cangoDown = (y: number) =>  y < map.length;
const canMove = (x: number, y: number) => map[y][x] !== 1;

function followRight(from: xy, _visible: boolean[][]) {
    const y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    while (cangoRight(x) && canMove(x, y)) {
        x++;
        _visible[y][x] = true;
        followUpRight({x, y}, _visible);
        followDownRight({x, y}, _visible);
    }
}

function followLeft(from: xy, _visible: boolean[][]) {
    const y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    while (cangoLeft(x) && canMove(x, y)) {
        x--;
        _visible[y][x] = true;
        followUpLeft({x, y}, _visible);
        followDownLeft({x, y}, _visible);
    }
}

function followUp(from: xy, _visible: boolean[][]) {
    let y = from.y;
    const x = from.x;
    _visible[y][x] = true;
    while (cangoUp(y) && canMove(x, y)) {
        y--;
        _visible[y][x] = true;
        followUpLeft({x, y}, _visible);
        followUpRight({x, y}, _visible);
    }
}

function followDown(from: xy, _visible: boolean[][]) {
    let y = from.y;
    const x = from.x;
    _visible[y][x] = true;
    while (cangoDown(y) && canMove(x, y)) {
        y++;
        _visible[y][x] = true;
        followDownLeft({x, y}, _visible);
        followDownRight({x, y}, _visible);
    }
}

function followUpLeft(from: xy, _visible: boolean[][]) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    while (cangoUp(y) && cangoLeft(x) && canMove(x, y)) {
        x--;
        y--;
        _visible[y][x] = true;
    }
}

function followDownRight(from: xy, _visible: boolean[][]) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    while (cangoRight(x) && cangoDown(y) && canMove(x, y)) {
        x++;
        y++;
        _visible[y][x] = true;
    }
}

function followUpRight(from: xy, _visible: boolean[][]) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    while (cangoUp(y) && cangoRight(x) && canMove(x, y)) {
        x++;
        y--;
        _visible[y][x] = true;
    }
}

function followDownLeft(from: xy, _visible: boolean[][]) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    while (cangoDown(y) && cangoLeft(x) && canMove(x, y)) {
        x--;
        y++;
        _visible[y][x] = true;
    }
}