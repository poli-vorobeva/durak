import {GameField} from './gameField/gameField';
import React from 'react';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../redux/store/store';
import {SocketModel} from '../socketModel';
import {LobbyFrom} from './LobbyForm';
import {ICard} from '../interfaces';
export interface IMessage {
  text: string;
}
export const LobbyComponent = ({websocket}: {websocket: SocketModel}) => {
  const isStarted = useSelector((state: IGameData) => state.gameData.isStarted);
  const currentUser = useSelector((state: ISocketData) => state.socketData.currentUser);
  const players = useSelector((state: IGameData) => state.gameData.players);
  const activePlayerId = useSelector((state: IGameData) => state.gameData.currentPlayerIndex);
  const handleClick = () => {
    websocket.sendMessage('Done');
  };
  const onGameFieldAction = (card: ICard, actionCard: ICard) => {
    const myPlayerIndex = players.findIndex((player) => currentUser.userName === player.user);
    if (myPlayerIndex === (activePlayerId + 1) % players.length) {
      websocket.defend(actionCard, card);
    } else {
      websocket.attack(card);
    }
  };
  return (
    <>
      {!isStarted && (
        <>
          <LobbyFrom onClick={handleClick} />
          <button onClick={() => websocket.join()}>join</button>
        </>
      )}
      {players && isStarted && (
        <GameField
          onAction={onGameFieldAction}
          onTurn={() => websocket.turn()}
          onEpicFail={() => websocket.epicFail()}
        />
      )}
    </>
  );
};
