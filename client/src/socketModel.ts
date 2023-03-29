import {
  ICard,
  IGameStatus,
  IServerRequestMessage,
  IServerResponseMessage,
  IUser,
} from './interfaces';
import { Dispatch } from 'react';
import {
  setCurrentUser,
  setGameStatus,
  setMessages,
  setStartedStatus,
  setUsers, setRooms,
} from './redux/actions';

export class SocketModel {
  private websocket: WebSocket = null;

  constructor(dispatch: Dispatch<any>) {
    const _websocket = new window.WebSocket('ws://localhost:3000/');

    _websocket.onopen = () => {
      this.websocket = _websocket;
    };

    _websocket.onmessage = (ev) => {
      const response: IServerResponseMessage = JSON.parse(ev.data);

      if (response.type === 'message') {
        dispatch(setMessages(response.content));
      }
      if (response.type === 'userList') {
        const users: Array<IUser> = JSON.parse(response.content);
        dispatch(setUsers(users));
      }
      if (response.type === 'updateRooms') {
        dispatch(setRooms(JSON.parse(response.content)));
      }
      if (response.type === 'auth') {
        const user: IUser = JSON.parse(response.content);
        dispatch(setCurrentUser(user));
        this.getUserList();
      }

      if (response.type === 'join') {
        dispatch(setStartedStatus(true));
      }

      if (response.type === 'game') {
        const gameStatus: IGameStatus = JSON.parse(response.content);
        dispatch(setGameStatus(gameStatus));
      }

      if (response.type === 'finish') {
        dispatch(setStartedStatus(false));
      }
    };

    _websocket.onerror = () => {
    };
    _websocket.onclose = () => {
    };
  }

  destroy() {
    if (this.websocket == null) return;
    this.websocket.onclose = null;
    this.websocket.close();
  }

  sendMessage(content: string) {
    this.sendRequest('message', content);
  }

  auth(user: IUser) {
    this.sendRequest('auth', JSON.stringify(user));
  }

  getUserList() {
    this.sendRequest('userList', '');
  }

  join() {
    this.sendRequest('join', '');
  }

  attack(card: ICard) {
    console.log('ATT');
    this.sendRequest('attack', JSON.stringify({ attackCard: card }));
  }

  defend(attackCard: ICard, defendCard: ICard) {
    const content = {
      attackCard: attackCard,
      defendCard: defendCard,
    };
    this.sendRequest('defend', JSON.stringify(content));
  }

  turn() {
    this.sendRequest('turn', '');
  }

  epicFail() {
    this.sendRequest('epicFail', '');
  }

  sendRequest(type: string, stringContenrt: string) {
    const request: IServerRequestMessage = {
      type: type,
      content: stringContenrt,
    };

    this.websocket.send(JSON.stringify(request));
  }

  createRoom(currentUser: string) {
    const request: IServerRequestMessage = {
      type: 'createRoom',
      content: currentUser,
    };

    this.websocket.send(JSON.stringify(request));
  }
}
