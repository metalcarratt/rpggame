<template>
    <div class="matte" v-if="isGameOver()">
        <div class="dialog">
            <label>Game Over</label>
        </div>
    </div>
</template>

<script setup>
import { isGameOver } from '@/level/gameStatus';
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
</style>
