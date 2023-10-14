<template>
    <div id="bottomRight">
        <div id="actions" v-if="currentTurnUnit()">
            <ActionButton
                v-for="(action, i) in getCurrentActions()"
                :key="i"
                :action="action"
            />
        </div>
        <FormationsPanel />
        <InventoryPanel />
    </div>
</template>

<script setup>
import ActionButton from './ActionButton.vue';
import InventoryPanel from '@/level/items/inventory/InventoryPanel.vue';
import FormationsPanel from '../formations/FormationsPanel.vue';
import { currentTurnUnit } from '../units/units';
import { getCurrentActions } from './actions';
</script>

<style scoped>
#actions {
    display: flex;
    /* flex-direction: column; */
    justify-content: right;
    align-items: flex-end;
    column-gap: 10px;

    margin: 20px;
}

#bottomRight {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
}
</style>