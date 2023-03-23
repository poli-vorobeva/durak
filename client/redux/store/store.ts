import {configureStore} from "@reduxjs/toolkit";
import socketData, {ISocketState} from '../reducers/socketReducer';
import gameData, {IGameState} from '../reducers/gameReducer';

export interface ISocketData{
	socketData:ISocketState
}
export interface IGameData {
	gameData:IGameState
}
const store = configureStore({
	reducer: {socketData,gameData}
})
export default store