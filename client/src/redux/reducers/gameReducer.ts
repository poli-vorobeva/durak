import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGameStatus} from '../../interfaces';

export interface IGameState {
  isStarted: boolean;
  gameStatus: IGameStatus;
}
const gameInitialState: IGameState = {
  isStarted: false,
  gameStatus: null,
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
    },
  },
});

export default gameReducer.reducer;
