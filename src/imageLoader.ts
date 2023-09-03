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
    mouse: initImg()
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
    checkLoaded();
}