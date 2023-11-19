<template>
    <LevelCanvas />
    
    <GameHud>
        <TurnStack></TurnStack>
        <ActionButtons></ActionButtons>
    </GameHud>
    <ActionModal />
    <BattleModal />
    <!-- <button @click="shiftLeft">←</button>
    <button @click="shiftUp">↑</button>
    <button @click="shiftRight">→</button>
    <button @click="shiftDown">↓</button> -->
    <GameOver />
</template>

<script setup>
import GameHud from './components/GameHud.vue';
import TurnStack from './turn-stack/TurnStack.vue';
import ActionButtons from './actions/ActionButtons.vue';
import GameOver from './components/GameOver.vue';
import ActionModal from './actions/ActionModal.vue';
import LevelCanvas from './LevelCanvas.vue';
import BattleModal from './battle/BattleModal.vue';
import { onMounted } from 'vue';
import { initCanvas, shiftDown, shiftLeft, shiftRight, shiftUp } from './canvas';
import { initImages } from '@/imageLoader';
import { initUnits, startPlayerTurn } from './units/units';
import { placeItem } from "@/level/items/items";
import { initVisibility } from "@/level/visibility";
import { initGuides } from '@/level/guide/levelGuides';
import { SPIDER_BAIT } from '@/level/items/itemTypes';
// import { LIGHTNING_FLAG } from './items/inventory/inventory';

onMounted(() => {
    initImages();
    initUnits();
    initVisibility();
    // initCharacter();
    placeItem(SPIDER_BAIT, {x: 1, y: 1});
    placeItem(SPIDER_BAIT, {x: 5, y: 6});
    placeItem(SPIDER_BAIT, {x: 3, y: 1});
    // placeItem(LIGHTNING_FLAG, {x: 5, y: 1});
    // placeItem(LIGHTNING_FLAG, {x: 7, y: 1});
    // placeItem(LIGHTNING_FLAG, {x: 5, y: 3});
    // placeItem(LIGHTNING_FLAG, {x: 7, y: 3});
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