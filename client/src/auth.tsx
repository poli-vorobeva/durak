import React from "react";
import {useState} from "react";
import {IUser} from "./interfaces";

export const AuthsView = ({onUserAuth}:{onUserAuth:(user:IUser)=>void}) => {
    const [userName, setUserName] = useState('')

    return (
        <div>
            <div>auth</div>
            <input value={userName} onChange={(e) => {
                setUserName(e.target.value)
            }}/>
            <button onClick={() => {
                const user:IUser={userName:userName}
               // console.log(user)
                onUserAuth(user)
            }}>sendName
            </button>
        </div>
    )
}
