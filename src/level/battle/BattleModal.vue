<template>
    <BaseModal v-if="isInBattle()">
        <div class="battleModal">
            <h1>Battle</h1>
            <div class="scene">
                <div class="side left" v-if="hasAttacker()">
                    <img :src="attackerImg()" :style="leftStyle" />
                </div>
                <div class="side right" :style="rightFloorStyle">
                    <img :src="defenderImg()" :style="rightStyle" />
                    <span class="damage" v-if="damage">{{ damage }}</span>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import BaseModal from '@/modal/BaseModal.vue';
import { isInBattle, leftStyle, rightStyle, rightFloorStyle, damage, hasAttacker, attackerImg, defenderImg } from './battle';

</script>

<style scoped>
.scene {
    display: flex;
    flex-direction: row;
}

h1 {
    text-align: center;
    margin-top: -16px;
    margin-bottom: 6px;
}

.side {
    width: 250px;
    height: 250px;
    /* background-color: white; */
    background-image: url('../../../public/f1.jpg');
    background-size: 85px 85px;
    border: 1px solid white;
    position: relative;
}

.damage {
    top: 15px;
    left: 110px;
    font-size: 20px;
    font-weight: 700;
    color: #f4dede;
    text-shadow: 0px 0px 8px #ff4646;
    position: absolute;
}
</style>