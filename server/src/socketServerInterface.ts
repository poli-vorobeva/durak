import websocket from 'websocket'
import {Card} from "./cardGame";

export interface IServerResponseMessage {
    type: string;
    content: string;
}
export interface IServerRequestMessage {
    type: string;
    content: string;
}
export interface IUser {
    userName: string;
}
export interface IAuthorisedUser {
connection:websocket.connection;
userData:IUser
}
export interface IGameStatus {
    players:Array<IPlayer>
    cardsCountInStack:number,
    trupmCard: ICard,
    playerCards:Array<ICard>,
    actionCards:Array<{attack:ICard,defend:ICard}>
}
export interface IPlayer {
    user:string,
    cardsCount:number
}
export interface ICard {
    value:number,
    suit:number
}
