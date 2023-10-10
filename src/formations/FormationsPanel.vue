<template>
    <div id="formations" v-if="hasActiveFormations()">
        <span class="item" v-for="(formation, index) in getActiveFormations()" :key="index">
            {{ formation.title }}
            <span :class="['image', formation.status]">
                <img :src="formation.type.img.img.src" />
                <span :class="['corner', 'TL', formation.corners.TL?.dist > 0 ? 'active' : '']">{{ formation.corners.TL?.dist }}</span>
                <span :class="['corner', 'TR', formation.corners.TR?.dist > 0 ? 'active' : '']">{{ formation.corners.TR?.dist }}</span>
                <span :class="['corner', 'BL', formation.corners.BL?.dist > 0 ? 'active' : '']">{{ formation.corners.BL?.dist }}</span>
                <span :class="['corner', 'BR', formation.corners.BR?.dist > 0 ? 'active' : '']">{{ formation.corners.BR?.dist }}</span>
            </span>
            
            <button v-if="formation.status === FormationStatus.IDLE" @click="activateFormation(formation.at)">Activate</button>
            <button v-else-if="formation.status === FormationStatus.ALIVE" @click="deactivateFormation(formation.at)">Deactivate</button>
            <span v-else>Broken</span>
        </span>
        <h2>Formations</h2>
    </div>
    
</template>

<script setup>
import { hasActiveFormations, getActiveFormations, FormationStatus, activateFormation, deactivateFormation } from './formations';
</script>

<style scoped>
#formations {
    display: flex;
    flex-direction: row-reverse;
    background-color: #3f3d3d;
    padding: 4px;
    margin-right: 20px;
    border-radius: 6px;
    margin-top: 50px;
    border: 4px solid #97973e;

    pointer-events: auto;
    gap: 8px;
    position: relative;
    min-width: 125px;
    justify-content: center;
}

#formations h2 {
    position: absolute;
    top: -44px;
    font-size: 18px;
    background-color: #343333;
    color: #e7e7c8;
    padding: 0px 16px 4px 16px;
    border-radius: 6px;
    border: 2px solid #77772f;
    z-index: -10;
}

#formations .item {
    position: relative;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    border: 1px solid #343333;
    align-items: center;

    color: #e7e7c8;
}

#formations img {
    width: 60px;
    height: 60px;
    box-shadow: 0 0 20px #496107;
}

#formations .item .image {
    position: relative;
    padding: 4px;
    width: 60px;
    height: 60px;
}

#formations .item .image.Idle img {
    box-shadow: 0 0 20px #f9ffe7;
}

#formations .item .image.Alive img {
    box-shadow: 0 0 40px #bf0;
}

#formations .item .image .corner {
    position: absolute;
    background-color: #655c5c;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    text-align: center;
    display: inline-block;
    color: #e10505;
    font-weight: 700;
}

#formations .item .image .corner.active {
    background-color: white;
}

.TL {
    top: 0;
    left: 0;
}

.TR {
    top: 0;
    right: 0;
}

.BL {
    bottom: 0;
    left: 0;
}

.BR {
    bottom: 0;
    right: 0;
}

#formations button {
    font-size: 16px;
    padding: 2px 8px;
    margin-top: 10px;
    background-color: #b2a89c;
}
</style>