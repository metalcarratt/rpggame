<template>
    <LevelCanvas />
    
    <GameHud>
        <TurnStack></TurnStack>
        <ActionButtons></ActionButtons>
    </GameHud>
    <ActionModal />
    <!-- <button @click="shiftLeft">←</button>
    <button @click="shiftUp">↑</button>
    <button @click="shiftRight">→</button>
    <button @click="shiftDown">↓</button> -->
    <GameOver />
</template>

<script setup>
import GameHud from './components/GameHud.vue';
import TurnStack from './units/TurnStack.vue';
import ActionButtons from './actions/ActionButtons.vue';
import GameOver from './components/GameOver.vue';
import ActionModal from './actions/ActionModal.vue';
import LevelCanvas from './LevelCanvas.vue';
import { onMounted } from 'vue';
import { initCanvas, shiftDown, shiftLeft, shiftRight, shiftUp } from './canvas';
import { initImages } from '@/imageLoader';
import { initUnits, startPlayerTurn } from './units/units';
import { placeItem } from "@/level/items/items";
import { SPIDER_BAIT } from "@/level/items/randomItems";
import { initVisibility } from "@/level/visibility";
import { initGuides } from '@/level/guide/levelGuides';

onMounted(() => {
    initImages();
    initUnits();
    initVisibility();
    // initCharacter();
    placeItem(SPIDER_BAIT, {x: 1, y: 1});
    placeItem(SPIDER_BAIT, {x: 3, y: 1});
    startPlayerTurn();
    initCanvas();
    initGuides();
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
        shiftUp();
        return;
    case 'ArrowDown':
        shiftDown();
        return;
    case 'ArrowLeft':
        shiftLeft();
        return;
    case 'ArrowRight':
        shiftRight();
        return;
  }
}, false);

</script>

<style>
button {
    font-size: 40px;
}
</style>