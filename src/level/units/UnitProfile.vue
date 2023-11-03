<template>
    <li :class="classes()">
        <span class="top-corner" />

        <img class="profile" v-if="props.unit.profileImg" :src="props.unit.profileImg" />
        <span class="details">
            <span class="name">{{ props.unit.name }}</span>
            <span class="stats">
                <span class="armour">{{  props.unit.armour }}</span>
                <img src="icon_armour.png" class="icon" />

                <span class="hp">{{ props.unit.hp }}</span>
                <img src="icon_heart.png" class="icon" />

                <span class="qi">{{ props.unit.qi }}</span>
                <img src="icon_qi.png" class="icon" />
            </span>
        </span>

        <span class="bottom-corner" />
    </li>
</template>

<script setup >
import { defineProps } from 'vue';
import { Unit } from '@/level/units/units';

const props = defineProps({
    unit: Unit,
    selected: Boolean
});

const classes = () => props.selected === true ? 'selected' : '';
</script>

<style scoped>
li {
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
    position: relative;
}

li .top-corner {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #97973e;
    top: 0;
    left: 0;
}

li .bottom-corner {
    position: absolute;
    width: 6px;
    height: 7px;
    background-color: #97973e;
    bottom: 0;
    right: 0;
}

li.selected {
    /* background-color: #d7bf62; */
    border: 4px solid #ffff25;
    margin-right: 20px;
}

li.selected .top-corner {
    background-color: #ffff25;
}

li.selected .bottom-corner {
    background-color: #ffff25;
}

li img {
    width: 60px;
    height: 60px;
    margin-right: 6px;
}

.details {
    display: flex;
    flex-direction: column;
}

.stats {
    color: #b3b397;
    display: flex;
    align-items: center;
}

.stats .icon {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}

.stats .hp {
    color: #e16dbe;
    font-weight: 700;
}

.stats .armour {
    color: #becfe5;
    font-weight: 700;
}

.stats .qi {
    color: #ffd11f;
    font-weight: 700;
}
</style>