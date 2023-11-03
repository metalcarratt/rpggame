<template>
    <div class="matte">
        
        <slot></slot>

    </div>
</template>

<style>
.matte {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #aaaa;
    z-index: 20;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>