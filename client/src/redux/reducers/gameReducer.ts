import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICard, IGameStatus} from '../../interfaces';

export interface IGameState {
  isStarted: boolean;
  gameStatus: IGameStatus;
  count: number;
  trumpCard: ICard;
}
const gameInitialState: IGameState = {
  isStarted: false,
  gameStatus: null,
  count: null,
  trumpCard: {
    value: null,
    suit: null,
  },
};
export const gameReducer = createSlice({
  name: 'gameData',
  initialState: gameInitialState,
  reducers: {
    setStartedStatus(state: IGameState, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },
    setGameStatus(state: IGameState, action: PayloadAction<IGameStatus>) {
      state.gameStatus = action.payload;
      state.count = action.payload.cardsCountInStack;
      state.trumpCard = action.payload.trumpCard;
    },
  },
});

export default gameReducer.reducer;
