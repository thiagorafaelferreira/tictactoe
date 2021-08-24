import './App.css';
import  { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Plans from './Plans'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/plans">Planos</NavLink>
          <NavLink activeClassName="active" to="/register">Cadastro</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/plans" component={Plans} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
