import { findMoveTo } from "./moving";
import { findVisible } from "./visibility";

export let map = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,1,0,1,1,1,0,1,0,1],
    [0,0,0,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1]
  ];

export type xy = {
    x: number,
    y: number
}

export function initCharacter() {
    // console.log('init character');
    findMoveTo();
    findVisible();
}

export function updateMap(newMap: number[][]) {
    map = newMap;
}