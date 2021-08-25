import React, { useState } from 'react';
import { getRequestHeader } from './service/RequestService'
import axios from 'axios';

const registerUrl = 'https://l7cevyfji1.execute-api.sa-east-1.amazonaws.com/dev/register'

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
  
        if(name === '' || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            setMessage('Campos nome, nome de usuário, e-mail e senha são obrigatórios, favor preencher!');
            return
        }

        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }

        axios.post(registerUrl, requestBody, getRequestHeader()).then(response => {
            setMessage('Registrado com sucesso');
        }).catch(error => {
            setMessage("Ocorreu erro ao fazer o registro")
            // if(error.response.status === 401) {
            //     setMessage(error.response.data.message);
            // } else {
            //     setMessage('desculpe... o servidor está indisponível, por favor tente mais tarde!')
            // }
        })
    }

    return (
        <div>
            <h1>Cadastre-se</h1>
            <form onSubmit={submitHandler}> 
                Nome: <input type="text" value={name} onChange={event => setName(event.target.value)} /><br/>
                Nome de Usuário: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /><br/>
                E-mail: <input type="email" value={email} onChange={event => setEmail(event.target.value)} /><br/>
                Senha: <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                <input type="submit" value="Cadastro" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;