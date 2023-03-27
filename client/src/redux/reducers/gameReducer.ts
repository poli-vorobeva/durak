import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICard, IGameStatus, IPlayer} from '../../interfaces';

export interface IGameState {
  isStarted: boolean;
  players: Array<IPlayer>;
  cardsCountInStack: number;
  trumpCard: ICard;
  playerCards: Array<ICard>;
  actionCards: Array<{attack: ICard; defend: ICard}>;
  currentPlayerIndex: number;
}
const gameInitialState: IGameState = {
  isStarted: false,
  trumpCard: {
    value: null,
    suit: null,
  },
  players: [],
  cardsCountInStack: null, //
  playerCards: [], //
  actionCards: [], //
  currentPlayerIndex: null, //
};
export const gameReducer = createSlice({
  name: 'gameData',
  initialState: gameInitialState,
  reducers: {
    setStartedStatus(state: IGameState, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },
    changeCount(state: IGameState, action: PayloadAction<number>) {
      state.cardsCountInStack = action.payload;
    },
    changeCurrentPlayerIndex(state: IGameState, action: PayloadAction<number>) {
      state.currentPlayerIndex = action.payload;
    },
    setActionCards(
      state: IGameState,
      action: PayloadAction<Array<{attack: ICard; defend: ICard}>>,
    ) {
      state.actionCards = action.payload;
    },
    setPlayerCards(state: IGameState, action: PayloadAction<Array<ICard>>) {
      state.playerCards = action.payload;
    },

    setGameStatus(state: IGameState, action: PayloadAction<IGameStatus>) {
      state.players = state.players !== action.payload.players && action.payload.players;
      state.cardsCountInStack = action.payload.cardsCountInStack;
      state.trumpCard = action.payload.trumpCard;
      state.playerCards = action.payload.playerCards;
      state.actionCards = action.payload.actionCards;
      state.currentPlayerIndex = action.payload.currentPlayerIndex;
    },
  },
});

export default gameReducer.reducer;
