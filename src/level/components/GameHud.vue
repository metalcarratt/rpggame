<template>
    <div id="hud">
        <slot></slot>
    </div>
</template>

<style scoped>
#hud {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 10;
    pointer-events: none;

    /* for now */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>