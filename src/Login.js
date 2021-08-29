import React, { useState } from 'react';
import { setUserSession } from './service/AuthService'
import { getRequestHeader } from './service/RequestService'
import axios from 'axios';
import './css/Login.css'

const loginUrl = 'https://l7cevyfji1.execute-api.sa-east-1.amazonaws.com/dev/login'

const Login = (props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();

        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginUrl, requestBody, getRequestHeader()).then(response => {
            setMessage('Efetuado login com sucesso');
            console.log(response);
            setUserSession(response.data.username, response.data.token);
            props.history.push('/user')
        }).catch(error => {
            setMessage("Ocorreu erro ao fazer o login")
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={submitHandler} >
                Usuário: <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
                Senha: <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                <input type="submit" value="Login" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Login;