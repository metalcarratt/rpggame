<template>
    <ModalMatte>
        <div class="action modal">
            <span class="top-corner" />
            
            <slot></slot>

            <span class="bottom-corner" />
        </div>
    </ModalMatte>
</template>

<script setup>
import ModalMatte from './ModalMatte.vue';
</script>

<style>
.modal {
    background-color: #3f3d3d;
    padding: 24px;
    border-radius: 6px;
    border: 4px solid #97973e;
    color: #e7e7c8;
    position: relative;
}

.modal .top-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #97973e;
    top: 0;
    left: 0;
}

.modal .bottom-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #97973e;
    bottom: 0;
    right: 0;
}

.modal h1 {
    margin: 0;
}

.modal fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
}

.modal label {
    font-size: 18px;
    margin-bottom: 8px;
}

.modal input[type="text"] {
    font-size: 18px;
    padding: 8px;
    color: #57524b;
}

.modal button {
    width: 100%;
    font-size: 20px;
    padding: 8px;
    background-color: #b2a89c;
}

.modal button + button {
    margin-top: 6px;
}
</style>