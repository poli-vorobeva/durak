import {FC} from 'react';
import * as React from 'react';
import {UserView} from '../UI/UserView';
import {useSelector} from 'react-redux';
import {ISocketData} from '../redux/store/store';

export const UserList: FC = () => {
  const users = useSelector((state: ISocketData) => state.socketData.users);
  return (
    <>
      {users.map((user,indx) => (
        <UserView {...user} key={user.userName+indx} />
      ))}
    </>
  );
};
