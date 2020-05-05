import React  from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import styles from './main.module.css';
import './App.css';

import {Header } from './Header';

import {MainPage} from './pages/MainPage';
import {AboutPage} from './pages/AboutPage';
import { RoomsPage } from './pages/RoomsPage';
import {ContactPage} from './pages/ContactPage';
function App(){

  return (
  <Router>
   <Header/>

    <Route path="/" exact><MainPage/></Route>
    <Route path="/about"><AboutPage/></Route>
    <Route path="/rooms"><RoomsPage/></Route>
    <Route path="/contacts"><ContactPage/></Route>
  </Router>);
}

export default App;