<template>
    <div id="actions" v-if="currentTurnUnit()">
        <ActionButton
            v-for="(action, i) in getCurrentActions()"
            :key="i"
            :action="action"
        />
    </div>
</template>

<script setup>
import ActionButton from './ActionButton.vue';
import { currentTurnUnit } from '../units';
import { getCurrentActions } from '../actions';
</script>

<style scoped>
#actions {
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: flex-end;

    margin: 20px;
}
</style>