import {gameReducer} from './reducers/gameReducer';
import {socketReducer} from './reducers/socketReducer';

export const {
  setStartedStatus,
  setGameStatus,
  changeCount,
  changeCurrentPlayerIndex,
  setActionCards,
  setPlayerCards,
} = gameReducer.actions;
export const {setCurrentUser, setUsers, setMessages,setRooms} = socketReducer.actions;
