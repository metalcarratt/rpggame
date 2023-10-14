import { Ref, ref } from "vue";

enum GameStatus {
    IN_PROGRESS,
    GAME_OVER
}

const status: Ref<GameStatus> = ref(GameStatus.IN_PROGRESS);

export const gameOver = () => status.value = GameStatus.GAME_OVER;

export const isGameOver = () => status.value === GameStatus.GAME_OVER;

