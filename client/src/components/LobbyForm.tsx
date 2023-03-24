import {UserList} from './UserList';
import {Messages} from '../UI/Messages';
import * as React from 'react';
import {IUser} from '../interfaces';
import {IMessage} from './LobbyComponent';
interface ILobbyFormProps {
  onClick: () => void;
  users: IUser[];
  messages: IMessage[];
}
export const LobbyFrom = ({onClick, users, messages}: ILobbyFormProps) => {
  return (
    <>
      <button onClick={onClick}>Send</button>
      <UserList users={users} />
      <Messages messages={messages} />
      <input className="input" />
    </>
  );
};
