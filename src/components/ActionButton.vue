<template>
    <span class="action" @click="() => clickAction(props.action)">
        <img :src="props.action.img"/>
        <label>{{ props.action.label }}</label>
    </span>
</template>

<script setup>
import { defineProps } from 'vue';
import { Action, clickAction } from '../actions';

const props = defineProps({
    action: {
        type: Action,
        required: true
    }
});
</script>

<style scoped>
.action {
    font-size: 16px;
    width: 120px;
    height: 120px;
    border: 1px solid black;
    border-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #fcf5bf;
    pointer-events: auto;
}

.action:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px blue;
}

.action img {
    width: 80px;
    height: 80px;
}

.action label {
    width: 80x;
    display: block;
}
</style>