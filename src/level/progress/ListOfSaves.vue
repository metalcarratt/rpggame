<template>
    <div class="saves">
        <ul>
            <li
                v-for="(save, index) of getSaves()"
                :key="index"
                @click="restoreSave(save)"
            >
                {{ save }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { getSaves, restoreSave } from './saveProgress';

</script>

<style scoped>
/* saves */
.saves {
    pointer-events: auto;
}

.saves li {
    color: #8892cb;
    list-style: none;
    margin-right: 25px;
    padding: 4px;
    width: 140px;
    text-align: right;
}

.saves li:hover {
    cursor: pointer;
    background-color: #404259;
}
</style>