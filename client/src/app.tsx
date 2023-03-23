import React, {FC, useEffect, useState} from 'react';
import {IGameStatus, IUser} from './interfaces';
import {SocketModel} from './socketModel';
import {AuthsView} from './auth';
import {GameField} from './cardGame/cardField';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {ISocketData} from '../redux/store/store';
import {LobbyComponent} from '../components/LobbyComponent';
import {setMessages,setUsers,setCurrentUser,setStartedStatus,setGameStatus} from '../redux/actions'
export const App = () => <Provider store={store}><SocketApp/></Provider>;

// TODO: save auth
// TODO: layout

export const SocketApp = () => {
  const [websocket, setWebsocket] = useState<SocketModel>(null);
  const currentUser = useSelector((state:ISocketData) => state.socketData.currentUser)
  const dispatch = useDispatch();
  useEffect(() => {
    const _websocket = new SocketModel();
    _websocket.onMessage = (text) => {
      dispatch(setMessages(text))
    };
    _websocket.onUserList = (users) => {
      dispatch(setUsers(users))
    };
    _websocket.onAuth = (user) => {
      dispatch(setCurrentUser(user))
    };
    _websocket.onJoin = () => {
      dispatch(setStartedStatus(true));
    };
    _websocket.onGameStatus = (gameStatus) => {
      dispatch(setGameStatus(gameStatus));
    };
    _websocket.onFinish = () => {
      dispatch(setStartedStatus(false))
      console.log('finish');
    };
    setWebsocket(_websocket);
    return () => {
      _websocket.destroy();
    };
  }, []);

  return (
    <div>
      {!currentUser && (
        <AuthsView
          onUserAuth={(user) => {
            websocket.auth(user);
          }}
        />
      )}
      {currentUser && (
        <LobbyComponent websocket={websocket}/>
      )}
    </div>
  );
};

interface IMessage {
  text: string;
}

export const UserList: FC<{users: Array<IUser>}> = ({users}) => {
  return (
    <>
      {users.map((user) => (
        <UserView {...user} />
      ))}
    </>
  );
};

export const UserView: FC<IUser> = ({userName}) => {
  return <div className="user">{userName}</div>;
};

export const MessageView: FC<IMessage> = ({text}) => {
  return <div className="message">{text}</div>;
};
