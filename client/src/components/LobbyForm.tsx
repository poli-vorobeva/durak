import {UserList} from './UserList';
import {Messages} from '../UI/Messages';
import * as React from 'react';

interface ILobbyFormProps {
  onClick: () => void;
}
export const LobbyFrom = ({onClick}: ILobbyFormProps) => {
  return (
    <>
      <button onClick={onClick}>Send</button>
      <UserList />
      <Messages />
      <input className="input" />
    </>
  );
};
