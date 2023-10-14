<template>
    <BaseModal>
        <h1>RPG Game</h1>
    </BaseModal>
</template>

<script setup>
import BaseModal from '@/modal/BaseModal.vue';
import { 
    getInputs, 
    submitModal, 
    cancelModal, 
    getTitle 
} from '@/modal/modal';
</script>