import { imgData } from "../../imageLoader";
import { xy } from "../map";
import { Ref, ref } from 'vue';

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

export type PlacedItem = {
    type: ItemType,
    at: xy
}

const _items: Ref<PlacedItem[]> = ref([]);

export const items = () => _items.value;

export const placeItem = (item: ItemType, at: xy) => {
    _items.value.push({
        type: item,
        at
    });
}

export const takeItem = (at: xy) => {
    return _items.value.splice(_items.value.findIndex(item => item.at.x === at.x && item.at.y === at.y), 1)[0];
}