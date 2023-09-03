<template>
    <ul id="turnStack">
        <li v-for="(unit, i) in units()" :key="i">{{ unit.name }}</li>
    </ul>
</template>

<script setup>
import { turnStack } from '../units';
const units = () => {
    // console.log(turnStack.value);
    return turnStack.value;
}
</script>

<style scoped>
ul#turnStack {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: flex-end;
}

ul#turnStack li {
    background-color: #b1b1e9;
    padding: 8px 20px;
    font-size: 20px;
    border: 4px solid #696990;
    margin-bottom: 5px;
    width: 60px;
}

ul#turnStack li:first-child {
    background-color: #d7bf62;
    border: 4px solid #ffff25;
    width: 80px;
}
</style>