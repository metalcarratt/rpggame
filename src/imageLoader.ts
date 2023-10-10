import { render } from "./canvas";

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

export function initImages() {
    loadImg(images.floor, '../floor1.jpg');
    loadImg(images.cave, '../cave.jpg');
    loadImg(images.character, '../chara.png');
    loadImg(images.spider, '../spider.png');
    loadImg(images.mouse, '../mouse.png');
    loadImg(images.lightningFlag, '../lightning_flag.png');
    loadImg(images.formationPlate, '../formation_plate.png');
    loadImg(images.animalCorpse, '../animal.png');
    loadImg(images.lightning1, '../effect_lightning_1.png');
    loadImg(images.lightning2, '../effect_lightning_2.png');
    loadImg(images.lightning3, '../effect_lightning_3.png');
    loadImg(images.lightning4, '../effect_lightning_4.png');
    checkLoaded();
}