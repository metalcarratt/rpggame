import { initAction } from "./actions/actions";
import { findPlayerVisible } from "./visibility";

export let map = [
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,1,0,1,1,0,0,0,0,0,1],
    [0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,0,0,0,0,0,1],
    [1,0,0,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1]
  ];

export type xy = {
    x: number,
    y: number
}

export function initCharacter() {
    // console.log('init character');
    // findMoveTo();
    initAction();
    findPlayerVisible();
    
}

export function updateMap(newMap: number[][]) {
    map = newMap;
    
}