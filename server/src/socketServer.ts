import { connection, IUtf8Message } from 'websocket';
import {
  IAttackParams,
  IAuthorisedUser,
  IGameStatus,
  IServerRequestMessage,
  IServerResponseMessage,
} from './socketServerInterface';
import * as http from 'http';
import { IDefendParams, IUser } from '../../client/src/interfaces';
import { Durak } from './cardGame';
import { PlayerController } from './playerController';
import { BotController } from './BotController';
import { Rooms } from './Rooms';

const websocket = require('websocket');

export class SocketService {
  game: Durak;
  private clients: Array<connection> = [];
  private authorisedUsers: Array<IAuthorisedUser> = [];
  private rooms: Rooms;

  constructor(server: http.Server) {
    const wsServer = new websocket.server({
      httpServer: server,
    });
    this.game = new Durak();
    this.rooms = new Rooms();
    wsServer.on('request', (request) => {
      const connection = request.accept(undefined, request.origin);
      connection.on('message', (_message) => {
        if (_message.type === 'utf8') {
          const message = _message as IUtf8Message;
          const requestMessage: IServerRequestMessage = JSON.parse(
            message.utf8Data,
          );
          if (requestMessage.type === 'message') {
            this.sendMessageStatus(connection);
            this.clients.forEach((client) => {
              this.sendMessage(client, requestMessage.content);
            });
          }

          if (requestMessage.type === 'userList') {
            this.sendUsers(connection);
          }
          if (requestMessage.type === 'joinToRoom') {
            const { player, room }: { player: string, room: string } = JSON.parse(requestMessage.content);
            this.rooms.joinToRoom({ player, room });
            this.clients.forEach((client) => {
              this.sendRooms(client);
              this.sendUsers(client);
            });
          }
          if (requestMessage.type === 'leaveToRoom') {
            console.log('LEAVE')
            const user = requestMessage.content;
            this.rooms.deleteUserFromRoom(user)
            this.clients.forEach((client) => {
              this.sendRooms(client);
              this.sendUsers(client);
            });
          }
          if (requestMessage.type === 'auth') {
            this.clients.push(connection);
            const userData: IUser = JSON.parse(requestMessage.content);
            const authorisedUser: IAuthorisedUser = { connection, userData };
            this.authorisedUsers.push(authorisedUser);
            this.clients.forEach((client) => {
              this.sendUsers(client);
              this.sendRooms(client);
            });
            this.sendAuth(connection, userData);
          }
          if (requestMessage.type === 'createRoom') {
            this.rooms.addRoom(requestMessage.content);
            this.authorisedUsers.forEach(user => {
              this.sendRooms(user.connection);
              this.sendUsers(user.connection);
            });
            //userData.userName
          }
          if (requestMessage.type === 'join') {
            const joined = this.authorisedUsers.find((authorised) => {
              return authorised.connection === connection;
            });
            if (joined) {
              this.sendJoin(joined.connection);
              this.game.joinUser(joined.userData);
            }
            if (this.game.getPlayers() >= 1) {
              this.game.joinUser({ userName: 'Bot' });
              const bot = new BotController(this.game, 'Bot');
              this.game.startGame();
              this.game.onFinish = () => {
                this.authorisedUsers.forEach((user) =>
                  this.sendFinish(user.connection, ''),
                );
              };
              this.authorisedUsers.forEach((user) => {
                this.sendGameStatus(user.connection, this.game);
              });
            }
            // if (this.game.getPlayers() > 1) {
            //   this.game.startGame();
            //   this.game.onFinish = () => {
            //     this.authorisedUsers.forEach((user) =>
            //       this.sendFinish(user.connection, '')
            //     );
            //   };
            //   this.authorisedUsers.forEach((user) => {
            //     this.sendGameStatus(user.connection, this.game);
            //   });
            // }
          }
          if (requestMessage.type === 'attack') {
            const authorised = this.authorisedUsers.find((authorised) => {
              return authorised.connection === connection;
            });
            const controller = new PlayerController(
              this.game,
              authorised.userData.userName,
            );
            const attackParams: IAttackParams = JSON.parse(
              requestMessage.content,
            );
            controller.attack(attackParams.attackCard);
            this.authorisedUsers.forEach((user) => {
              this.sendGameStatus(user.connection, this.game);
            });
            controller.destroy();
          }

          if (requestMessage.type === 'defend') {
            console.log('def', requestMessage);
            const authorised = this.authorisedUsers.find((authorised) => {
              return authorised.connection === connection;
            });
            const player = this.game.players.find((player) => {
              return player.userName === authorised.userData.userName;
            });
            const defendParams: IDefendParams = JSON.parse(
              requestMessage.content,
            );

            if (defendParams.attackCard == null) return;

            const playerCard = player.cards.find((card) =>
              card.isEqual(defendParams.defendCard),
            );

            const attackCard = this.game.cardsInAction.find((action) =>
              action.attack.isEqual(defendParams.attackCard),
            )?.attack;

            if (attackCard == null) return;

            this.game.defend(player, playerCard, attackCard);
            this.authorisedUsers.forEach((user) => {
              this.sendGameStatus(user.connection, this.game);
            });
          }

          if (requestMessage.type === 'turn') {
            const authorised = this.authorisedUsers.find((authorised) => {
              return authorised.connection === connection;
            });

            this.game.turn(authorised.userData.userName);
            this.authorisedUsers.forEach((user) => {
              this.sendGameStatus(user.connection, this.game);
            });
          }

          if (requestMessage.type === 'epicFail') {
            const authorised = this.authorisedUsers.find((authorised) => {
              return authorised.connection === connection;
            });

            this.game.epicFail(authorised.userData.userName);
            this.authorisedUsers.forEach((user) => {
              this.sendGameStatus(user.connection, this.game);
            });
          }
        } else {
          throw new Error('Not utf8');
        }
      });

      connection.on('close', (reasonCode, description) => {
        const currentUser = this.authorisedUsers.find(user => user.connection === connection);
        this.authorisedUsers = this.authorisedUsers.filter(
          (client) => client.connection !== connection,
        );
        this.clients = this.clients.filter((client) => client !== connection);
        this.rooms.deleteUserFromRoom(currentUser?.userData.userName);
        this.clients.forEach((client) => {
          this.sendUsers(client);
          this.sendRooms(client);
        });

        console.log('Client has disconnected.');
        this.game.disconnectPlayer();
      });
    });
  }

  sendUsers(client: connection) {
    const userList = this.authorisedUsers.map((user) => ({
      userName: user.userData.userName,
    }));
    const usersWithoutRooms = userList.filter(user => !this.rooms.isUserInRoom(user.userName));
    console.log("usersWithoutRooms",usersWithoutRooms)
    this.sendResponse(client, 'userList', JSON.stringify(usersWithoutRooms));
  }

  sendMessageStatus(client: connection) {
    this.sendResponse(client, 'message-status', 'ok');
  }

  sendMessage(client: connection, message: string) {
    this.sendResponse(client, 'message', message);
  }

  sendAuth(client: connection, user: IUser) {
    this.sendResponse(client, 'auth', JSON.stringify(user));
  }

  sendRooms(client: connection) {
    console.log('ROOMS', this.rooms.rooms);
    this.sendResponse(client, 'updateRooms', JSON.stringify(this.rooms.rooms));
  }

  sendGameStatus(client: connection, game: Durak) {
    const authorisedUser = this.authorisedUsers.find((authorised) => {
      return authorised.connection === client;
    });
    if (!authorisedUser) return;
    const gameStatus = game.getGameStatus(authorisedUser.userData.userName);
    this.sendResponse(client, 'game', JSON.stringify(gameStatus));
  }

  sendFinish(client: connection, message: string) {
    this.sendResponse(client, 'finish', message);
  }

  sendJoin(client: connection) {
    this.sendResponse(client, 'join', '');
  }

  sendResponse(client: connection, type: string, stringContenrt: string) {
    console.log(type, '##Type');
    const responseMessage: IServerResponseMessage = {
      type: type,
      content: stringContenrt,
    };
    client.sendUTF(JSON.stringify(responseMessage));
  }
}
