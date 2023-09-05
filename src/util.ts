import { map, xy } from "./map";
import { units } from "./units/units";

export function findFreeSpaceAround(around: xy): xy[] {
    return findFreeSpaceAroundInternal(around, []);
}

function findFreeSpaceAroundInternal(around: xy, existingSpaces: xy[]): xy[] {
    const spacesAround: xy[] = [];

    for (let iterx = around.x - 1; iterx < (around.x + 2); iterx++) {
        for (let itery = around.y - 1; itery < (around.y + 2); itery++) {
            if (
                iterx >= 0
                && iterx < map[0].length
                && itery >= 0
                && itery < map.length
                && map[itery][iterx] === 0
                && !(units.some(unit => unit.x === iterx && unit.y === itery))
                && !(spacesAround.some(move => move.x == iterx && move.y === itery))
                && !(existingSpaces.some(move => move.x == iterx && move.y === itery))
            ) {
                spacesAround.push({
                    x: iterx,
                    y: itery
                });
            }
        }
    }

    return spacesAround;
}

export function findFreeRangeAround(around: xy, range: number): xy[] {
    // console.log(`findFreeRangeAround, around: ${JSON.stringify(around)}, range: ${range}}`);
    let spacesAround = findFreeSpaceAround(around)

    for (let n = 0; n < range - 1; n++) {
        // console.log(`n=${n}`);
        const length = spacesAround.length;
        for (let iter = 0; iter < length; iter++) {
            spacesAround = spacesAround.concat(findFreeSpaceAroundInternal(spacesAround[iter], spacesAround));
        }
    }

    return spacesAround;
}