import {MessageView} from './MessageView';
import React from 'react';
import {IMessage} from '../components/LobbyComponent';
import {useSelector} from 'react-redux';
import {ISocketData} from '../redux/store/store';

export const Messages = () => {
  const messages = useSelector((state: ISocketData) => state.socketData.messages);
  return (
    <div className="messages">
      {messages.map((message) => (
        <MessageView {...message} />
      ))}
    </div>
  );
};
