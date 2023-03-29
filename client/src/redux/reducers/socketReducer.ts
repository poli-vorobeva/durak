import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../components/LobbyComponent';
import { IUser } from '../../interfaces';

interface IRoom {
  name: string,
  players: string[]
}

export interface ISocketState {
  currentUser: IUser;
  users: IUser[];
  messages: IMessage[];
  rooms: IRoom[]
}

const socketInitialState: ISocketState = {
  currentUser: null,
  users: [],
  messages: [],
  rooms: [],
};
export const socketReducer = createSlice({
  name: 'socketData',
  initialState: socketInitialState,
  reducers: {
    setRooms(state: ISocketState, action: PayloadAction<IRoom[]>) {
      state.rooms = action.payload;
    },
    setCurrentUser(state: ISocketState, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;
    },
    setUsers(state: ISocketState, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    setMessages(state: ISocketState, action: PayloadAction<string>) {
      state.messages = [...state.messages, { text: action.payload }];
    },
  },
});
export default socketReducer.reducer;
