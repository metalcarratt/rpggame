import { map } from "./map/map";
import { xy } from "./map/xy";
import { Unit, playerTeam } from "./units/units";

export let visible: boolean[][] = [];
export let mapped: boolean[][] = [];

export function initVisibility() {
    for (let y = 0; y < map.length; y++) {
        mapped[y] =[];
        for (let x = 0; x < map[0].length; x++) {
            mapped[y][x] = false;
        }
    }
}

export function findPlayerVisible() {
    visible = findVisibleTo(playerTeam(), true);
}

export function findVisibleTo(units: Unit[], player: boolean = false): boolean[][] {
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
        followRight(unit.data.at, _visible, player);
        followLeft(unit.data.at, _visible, player);
        followUp(unit.data.at, _visible, player);
        followDown(unit.data.at, _visible, player);
        followUpLeft(unit.data.at, _visible, player);
        followDownRight(unit.data.at, _visible, player);
        followUpRight(unit.data.at, _visible, player);
        followDownLeft(unit.data.at, _visible, player);
    }

    return _visible;
}

const cangoLeft = (x: number) => x >= 0;
const cangoUp = (y: number) => y >= 0;
const cangoRight = (x: number) =>  x < map[0].length;
const cangoDown = (y: number) =>  y < map.length;
const canMove = (x: number, y: number) => map[y][x] !== 1;

function followRight(from: xy, _visible: boolean[][], player: boolean) {
    const y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoRight(x) && canMove(x, y)) {
        x++;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
        followUpRight({x, y}, _visible, player);
        followDownRight({x, y}, _visible, player);
    }
}

function followLeft(from: xy, _visible: boolean[][], player: boolean) {
    const y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoLeft(x) && canMove(x, y)) {
        x--;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
        followUpLeft({x, y}, _visible, player);
        followDownLeft({x, y}, _visible, player);
    }
}

function followUp(from: xy, _visible: boolean[][], player: boolean) {
    let y = from.y;
    const x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoUp(y) && canMove(x, y)) {
        y--;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
        followUpLeft({x, y}, _visible, player);
        followUpRight({x, y}, _visible, player);
    }
}

function followDown(from: xy, _visible: boolean[][], player: boolean) {
    let y = from.y;
    const x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoDown(y) && canMove(x, y)) {
        y++;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
        followDownLeft({x, y}, _visible, player);
        followDownRight({x, y}, _visible, player);
    }
}

function followUpLeft(from: xy, _visible: boolean[][], player: boolean) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoUp(y) && cangoLeft(x) && canMove(x, y)) {
        x--;
        y--;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
    }
}

function followDownRight(from: xy, _visible: boolean[][], player: boolean) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoRight(x) && cangoDown(y) && canMove(x, y)) {
        x++;
        y++;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
    }
}

function followUpRight(from: xy, _visible: boolean[][], player: boolean) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoUp(y) && cangoRight(x) && canMove(x, y)) {
        x++;
        y--;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
    }
}

function followDownLeft(from: xy, _visible: boolean[][], player: boolean) {
    let y = from.y;
    let x = from.x;
    _visible[y][x] = true;
    if (player) mapped[y][x] = true;
    while (cangoDown(y) && cangoLeft(x) && canMove(x, y)) {
        x--;
        y++;
        _visible[y][x] = true;
        if (player) mapped[y][x] = true;
    }
}

export const saveMapped = () => {
    return JSON.stringify({mapped, visible});
}

export const restoreMapped = (savedMapped: string) => {
    const restore = JSON.parse(savedMapped) as any;
    mapped = restore.mapped;
    visible = restore.visible;
}