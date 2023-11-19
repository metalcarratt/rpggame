import { images, imgData } from "@/imageLoader"

export type ItemType = {
    img: imgData,
    title: string,
    category: ItemCategory
}

export enum ItemCategory {
    NORMAL,
    FORMATION,
    FLAG
}

export const SPIDER_BAIT = 'Spider Bait';
export const LIGHTNING_FLAG = 'Lightning Flag';
export const FORMATION_PLATE = 'Formation Plate';

export const typeLookup: Record<string, ItemType> = {
    [SPIDER_BAIT]: {
        img: images.animalCorpse,
        title: SPIDER_BAIT,
        category: ItemCategory.NORMAL
    },

    [LIGHTNING_FLAG]: {
        img: images.lightningFlag,
        title: LIGHTNING_FLAG,
        category: ItemCategory.FLAG
    },

    [FORMATION_PLATE]: {
        img: images.formationPlate,
        title: FORMATION_PLATE,
        category: ItemCategory.FORMATION
    }
}