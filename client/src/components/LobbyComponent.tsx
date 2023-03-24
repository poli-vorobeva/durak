import {GameField} from './gameField/gameField';
import React from 'react';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../redux/store/store';
import {UserList} from './UserList';
import {Messages} from '../UI/Messages';
import {SocketModel} from '../socketModel';
import {IGameStatus} from '../interfaces';
export interface IMessage {
  text: string;
}
export const LobbyComponent = ({websocket}: {websocket: SocketModel}) => {
  console.log(websocket, '^^^WEBS');
  const messages = useSelector((state: ISocketData) => state.socketData.messages);
  const users = useSelector((state: ISocketData) => state.socketData.users);
  const gameStatus = useSelector((state: IGameData) => state.gameData.gameStatus);
  const isStarted = useSelector((state: IGameData) => state.gameData.isStarted);
  const currentUser = useSelector((state: ISocketData) => state.socketData.currentUser);

  function handlClick() {
    websocket.sendMessage('Done');
  }
  return (
    <>
      <button onClick={handlClick}>Send</button>
      <UserList users={users} />
      <Messages messages={messages} />
      <input className="input" />
      {!isStarted && <button onClick={() => websocket.join()}>join</button>}
      {gameStatus && isStarted && (
        <GameField
          data={gameStatus}
          onAction={(card, actionCard) => {
            const myPlayerIndex = gameStatus.players.findIndex(
              (player) => currentUser.userName === player.user,
            );
            if (myPlayerIndex === (gameStatus.currentPlayerIndex + 1) % gameStatus.players.length) {
              websocket.defend(actionCard, card);
            } else {
              websocket.attack(card);
            }
          }}
          onTurn={() => websocket.turn()}
          onEpicFail={() => websocket.epicFail()}
        />
      )}
    </>
  );
};
