import React  from 'react';

import { BrowserRouter as Router, Route, NavLink, Redirect, Switch} from 'react-router-dom';
import {PrivateRoute} from './components/PrivateRoute';
import {LoginForm} from './components/LoginForm';
import {AllUsers} from './components/AllUser';
import styles from './main.module.css';
import './App.css';
 
function App(){

  return (
  <Router>
    <ul className='nav-container'> 
   <li>  <NavLink to="/login">страница авторизации</NavLink></li>
   <li>  <NavLink to="/friends">Все пользователи</NavLink></li> 
    </ul>
    <Switch> 
    <Route path="/" exact>
      <h3>Главная страница</h3>
    </Route>
    <Route  exact path="/login">
    <LoginForm/>
    </Route>
    <Route exact path="/register">
      <h3>Register</h3>
    </Route>
    <PrivateRoute  exact path="/friends" component={()=><AllUsers/>} />

  </Switch>
  </Router>);
}

export default App;