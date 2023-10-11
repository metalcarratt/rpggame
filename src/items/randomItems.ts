import { images } from "@/imageLoader";
import { ItemCategory, ItemType } from "@/items/items";

export const SPIDER_BAIT_NAME = 'Spider Bait';

export const SPIDER_BAIT: ItemType = {
    img: images.animalCorpse,
    title: SPIDER_BAIT_NAME,
    category: ItemCategory.NORMAL
}