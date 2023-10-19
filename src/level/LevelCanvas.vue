<template>
    <div id="levelCanvas">
        <canvas
            id="myCanvas"
            :class="canvasClass()"
            @click="clickCanvas"
            @keyup.down="shiftDown"
            @keyup.up="shiftUp"
            @keyup.left="shiftLeft"
            @keyup.right="shiftRight"
        ></canvas>
        <ToolTip target="canvas" name="canvas" />
    </div>
</template>

<script setup>
import { shiftDown, shiftLeft, shiftRight, shiftUp } from './canvas';
import { clickCanvas, mouseHover } from './mouseHandler';
import ToolTip from './guide/ToolTip.vue';

const canvasClass = () => mouseHover.value === true ? 'mouseHover' : '';
</script>

<style scoped>
#levelCanvas {
    position: relative;
}

#myCanvas, #levelCanvas {
    margin: 20px;
    width: 1000px;
    height: 1000px;
    box-sizing: border-box;
}

#myCanvas.mouseHover {
    cursor: pointer;
}
</style>