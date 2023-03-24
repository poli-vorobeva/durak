import {MessageView} from './MessageView';
import React from 'react';
import {IMessage} from '../components/LobbyComponent';

export const Messages = ({messages}: {messages: IMessage[]}) => {
  return (
    <div className="messages">
      {messages.map((message) => (
        <MessageView {...message} />
      ))}
    </div>
  );
};
