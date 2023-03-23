import {gameReducer} from './reducers/gameReducer';
import {socketReducer} from './reducers/socketReducer';

export const { setStartedStatus,setGameStatus} = gameReducer.actions
export const {setCurrentUser,setUsers,setMessages}=socketReducer.actions