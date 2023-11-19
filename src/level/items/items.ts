import { Ref, ref } from 'vue';
import { xy } from "../map/xy";
import { ItemType, typeLookup } from "./itemTypes";

type StoredItem = {
    type: string,
    at: xy
}

export type PlacedItem = {
    type: ItemType,
    at: xy
}

const _items: Ref<StoredItem[]> = ref([]);

const mapStoredToPlacedItem =(item: StoredItem) => ({
    type: typeLookup[item.type],
    at: item.at
})

export const items = (): PlacedItem[] => _items.value.map(mapStoredToPlacedItem);

export const placeItem = (type: string, at: xy) => {
    _items.value.push({
        type,
        at
    });
}

export const takeItem = (at: xy) => {
    return _items.value
        .splice(_items.value.findIndex(item => item.at.x === at.x && item.at.y === at.y), 1)
        .map(mapStoredToPlacedItem)[0];
}

export const saveItems = () => {
    return JSON.stringify(_items.value);
}

export const restoreItems = (savedItems: string) => {
    _items.value = JSON.parse(savedItems);
}