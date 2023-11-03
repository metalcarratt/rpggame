<template>
    <BaseModal v-if="isModalActive()">
        <h1>{{ getTitle() }}</h1>
        <fieldset v-for="(input, index) of getInputs()" :key="index">
            <label>{{ input.title }}</label>
            <input type="text" v-model="input.value" :placeholder="input.name" />
        </fieldset>
        <button @click="submitModal">Confirm</button>
        <button @click="cancelModal">Cancel</button>
    </BaseModal>
</template>

<script setup>
import BaseModal from '@/modal/BaseModal.vue';
import { 
    getInputs, 
    submitModal, 
    cancelModal, 
    getTitle,
    isModalActive
} from '@/modal/modal';
</script>

