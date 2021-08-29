
import React, { useEffect, useState } from 'react';
import  { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './css/App.css';
import './css/Global.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Plans from './Plans';
import User from './User';
import PublicRoute from './route/PublicRoute';
import PrivateRoute from './route/PrivateRoute';
import { getUser, getToken, setUserSession, resetSession } from './service/AuthService';
import Logo from './img/logo.jpg';


import { getRequestHeader } from './service/RequestService'

const verifyUrl = "https://l7cevyfji1.execute-api.sa-east-1.amazonaws.com/dev/verify";

function App() {

  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if(token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const user = getUser();

    const requestBody = {
      token: token,
      username: user
    }

    axios.post(verifyUrl, requestBody, getRequestHeader()).then(response => {
      setUserSession(response['username'], response['token']);
      setAuthenticating(false);
    }).catch(() => {
      resetSession();
      setAuthenticating(false);
    })

  }, []);

  const token = getToken();

  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <div className="logo">
            <img className="logo-img" alt="logo" src={Logo} />
          </div>
          <div className="menu">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/plans">Planos</NavLink>
            <NavLink activeClassName="active" to="/register">Cadastro</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/user">Usuário</NavLink>
          </div>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/plans" component={Plans} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/user" component={User} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
