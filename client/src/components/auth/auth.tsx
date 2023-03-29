import {useState} from 'react';
import * as React from 'react';
import {IUser} from '../../interfaces';
import authStyles from './auth.module.css';

export const AuthsView = ({onUserAuth}: {onUserAuth: (user: IUser) => void}) => {
  const [userName, setUserName] = useState('');

  return (
    <div>
      <fieldset className={authStyles.authFieldset}>
        <legend>Ведите ваше имя</legend>
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const user: IUser = {userName};
            onUserAuth(user);
          }}
        >
          Show Rooms
        </button>
      </fieldset>
    </div>
  );
};
