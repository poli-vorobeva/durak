import { UserList } from './UserList';
import * as React from 'react';
import { SocketModel } from '../socketModel';
import { ISocketData } from '../redux/store/store';
import { useSelector } from 'react-redux';

interface ILobbyFormProps {
  onClick: () => void;
  websocket: SocketModel
}

export const LobbyFrom = ({ onClick, websocket }: ILobbyFormProps) => {
  const currentUser = useSelector((state: ISocketData) => state.socketData.currentUser);
  const rooms = useSelector((state: ISocketData) => state.socketData.rooms);
  return (
    <>
      <button onClick={onClick}>Send</button>
      <button onClick={() => websocket.createRoom(currentUser.userName)}>Create room</button>

      <button onClick={() => websocket.join()}>Play With Bot</button>
      <UserList/>
      <div>
        {rooms.map(room => {
          return <p>{room.name}<span> {room.players}</span>{
            room.players.includes(currentUser.userName) ?
              <button onClick={()=>websocket.leaveRoom(currentUser.userName)}>LeaveRoom</button>
              : <button onClick={()=>websocket.joinToRoom({ player:currentUser.userName ,room:room.name})}>Join To Room</button>
          }</p>;
        })}
      </div>
      {/*<Messages />*/}
      {/*<input className="input" />*/}
    </>
  );
};
