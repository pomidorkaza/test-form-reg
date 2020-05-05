
import React from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';


export const Header = ()=>{
    return   <div className="header">
    <div className="container">
        <div className="logo">
            <NavLink to="/"><img src="images/logo.png" alt=""/></NavLink>  
        </div>
<nav className="top-nav">
            <ul className="top-nav">
                <li><NavLink to="/" exact>Главная</NavLink></li>
                <li><NavLink   to="/about" >О нас</NavLink></li>
                <li><NavLink to="/rooms"  >свободные квартиры</NavLink></li>
                <li><NavLink to="/contacts" >Контакы</NavLink></li>
            </ul>
</nav>
        <div className="clearfix"></div>
    </div>
</div>

}