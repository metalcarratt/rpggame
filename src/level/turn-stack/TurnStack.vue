<template>
    <ul id="turnStack">
        <template v-for="(unit, i) in units()" :key="i">
            <UnitProfile 
                v-if="visible[unit.data.at.y][unit.data.at.x]" 
                :unit="unit" 
                :selected="selected(unit)"
            />
        </template>
    </ul>
</template>

<script setup>
import { visible } from '../visibility';
import { getStackUnits } from './turnStack';
import { currentTurnUnit } from '../units/units';
import UnitProfile from '../units/UnitProfile.vue';

const units = () => getStackUnits();
const selected = (unit) => currentTurnUnit.value?.name === unit.name;
</script>

<style scoped>
ul#turnStack {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: flex-end;
    margin-right: 4px;
}

ul#turnStack li {
    background-color: #3f3d3d;
    /* background-color: #b1b1e9; */
    padding: 8px 8px;
    font-size: 20px;
    border-radius: 6px;
    border: 4px solid #97973e;
    /* border: 4px solid #696990; */
    margin-bottom: 5px;
    /* width: 60px; */
    display: flex;
    flex-direction: row;

    width: 220px;
    color: #e7e7c8;
}

ul#turnStack li.selected {
    /* background-color: #d7bf62; */
    border: 4px solid #ffff25;
    width: 240px;
}

ul#turnStack li img {
    width: 60px;
    height: 60px;
    margin-right: 6px;
}

/* ul#turnStack li.selected img {
    width: 60px;
    height: 60px;
} */
</style>