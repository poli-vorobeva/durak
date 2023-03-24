import {FC} from 'react';
import * as React from 'react';
import {UserView} from '../UI/UserView';
import {IUser} from '../interfaces';

export const UserList: FC<{users: Array<IUser>}> = ({users}) => {
  return (
    <>
      {users.map((user) => (
        <UserView {...user} />
      ))}
    </>
  );
};
