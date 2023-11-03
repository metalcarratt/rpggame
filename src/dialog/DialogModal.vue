<template>
    <ModalMatte v-if="hasDialog()" @click="next">
        <div class="dialog">
            <span class="image">
                <img :src="getDialog().profileImg" />
            </span>
            <span class="text">
                <span class="name">{{ getDialog().name }}</span>
                <span class="speech">{{ getDialog().speech }}</span>
            </span>
        </div>
    </ModalMatte>
</template>

<script setup>
import { hasDialog, getDialog, dialogNext } from './dialog';
import ModalMatte from '../modal/ModalMatte.vue'

const next = () => {
    dialogNext();
}
</script>

<style>
.matte {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #aaaa;
    z-index: 20;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}

.dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    user-select: none;
}

.text {
    background-color: #3f3d3d;
    padding: 12px 18px;
    border-radius: 6px;
    border: 4px solid #97973e;
    color: #e7e7c8;
    width: 500px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
}

.name {
    font-weight: 700;
    margin-bottom: 8px;
    color: #e7e7de;
}

.image {
    margin-bottom: -5px;
}

img {
    height: 500px;
}
</style>