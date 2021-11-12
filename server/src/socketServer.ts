import {connection, IUtf8Message, request, server} from "websocket";
import {
    IAuthorisedUser, ICard,
    IGameStatus,
    IPlayer,
    IServerRequestMessage,
    IServerResponseMessage
} from "./socketServerInterface";
import * as http from "http";
import {IUser} from "../../client/src/interfaces";
import {Durak} from "./cardGame";

const websocket = require('websocket')

export class SocketServer {
    private clients: Array<connection> = []
    private authorisedUsers: Array<IAuthorisedUser> = []
    private game: Durak;

    constructor(server: http.Server) {
        const wsServer = new websocket.server({
            httpServer: server,
        });
        this.game = new Durak()
        wsServer.on('request', (request: request) => {
                const connection = request.accept(undefined, request.origin);
                connection.on('message', (_message) => {
                    if (_message.type === 'utf8') {
                        const message = _message as IUtf8Message;
                        const requestMessage: IServerRequestMessage = JSON.parse(
                            message.utf8Data
                        );
                        if (requestMessage.type === 'message') {
                            this.sendMessageStatus(connection)
                            this.clients.forEach(client => {
                                this.sendMessage(connection, requestMessage.content)
                            })
                        }
                        if (requestMessage.type === 'auth') {
                            this.clients.push(connection);
                            const userData: IUser = JSON.parse(requestMessage.content)
                            const authorisedUser: IAuthorisedUser = {connection, userData}
                            this.authorisedUsers.push(authorisedUser)
                            this.sendAuth(connection, userData)
                            this.clients.forEach((client) => {
                                this.sendUsers(client)
                            });
                        }
                        if (requestMessage.type === 'join') {
                            const joined = this.authorisedUsers.find(authorised => {
                                return authorised.connection === connection
                            })
                            if (joined) {
                                this.game.joinUser(joined.userData)
                            }
                            if (this.game.getPlayers() > 1) {
                                this.game.startGame()
                                this.authorisedUsers.forEach(user=>{
                                  this.sendGameStatus(user.connection,this.game)
                                })
                            }
                        }
                        if (requestMessage.type === 'userList') {
                            this.sendUsers(connection)
                        }
                    }
                });

                connection.on('close', (reasonCode, description) => {
                    this.clients = this.clients.filter((client) => client !== connection);
                    this.authorisedUsers = this.authorisedUsers.filter((client) => client.connection !== connection);
                    this.clients.forEach((client) => {
                        this.sendUsers(client)
                    });
                });
            }
        );

    }

    sendUsers(client: connection) {
        const responseMessage: IServerResponseMessage = {
            type: 'userList',
            content: JSON.stringify(
                this.authorisedUsers.map((user) => ({userName: user.userData.userName}))
            ),
        };
        client.sendUTF(JSON.stringify(responseMessage));
    }

    sendMessageStatus(client: connection) {
        const responseStatus: IServerResponseMessage = {
            type: 'message-status',
            content: 'ok',
        };
        client.sendUTF(JSON.stringify(responseStatus));
    }

    sendMessage(client: connection, message: string) {
        const responseMessage: IServerResponseMessage = {
            type: 'message',
            content: message,
        };
        client.sendUTF(JSON.stringify(responseMessage));

    }

    sendAuth(client: connection, user: IUser) {
        const responseAuth: IServerRequestMessage = {
            type: 'auth',
            content: JSON.stringify(user)
        }
        client.sendUTF(JSON.stringify(responseAuth))
    }

    sendGameStatus(client: connection, game: Durak) {
        const authorisedUser = this.authorisedUsers.find(authorised => {
            return authorised.connection === client
        })
        if(!authorisedUser) return
        const player = game.players.find(player => {
            return player.userName === authorisedUser.userData.userName
        })
        if(!player) return
        const gameStatus: IGameStatus = {
            players: game.players.map(player => {
                return {
                    user: player.userName,
                    cardsCount: player.cards.length
                }
            }),
            cardsCountInStack: game.cards.length,
            trupmCard: game.trumpCard,
            playerCards: player.cards,
            actionCards: game.cardsInAction.map(action => {
                return {
                    attack: action.attack,
                    defend: action.defend
                }
            })
        }
        const responseGame: IServerResponseMessage = {
            type: 'game',
            content:JSON.stringify(gameStatus)
        }
        client.sendUTF(JSON.stringify(responseGame))
    }
}
