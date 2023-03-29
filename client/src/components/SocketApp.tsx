// TODO: save auth
// TODO: layout

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ISocketData} from '../redux/store/store';
import {AuthsView} from './auth/auth';
import {LobbyComponent} from './LobbyComponent';
import * as React from 'react';
import {SocketModel} from '../socketModel';

export const SocketApp = () => {
  const [websocket, setWebsocket] = useState<SocketModel>(null);
  const currentUser = useSelector((state: ISocketData) => state.socketData.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const _websocket = new SocketModel(dispatch);
    setWebsocket(_websocket);
    return () => {
      _websocket.destroy();
    };
  }, []);

  return (
    <div>
      {!currentUser ? (
        <AuthsView
          onUserAuth={(user) => {
            websocket.auth(user);
          }}
        />
      ) : (
        <LobbyComponent websocket={websocket} />
      )}
    </div>
  );
};
