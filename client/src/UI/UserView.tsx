import {FC} from 'react';
import {IUser} from '../interfaces';
import * as React from 'react';

export const UserView: FC<IUser> = ({userName}) => {
  return <div className="user">{userName}</div>;
};
