export interface IServerResponseMessage {
    type: string;
    content: string;
}

export interface IServerRequestMessage {
    type: string;
    content: string;
}
export interface IMessage {
    text: String;
}
export interface IUser {
    userName: string;
}
export interface IGameStatus {
    players:Array<IPlayer>
    cardsCountInStack:number,
    trupmCard: ICard,
    playerCards:Array<ICard>,
    actionCards:Array<{attack:ICard,defend:ICard}>
}
export interface IPlayer {
    user:IUser,
    cardsCount:number
}
export interface ICard {
    value:number,
    suit:number
}
export interface ICard {
    value:number,
    suit:number
}
