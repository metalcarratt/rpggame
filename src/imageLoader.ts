import { render } from "./level/canvas";

export type imgData = {
    img: null | HTMLImageElement,
    loaded: boolean
}

const initImg = (): imgData => ({
    img: null,
    loaded: false
});

const loadImg = (image: imgData, imgLoc: string) => {
    image.img = new Image();
    image.img.src = imgLoc;
    image.img.onload = () => image.loaded = true;
}

export const images = {
    floor: initImg(),
    cave: initImg(),
    w2: initImg(),
    character: initImg(),
    spider: initImg(),
    mouse: initImg(),
    lightningFlag: initImg(),
    formationPlate: initImg(),
    animalCorpse: initImg(),
    lightning1: initImg(),
    lightning2: initImg(),
    lightning3: initImg(),
    lightning4: initImg(),
    waiting: initImg(),
    attacking: initImg(),
    walking: initImg(),
    talking: initImg(),
    exiting: initImg(),
    summonMouse: initImg(),
    recallMouse: initImg(),
    profileImg: initImg(),
    profileCold: initImg(),
    profileReading: initImg()
}

const checkLoaded = () => {
    const imgs = Object.values(images);
    // console.log(`imgs: ${JSON.stringify(imgs)}`);
    const notLoaded = imgs.filter(img => !img.loaded);
    // console.log(`notLoaded: ${JSON.stringify(notLoaded)}`);
    const numNotLoaded = notLoaded.length;
    // console.log(`numNotLoaded: ${numNotLoaded}`);
    if (numNotLoaded > 0) {
        setTimeout(checkLoaded, 100);
        return;
    }

    render();
}

const IMG_FLOOR = 'f1.jpg';
const IMG_CAVE = 't1.png';
const IMG_WALL = 'ww.jpg'
const IMG_CHARACTER = 'ch.png';
const IMG_SPIDER = 'spider2.png'
const IMG_MOUSE = 'mouse.png';
const IMG_LIGHTNING_FLAG = 'lightning_flag.png';
const IMG_FORMATION_PLATE = 'formation_plate.png';
const IMG_LIZARD = 'lizard.png';
const IMG_LIGHTNING_1 = 'effect_lightning_1.png';
const IMG_LIGHTNING_2 = 'effect_lightning_2.png';
const IMG_LIGHTNING_3 = 'effect_lightning_3.png';
const IMG_LIGHTNING_4 = 'effect_lightning_4.png';
export const IMG_WAITING = 'waiting.png';
export const IMG_ATTACKING = 'attack.png';
export const IMG_WALKING = 'walk.png';
export const IMG_TAKING = 'take.png';
export const IMG_EXITING = 'exit.png';
export const IMG_SUMMON_MOUSE = 'mouse_summon.png';
export const IMG_RECALL_MOUSE = 'mouse_recall.png';
export const IMG_PROFILE_IMG = 'profile.png';
export const IMG_PROFILE_COLD = 'profile_cold.png';
export const IMG_PROFILE_READING = 'profile_reading.png';

export function initImages() {
    loadImg(images.floor, IMG_FLOOR);
    loadImg(images.cave, IMG_CAVE);
    loadImg(images.w2, IMG_WALL);
    loadImg(images.character, IMG_CHARACTER);
    loadImg(images.spider, IMG_SPIDER);
    loadImg(images.mouse, IMG_MOUSE);
    loadImg(images.lightningFlag, IMG_LIGHTNING_FLAG);
    loadImg(images.formationPlate, IMG_FORMATION_PLATE);
    loadImg(images.animalCorpse, IMG_LIZARD);
    loadImg(images.lightning1, IMG_LIGHTNING_1);
    loadImg(images.lightning2, IMG_LIGHTNING_2);
    loadImg(images.lightning3, IMG_LIGHTNING_3);
    loadImg(images.lightning4, IMG_LIGHTNING_4);
    loadImg(images.waiting, IMG_WAITING);
    loadImg(images.attacking, IMG_ATTACKING);
    loadImg(images.walking, IMG_WALKING);
    loadImg(images.talking, IMG_TAKING);
    loadImg(images.exiting, IMG_EXITING);
    loadImg(images.summonMouse, IMG_SUMMON_MOUSE);
    loadImg(images.recallMouse, IMG_RECALL_MOUSE);
    loadImg(images.profileImg, IMG_PROFILE_IMG);
    loadImg(images.profileCold, IMG_PROFILE_COLD);
    loadImg(images.profileReading, IMG_PROFILE_READING);
    checkLoaded();
}