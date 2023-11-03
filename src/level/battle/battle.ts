import { ref } from "vue";
import { guideTick } from "../guide/guide";

const inBattle = ref(false);

export const isInBattle = () => inBattle.value;

export type UnitBattleDetails = {
    center: number,
    rebound: number,
    top: number,
    height: number,
    image: string
}

export const startBattle = (damage: number, attacker: UnitBattleDetails | null, defender: UnitBattleDetails) => {
    battleDetails.damage = damage;
    battleDetails.attacker = attacker;
    battleDetails.defender = defender;
    inBattle.value = true;
    startAnimation();
}

export const hasAttacker = () => battleDetails.attacker;

export const endBattle = () => {
    inBattle.value = false;
    battleDetails.damage = 0;
    guideTick();
}

const battleDetails : {
    damage: number,
    attacker: UnitBattleDetails | null,
    defender: UnitBattleDetails | null
} = {
    damage: 0,
    attacker: null,
    defender: null
} 

export const defenderImg = () => battleDetails.defender?.image;

export const attackerImg = () => battleDetails.attacker?.image;

// animation

const animationRate = 200;
// const animationRate = 1500;

export const leftStyle = ref('');
export const rightStyle = ref('');
export const rightFloorStyle = ref('');
export const damage = ref('');

const attacker = {
    top: 0,
    height: 0,
    center: 0
}

const defender: {
    top: number,
    height: number,
    center: number,
    filter: null | string
} = {
    top: 0,
    height: 0,
    center: 0,
    filter: null
}


const drawLeftSide = () => leftStyle.value = `margin-left: ${attacker.center ?? 0}px; margin-top: ${attacker.top ?? 0}px; height: ${attacker.height}px`;
const drawRightSide = () => 
    rightStyle.value = `margin-left: ${defender.center ?? 0}px; margin-top: ${defender.top ?? 0}px; height: ${defender.height}px;`
     + (defender.filter ? `filter: ${defender.filter}` : '');


const startAnimation = () => {
    console.log('start animation');
    if (battleDetails.attacker) {
        attacker.top = battleDetails.attacker.top;
        attacker.height = battleDetails.attacker.height;
        attacker.center = battleDetails.attacker.center;
    }
    if (battleDetails.defender) {
        defender.top = battleDetails.defender.top;
        defender.height = battleDetails.defender.height;
        defender.center = battleDetails.defender.center;
        defender.filter = null;
    }
    drawLeftSide();
    drawRightSide();
    if (hasAttacker()) {
        setTimeout(attackerStartCharge, animationRate * 2);
    } else {
        // TODO how to check attack is from lightning?
        setTimeout(lightningAttack, animationRate * 2);
    }
}

const attackerStartCharge = () => {
    console.log('attacker start charge');
    attacker.center = 0;
    drawLeftSide();
    setTimeout(attackerCompleteCharge, animationRate);
}

const attackerCompleteCharge = () => {
    console.log('attacker complete charge');
    attacker.center = battleDetails.attacker?.center ?? 0;
    drawLeftSide();
    setTimeout(defenderReceiveAttack, animationRate);
}

const lightningAttack = () => {
    console.log('lightning attack');
    rightFloorStyle.value = `
        background-color: #f2c6c6;
        background-blend-mode: screen;
    `;
    defender.filter = `hue-rotate(30deg) saturate(500%) brightness(300%);`;
    drawRightSide();
    setTimeout(defenderReceiveAttack, animationRate);
}

const defenderReceiveAttack = () => {
    console.log('defender receive attack animation');
    rightFloorStyle.value = '';
    defender.filter = `hue-rotate(0deg) saturate(500%) brightness(150%)`
    if (hasAttacker()) {
        defender.center = battleDetails.defender?.rebound ?? 0;
    }
    drawRightSide();
    damage.value = `-${battleDetails.damage}`;
    setTimeout(defenderReturnToNormal, animationRate * 2); 
}

const defenderReturnToNormal = () => {
    console.log('defender return to normal');
    defender.filter = null;
    defender.center = battleDetails.defender?.center ?? 0;
    drawRightSide();
    setTimeout(endAnimation, animationRate * 4);
}

const endAnimation = () => {
    console.log('end animation');
    damage.value = '';
    leftStyle.value = '';
    rightStyle.value = '';
    endBattle();
}

