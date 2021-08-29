import React from 'react';
import { getUser, resetSession } from './service/AuthService'

const User = (props) => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user : '';

    const handleLogout = () => {
        resetSession();
        props.history.push('login')
    }

    return (
        <div>
            Bem vindo {name}, você acessou a sua área!
            <input type="button" value="Logout" onClick={handleLogout} />
        </div>
    )
}

export default User;