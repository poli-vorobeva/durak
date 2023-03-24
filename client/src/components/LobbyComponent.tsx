import {GameField} from './gameField/gameField';
import React from 'react';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../redux/store/store';
import {SocketModel} from '../socketModel';
import {LobbyFrom} from './LobbyForm';
export interface IMessage {
  text: string;
}
export const LobbyComponent = ({websocket}: {websocket: SocketModel}) => {
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
      {!isStarted && (
        <>
          <LobbyFrom onClick={() => handlClick()} users={users} messages={messages} />
          <button onClick={() => websocket.join()}>join</button>
        </>
      )}
      {gameStatus && isStarted && (
        <GameField
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
