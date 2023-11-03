import { map } from "../map";
import { xy } from "../xy";
import { isNextTo } from "./isNextTo";

function visibleToLocations(visible: boolean[][]) {
    const locations: xy[] = [];
    for (let y = 0; y < visible.length; y++) {
        for (let x = 0; x < visible[0].length; x++) {
            if (visible[y][x] && map[y][x] === 0) {
                locations.push({x, y});
            }
        }
    }
    return locations;
}

export function findSpaceClosestTo(visible: boolean[][], moves: xy[], target: xy, from: xy): xy {
    const visibleMoves = moves.filter(move => visible[move.y][move.x] && map[move.y][move.x] === 0);
    // console.log(`visible moves=${JSON.stringify(visibleMoves)}`);
    const visibleLocations = visibleToLocations(visible);
    // console.log(`visible locations=${JSON.stringify(visibleLocations)}`);
    const attackableLocations = visibleLocations.filter(move => isNextTo(move, target));
    // console.log(`attackable locations=${JSON.stringify(attackableLocations)}`);

    let closestAttack = {x: -1, y: -1};
    let closestMove = {x: -1, y: -1};
    let closestDistance = -1;
    for (const location of attackableLocations) {
        for (const move of visibleMoves) {
            const distance = Math.abs(location.x - move.x) + Math.abs(location.y - move.y);
            if (closestDistance === - 1 || closestDistance > distance ) {
                closestDistance = distance;
                closestAttack = location;
                closestMove = move;
            }
        }
    }

    // todo may not be in range

    return closestMove;
}