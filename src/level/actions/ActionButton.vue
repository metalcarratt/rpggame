<template>
    <span :class="classes()" @click="() => clickAction(props.action)">
        <img :src="props.action.img"/>
        <ToolTip target="action" :name="props.action.label"/>
    </span>
</template>

<script setup>
import ToolTip from '../guide/ToolTip.vue';
import { defineProps } from 'vue';
import { isCurrentAction, Action, clickAction } from './actions';

const props = defineProps({
    action: {
        type: Action,
        required: true
    }
});

const classes = () => ['action', isCurrentAction(props.action) ? 'selected' : '', props.action.corners];
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

    border: solid 5px white;
    position: relative;
}

.action.square {
    border-radius: 10px;
}

.action.selected {
    border: solid 5px yellow;
}

.action:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px white;
}

.action img {
    width: 120px;
    height: 120px;
}
</style>