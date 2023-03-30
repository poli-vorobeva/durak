import Signal from './Singal';
import { Card } from './cardGame';

interface IRoom {
  name: number
  players: string[]
}

export class Rooms {
  public onRoomsStatus: Signal<void> = new Signal();
  private _rooms: IRoom[] = [];

  addRoom(player) {
    this._rooms.push({ name: new Date().getTime(), players: [player] });
    console.log(this._rooms, 'Rooms');
  }

  get rooms() {
    return this._rooms;
  }

  deleteUserFromRoom(user: string) {
    this._rooms = this._rooms.map((room: IRoom, indx) => {
      if (room.players.includes(user)) {
        const plrs = room.players.filter(player => player !== user);
        if (plrs.length) {
          return { name: room.name, players: plrs };
        } else {
          return null;
        }
      }
      return room;
    }).filter(room => room);
  }

  joinToRoom(param: { room: string; player: string }) {
    const room = this._rooms.find(room=> room.name===+param.room)
    room.players.push(param.player)
  }

  isUserInRoom(userName: string ) {
    return this._rooms.some(room=>room.players.includes(userName))
  }
}