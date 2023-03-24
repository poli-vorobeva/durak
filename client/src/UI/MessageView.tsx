import {FC} from 'react';
import * as React from 'react';

interface IMessage {
  text: string;
}
export const MessageView: FC<IMessage> = ({text}) => {
  return <div className="message">{text}</div>;
};
