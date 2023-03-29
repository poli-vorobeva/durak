import {FC} from 'react';
import * as React from 'react';
import {UserView} from '../UI/UserView';
import {IUser} from '../interfaces';
import {useSelector} from 'react-redux';
import {ISocketData} from '../redux/store/store';

export const UserList: FC = () => {
  const users = useSelector((state: ISocketData) => state.socketData.users);
  console.log(users, 'US');
  return (
    <>
      {users.map((user) => (
        <UserView {...user} />
      ))}
    </>
  );
};
