<template>
    <div class="matte" v-if="isGameOver() && !isInBattle()">
        <div class="dialog gameOver">
            <h1>Game Over</h1>
            <span class="message">{{ gameOverMsg() }}</span>
            <img :src="gameOverImg()" />
        </div>
        <ListOfSaves />
    </div>
</template>

<script setup>
import ListOfSaves from '../progress/ListOfSaves.vue';
import { isGameOver, gameOverMsg, gameOverImg } from '@/level/gameStatus';
import { isInBattle } from '@/level/battle/battle';
</script>

<style scoped>
.matte {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000b;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {
    padding: 20px;
    background-color: white;
}

.gameOver h1 {
    margin-top: 0;
    font-size: 24px;
}

.message {
  margin-bottom: 20px;
  font-size: 18px;
  font-style: italic;
  color: #d85f5f;
}
</style>
