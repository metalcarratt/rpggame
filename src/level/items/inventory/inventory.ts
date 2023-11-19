import { Ref, ref } from "vue"
import { Action, clickAction, isCurrentAction } from "../../actions/actions"
import { ATTACK_HOVER_COLOUR } from "@/level/constants"
import { currentTurnUnit } from "../../units/units"
import { PlacedItem, placeItem } from "../items"
import { WALK_ACTION } from "../../actions/commonActions"
import { addFormation, getFormations, removeFormation, updateFormations } from "../../formations/formations"
import { xyd } from "@/level/map/xyd"
import { SpaceCheckerFunction } from "@/level/map/util/findAround"
import { FORMATION_PLATE, ItemCategory, LIGHTNING_FLAG } from "../itemTypes"

const selectedInventoryItem: Ref<null | string> = ref(null);

export type InventoryItem = {
    type: string,
    quantity: number
}

export class Inventory {
    private items: InventoryItem[] = [];

    constructor(inItems: InventoryItem[]) {
        this.items = inItems;
    }

    removeItem(type: string) {
        const foundItem = this.findItem(type);
        if (foundItem) {
            foundItem.quantity--;
            if (foundItem?.quantity <= 0) {
                this.items.splice(this.items.findIndex(_item => _item.type === type), 1);
            }
        }
    }

    findItem(type: string) {
        return this.items.find(_item => _item.type === type);
    }

    quantity(type: string) {
        return this.findItem(type)?.quantity ?? 0;
    }

    addItem(type: string) {
        const foundItem = this.findItem(type);
        if (foundItem) {
            foundItem.quantity++;
        } else {
            this.items.push({
                type,
                quantity: 1
            })
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }
}



const placeInventoryItem = (at: xyd) => {
    console.log(`perform action inventory`);

    // tidy up
    // currentTurnUnit().energy = 0;
    // if (selectedInventoryItem.value && selectedInventoryItem.value?.quantity > 1) {
    //     selectedInventoryItem.value.quantity--;
    // }
    if (selectedInventoryItem.value) {
        currentTurnUnit.value?.inventory?.removeItem(selectedInventoryItem.value);
        placeItem(selectedInventoryItem.value, at);

        if (selectedInventoryItem.value === LIGHTNING_FLAG) {
            updateFormations();
        }
    }
    //  else {
        
    // }

    if (!selectedInventoryItem.value || (currentTurnUnit.value?.inventory?.quantity(selectedInventoryItem.value) ?? 0) <= 0) {
        selectedInventoryItem.value = null;
        clickAction(WALK_ACTION);
    }
}

export const takeInventoryItem = (item: PlacedItem) => {
    currentTurnUnit.value?.inventory?.addItem(item.type.title);
    if (item.type.category === ItemCategory.FORMATION) {
        removeFormation(item.at);
    } else if (item.type.category === ItemCategory.FLAG) {
        updateFormations();
    }
}

// const PlaceItemModal: ModalDetails = {
//     inputs: [
//         {
//             title: 'Formation Name:',
//             name: 'name',
//             value: ''
//         }
//     ],
//     title: () => `Place ${selectedInventoryItem.value?.type.title}`,
//     onSubmit: (at, inputs) => {
//         const item = selectedInventoryItem.value as InventoryItem;
//         placeInventoryItem(at);
//         addFormation(inputs[0].value, at, item.type);
//     }
// }

export const INVENTORY_ACTION: Action = {
    label: 'Inventory',
    img: '',
    range: {
        range: 1,
        validator: SpaceCheckerFunction.EMPTY_SPACE,
        colour: ATTACK_HOVER_COLOUR
    },
    perform: (at) => {
        if (selectedInventoryItem.value === FORMATION_PLATE) {
            // startModal(PlaceItemModal, at);
            // return;
            addFormation(`Formation ${getFormations().length + 1}`, at, FORMATION_PLATE);
            placeInventoryItem(at);
        } else {
            placeInventoryItem(at);
        }
    },
    precondition: () => true,
}



export const isSelectedInventoryItem = (item: InventoryItem): boolean => 
    isCurrentAction(INVENTORY_ACTION)
    && item.type === selectedInventoryItem.value;

export const clickInventory = (item: InventoryItem) => {
    console.log(`click inventory item ${item.type}`);
    selectedInventoryItem.value = item.type;
    clickAction(INVENTORY_ACTION);
}