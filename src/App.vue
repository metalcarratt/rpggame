<template>
    <LevelContainer></LevelContainer>
    <DialogModal />
</template>

<script setup>
import LevelContainer from './level/LevelContainer.vue';
import DialogModal from './dialog/DialogModal.vue';
</script>

<style>
html, body, #app {
    margin: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

#app {
    background-color: #1a1919;
    display: flex;
    justify-content: center;
}
</style>