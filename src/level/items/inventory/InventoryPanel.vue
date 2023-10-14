<template>
    <div id="inventory" :class="inventoryClasses()" v-if="hasInventory()">
        <span :class="itemClasses(item)" v-for="(item, index) in inventory()" :key="index" @click="clickInventory(item)">
            <img :src="item.type.img.img.src" />
            <span class="quantity">{{  item.quantity }}</span>
            <label>{{ item.type.title }}</label>
        </span>
        <h2>Inventory</h2>
    </div>
    
</template>

<script setup>
import { currentTurnUnit } from "@/level/units/units";
import { clickInventory, isSelectedInventoryItem, INVENTORY_ACTION } from "@/level/items/inventory/inventory";
import { isCurrentAction } from "@/level/actions/actions";

const inventory = () => currentTurnUnit()?.inventory.items;

const hasInventory = () => currentTurnUnit()?.inventory && !currentTurnUnit()?.inventory.isEmpty();

const inventoryClasses = () => isCurrentAction(INVENTORY_ACTION) ? 'selected' : '';

const itemClasses = (item) => ['item', isSelectedInventoryItem(item) ? 'selected' : ''];

</script>

<style scoped>
/* Container */
#inventory {
    display: flex;
    flex-direction: row-reverse;
    background-color: #3f3d3d;
    padding: 4px;
    margin-right: 20px;
    border-radius: 6px;
    border: 4px solid #97973e;

    pointer-events: auto;
    gap: 8px;
    position: relative;
    min-width: 110px;
    justify-content: center;
}

#inventory.selected {
    border: 4px solid #d4d401;
}

#inventory h2 {
    position: absolute;
    top: -44px;
    font-size: 18px;
    background-color: #343333;
    color: #e7e7c8;
    padding: 0px 16px 4px 16px;
    border-radius: 6px;
    border: 2px solid #77772f;
    z-index: -10;
}

#inventory.selected h2 {
    border: 2px solid #d4d401;
}


/* Item */
#inventory .item {
    position: relative;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    border: 1px solid #343333;
}

#inventory .item.selected {
    border: 1px solid #d4d401;
}

#inventory .item:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px #97973e;
}

#inventory .item img {
    width: 60px;
    height: 60px;
}

#inventory .item label {
    font-size: 10px;
    color: #e7e7c8;
    width: 60px;
    text-align: center;
}
#inventory .item .quantity {
    color: white;
    position: absolute;
    z-index: 10;
    top: 4px;
    right: 4px;

    background-color: #08080873;
    padding: 2px 4px;
    border-radius: 4px;
}
</style>