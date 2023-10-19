<template>
    <ul id="turnStack">
        <template v-for="(unit, i) in units()" :key="i">
            <UnitProfile 
                v-if="selected(unit)" 
                :unit="unit" 
                :selected="true" 
            />
            <!-- <li class="selected" v-if="selected(unit)">
                <img class="profile" v-if="unit.profileImg" :src="unit.profileImg" />
                {{ unit.name }}
            </li> -->
            <UnitProfile 
                v-else-if="visible[unit.at.y][unit.at.x]" 
                :unit="unit" 
                :selected="false"
            />
            <!-- <li v-if="visible[unit.at.y][unit.at.x]">
                <img class="profile" v-if="unit.profileImg" :src="unit.profileImg" />
                {{  unit.name }}
            </li> -->
        </template>
    </ul>
</template>

<script setup>
import { visible } from '../visibility';
import { getStack } from './turnStack';
import { currentTurnUnit } from './units';
import UnitProfile from './UnitProfile.vue';
const units = () => {
    // console.log(turnStack.value);
    return getStack();
}

const selected = (unit) => currentTurnUnit().name === unit.name;
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

    width: 200px;
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