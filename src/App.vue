<template>
    <canvas
        id="myCanvas"
        :class="canvasClass()"
        @click="clickCanvas"
        @keyup.down="shiftDown"
        @keyup.up="shiftUp"
        @keyup.left="shiftLeft"
        @keyup.right="shiftRight"
    ></canvas>
    <GameHud>
        <TurnStack></TurnStack>
        <ActionButtons></ActionButtons>
    </GameHud>
    <!-- <button @click="shiftLeft">←</button>
    <button @click="shiftUp">↑</button>
    <button @click="shiftRight">→</button>
    <button @click="shiftDown">↓</button> -->
    <GameOver />
</template>

<script setup>
import GameHud from './components/GameHud.vue';
import TurnStack from './components/TurnStack.vue';
import ActionButtons from './components/ActionButtons.vue';
import GameOver from './components/GameOver.vue';
import { onMounted } from 'vue';
import { initCanvas, shiftDown, shiftLeft, shiftRight, shiftUp } from './canvas';
import { initImages } from './imageLoader';
import { initUnits, startPlayerTurn } from './units/units';
import { clickCanvas, mouseHover } from './mouseHandler';

const canvasClass = () => mouseHover.value === true ? 'mouseHover' : '';

onMounted(() => {
    initImages();
    initUnits();
    // initCharacter();
    startPlayerTurn();
    initCanvas();
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
html, body, #app {
    margin: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

#myCanvas {
    margin: 20px;
    width: 1000px;
    height: 1000px;
    box-sizing: border-box;
}

#myCanvas.mouseHover {
    cursor: pointer;
}

button {
    font-size: 40px;
}
</style>