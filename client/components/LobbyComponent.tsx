import {GameField} from '../src/cardGame/cardField';
import React, {useState} from 'react';
import {MessageView, UserList} from '../src/app';
import {IGameStatus, IUser} from '../src/interfaces';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../redux/store/store';
import {SocketModel} from '../src/socketModel';
export interface IMessage {
  text: string;
}
export const LobbyComponent=({websocket}:{websocket:SocketModel})=>{
  const messages = useSelector((state:ISocketData) =>state.socketData.messages)
  const users =  useSelector((state:ISocketData) =>state.socketData.users)
  const gameStatus = useSelector((state:IGameData) =>state.gameData.gameStatus)
  const isStarted = useSelector((state:IGameData) =>state.gameData.isStarted)
  const currentUser = useSelector((state:ISocketData) => state.socketData.currentUser)

  function handlClick() {
    websocket.sendMessage('Done');
  }
  return <>
    <button onClick={handlClick}>Send</button>
    <UserList users={users} />
    <div className="messages">
      {messages.map((message) => (
        <MessageView {...message} />
      ))}
    </div>
    <input className="input" />
    {!isStarted && <button onClick={() => websocket.join()}>join</button>}
    {gameStatus && isStarted && (
      <GameField
        data={gameStatus}
        onAction={(card, actionCard) => {
          const myPlayerIndex = gameStatus.players.findIndex(
            (player) => currentUser.userName === player.user
          );
          if (
            myPlayerIndex ===
            (gameStatus.currentPlayerIndex + 1) %
            gameStatus.players.length
          ) {
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
}