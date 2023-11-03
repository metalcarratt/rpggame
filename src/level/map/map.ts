import { initAction } from "../actions/actions";
import { findPlayerVisible } from "../visibility";

export const LEVEL1 = [
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,1,0,1,1,0,0,0,0,0,1],
    [0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1]];

export let map = LEVEL1;

export function initCharacter() {
    // console.log('init character');
    // findMoveTo();
    initAction();
    findPlayerVisible();
    
}

export function updateMap(newMap: number[][]) {
    map = newMap;
    
}