import { Ref, ref } from "vue";

enum GameStatus {
    IN_PROGRESS,
    GAME_OVER
}

const status: Ref<GameStatus> = ref(GameStatus.IN_PROGRESS);

const gameOverMessage = ref('');
const gameOverImage = ref('');

export const GAME_OVER_DEFEAT = 'defeat';

export const gameOverMsg = () => gameOverMessage.value;
export const gameOverImg = () => gameOverImage.value;

export const gameOver = (message: string, type: string) => {
    gameOverMessage.value = message;
    status.value = GameStatus.GAME_OVER;
    if (type === GAME_OVER_DEFEAT) {
        gameOverImage.value = 'defeated.jpg';
    } else {
        gameOverImage.value = 'win.jpg';
    }
}

export const isGameOver = () => status.value === GameStatus.GAME_OVER;

