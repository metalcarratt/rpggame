<template>
    <div class="guide" v-if="show()" :style="getStyle()">
        <img src="player_profile.png" />
        <span>{{ getTooltip().text }}</span>
        <span :class="['arrow', getTooltip().direction]" />
    </div>
</template>

<script setup>
import { hasTooltip, getTooltip } from './guide';
import { hasDialog } from '@/dialog/dialog';
import { defineProps } from 'vue';
import { TargetType } from '@/level/constants';

const props = defineProps({
    target: TargetType,
    name: String
});

const show = () => 
    hasTooltip() 
    && !hasDialog() 
    && getTooltip().target === props.target 
    && getTooltip().targetName === props.name;


const getStyle = () => `top: ${getTooltip().location.top}px; left: ${getTooltip().location.left}px; width: ${getTooltip().width ?? 200}px`;
</script>

<style scoped>
.guide {
    background-color: #e7e7c8;
    height: 40px;
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;

    position: absolute;
    /* top: 290px;
    left: 240px; */
    z-index: 10;
    box-shadow: 1px 1px 5px black;
}

.guide img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.guide span {
    font-size: 18px;
    color: #308c16;
}

.guide .arrow {
    width: 20px;
    height: 20px;
    background-color: #e7e7c8;
    position: absolute;
    transform: rotate(45deg);

    z-index: 1;
}

.arrow.left {
    left: -10px;
}

.arrow.bottom {
    bottom: -10px;
    left: 40px;
}
</style>