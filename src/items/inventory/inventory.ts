import { Ref, ref } from "vue"
import { Action, clickAction, isCurrentAction } from "../../actions/actions"
import { ATTACK_HOVER_COLOUR } from "../../constants"
import { currentTurnUnit } from "../../units/units"
import { SpaceCheckerFunction, xyd } from "../../util"
import { images } from "../../imageLoader"
import { ItemCategory, ItemType, PlacedItem, placeItem } from "../items"
import { WALK_ACTION } from "../../actions/commonActions"
import { ModalDetails, startModal } from "../../actions/modal"
import { addActiveFormation, removeActiveFormation, updateActiveFormations } from "../../formations/formations"

export type InventoryItem = {
    type: ItemType,
    quantity: number
}

export class Inventory {
    items: InventoryItem[] = [];

    constructor(inItems: InventoryItem[]) {
        this.items = inItems;
    }

    removeItem(item: InventoryItem) {
        if (item?.quantity > 1) {
            item.quantity--;
        } else {
            this.items.splice(this.items.findIndex(_item => _item.type.title === item.type.title), 1);
        }
    }

    addItem(item: ItemType) {
        const foundItem = this.items.find(_item => _item.type.title === item.title);
        if (foundItem) {
            foundItem.quantity++;
        } else {
            this.items.push({
                type: item,
                quantity: 1
            })
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

export const LIGHTNING_FLAG: ItemType = {
    img: images.lightningFlag,
    title: 'Lightning Flag',
    category: ItemCategory.FLAG
}

export const FORMATION_PLATE: ItemType = {
    img: images.formationPlate,
    title: 'Formation Plate',
    category: ItemCategory.FORMATION
}

const placeInventoryItem = (at: xyd) => {
    console.log(`perform action inventory`);

    // tidy up
    // currentTurnUnit().energy = 0;
    // if (selectedInventoryItem.value && selectedInventoryItem.value?.quantity > 1) {
    //     selectedInventoryItem.value.quantity--;
    // }
    if (selectedInventoryItem.value) {
        currentTurnUnit().inventory?.removeItem(selectedInventoryItem.value);
        placeItem(selectedInventoryItem.value.type, at);

        if (selectedInventoryItem.value.type.category === ItemCategory.FLAG) {
            updateActiveFormations();
        }
    }
    //  else {
        
    // }

    selectedInventoryItem.value = null;
    clickAction(WALK_ACTION);
}

export const takeInventoryItem = (item: PlacedItem) => {
    currentTurnUnit().inventory?.addItem(item.type);
    if (item.type.category === ItemCategory.FORMATION) {
        removeActiveFormation(item.at);
    } else if (item.type.category === ItemCategory.FLAG) {
        updateActiveFormations();
    }
}

const PlaceItemModal: ModalDetails = {
    inputs: [
        {
            title: 'Formation Name:',
            name: 'name',
            value: ''
        }
    ],
    title: () => `Place ${selectedInventoryItem.value?.type.title}`,
    onSubmit: (at, inputs) => {
        const item = selectedInventoryItem.value as InventoryItem;
        placeInventoryItem(at);
        addActiveFormation(inputs[0].value, at, item.type);
    }
}

export const INVENTORY_ACTION: Action = {
    label: 'Inventory',
    img: '',
    range: {
        range: 1,
        validator: SpaceCheckerFunction.EMPTY_SPACE,
        colour: ATTACK_HOVER_COLOUR
    },
    perform: (at) => {
        if (selectedInventoryItem.value?.type.category === ItemCategory.FORMATION) {
            startModal(PlaceItemModal, at);
            return;
        } else {
            placeInventoryItem(at);
        }
    },
    precondition: () => true,
}

const selectedInventoryItem: Ref<null | InventoryItem> = ref(null);

export const isSelectedInventoryItem = (item: InventoryItem): boolean => 
    isCurrentAction(INVENTORY_ACTION)
    && item.type.title === selectedInventoryItem.value?.type.title;

export const clickInventory = (item: InventoryItem) => {
    console.log(`click inventory item ${item.type.title}`);
    selectedInventoryItem.value = item;
    clickAction(INVENTORY_ACTION);
}