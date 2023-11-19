<template>
    <div class="progress">
        <span class="save" @click="addSave">
            <label>Save Progress</label>
            <img class="icon" src="save.png" />
        </span>
        <span class="rewind" v-if="hasSaves()" @click="showSaves">
            <img class="icon" src="rewind.png" />
        </span>
    </div>
    <ListOfSaves v-if="showingSaves" />
</template>

<script setup>
import ListOfSaves from './ListOfSaves.vue';
import { addSave, hasSaves } from './saveProgress';
import { ref } from 'vue';

const showingSaves = ref(false);

const showSaves = () => showingSaves.value = !showingSaves.value;

</script>

<style scoped>
.progress {
    margin-bottom: 40px;
    margin-right: 16px;
    pointer-events: auto;

    display: flex;
    flex-direction: row;
    align-items: center;
}
.progress .icon {
    width: 50px;
    height: 50px;
}

.progress .save {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.progress span:hover {
    cursor: pointer;
}

.progress span:hover img {
    box-shadow: 0px 0px 20px #8892cb;
    border-radius: 16px;
}

.progress label {
    /* color: #c0c2ce; */
    color: #1a1a1c;
    display: inline-block;
    width: 60px;
    text-align: right;
    user-select: none;
    margin-right: 10px;
}

.progress label:hover {
    cursor: pointer;
}

.progress span:hover label {
    color: #c0c2ce;
}

.rewind .icon {
    width: 36px;
    height: 36px;
}

.rewind {
    padding: 4px;
    cursor: pointer;
}
</style>