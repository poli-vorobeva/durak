import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from '../../src/interfaces';
import {IMessage} from '../../components/LobbyComponent';

export interface ISocketState {
	currentUser: IUser,
	users:IUser[],
	messages:IMessage[]
}

const socketInitialState: ISocketState = {
	currentUser: null,
	users:[],
	messages:[]
}
export const socketReducer = createSlice({
	name: "socketData",
	initialState: socketInitialState,
	reducers: {
		setCurrentUser(state: ISocketState, action: PayloadAction<IUser>) {
			state.currentUser = action.payload
		},
		setUsers(state: ISocketState, action: PayloadAction<IUser[]>){
			state.users=action.payload
		},
		setMessages(state: ISocketState, action: PayloadAction<string>){
			state.messages=[...state.messages,{text:action.payload}]
		},
	}
})
export default socketReducer.reducer