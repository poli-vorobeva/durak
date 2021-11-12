import React, {FC, useEffect, useState} from 'react';
import {IGameStatus, IMessage, IServerRequestMessage, IUser} from "./interfaces";
import {AuthsView} from "./auth";
import {SocketModel} from "./socketModel";

export const App = () => <SocketApp/>;

export const SocketApp = () => {
    const [websocket, setWebsocket] = useState<SocketModel>(null);
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [currentUser, setCurrentUser] = useState<IUser>(null)

    useEffect(() => {
        const _websocket = new SocketModel()

        _websocket.onMessage = (text) => {
            const sendText: IMessage = {text: text}
            setMessages((prev) => {
                return [...prev, sendText];
            });
        }
        _websocket.onUserList = (users) => {
            setUsers(users);
        }
        _websocket.onAuth=(user)=>{
            setCurrentUser(user)
        }
        _websocket.onGameStatus=(gameStatus:IGameStatus)=>{
            console.log(gameStatus)
        }
        setWebsocket(_websocket);
        return () => {
            _websocket.destroy();
        };
    }, []);

    function handleClick() {
        websocket.sendMessage('dododo')
    }

    return (
        <div>
            {
                !currentUser &&
                <AuthsView onUserAuth={(user) => {

                    websocket.auth(user)
                }}/>
            }
            {
                currentUser &&
                <>
                  <button onClick={handleClick}>Send</button>
                  <UserList users={users}/>
                  <div className="messages">
                      {messages.map((message) => (
                          <MessageView {...message} />
                      ))}
                  </div>
                  <input className="input"/>
                  <button onClick={()=>websocket.join()}></button>
                </>
            }

        </div>
    );
};


export const UserList: FC<{ users: Array<IUser> }> = ({users}) => {
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
