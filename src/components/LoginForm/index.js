import React, { useState, Fragment, useCallback ,useReducer ,useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import validator from 'email-validator';

import cx from 'classnames';
import styles from './styles.module.css';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';


import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';



function checkValidity(name, value){
    switch (name){
        case 'userEmail':
                return validator.validate(value);
        case 'userPass':
            return value.length>=4;
        default: 
        return true;
    }
}
export const LoginForm = ({style, className, type, children,
    ...restProps})=>{
    
        const dispatch = useDispatch();
        const user = useSelector((state)=>state.user);
         const [formData, setFormData] = useState({
        userEmail:{
                value:"",
                errorMsg:"Не валидный email",
                isValid: false,
            },
            userPass:{
                value:"",
                errorMsg:"Минимальное количество символов 4",
                isValid: false
            },
                
        });
    const [errorsArray, setErrorArray] = useState([]);    
    const onHandleSubmit=(e)=>{
        e.preventDefault();

        let resultArr=[];
        for(let field in formData ){
            if(!formData[field].isValid){
                // setErrorArray([...errorsArray,formData[field].errorMsg]);
            resultArr.push(formData[field].errorMsg);
            }
    }
    setErrorArray(resultArr);
    if(resultArr.length===0){
        // Все ОК
        dispatch({type:"AUTHENTIACTION",payload:{
                password:formData.userPass.value,
                email: formData.userEmail.value
        }});
    }
}
    const onHandleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let isValid = checkValidity(name,value);
            
        setFormData((prevState)=>{

            return {
                ...prevState,
                [name]:{
                    ...prevState[name],
                    value: value,
                    isValid
                }
            }
        });
}

    
    return  ( <Fragment>
        <div className={styles['container']}>
         
        <form className={styles['login-form']} 
                onSubmit={onHandleSubmit}
    >
{   errorsArray.length>0&&<div className={styles['errors']}>
{
    errorsArray.map( (item,index) =><p key={index}>{item}</p>)
} 
</div>}
            <div    className={styles['login-form-email']}> 
                <TextField
                name="userEmail"
              
                onChange={(e)=>onHandleChange(e)}
                type="text" value={formData.userEmail.value}/>
                </div>
                <div    className={styles['login-form-password']}> 
                <TextField
                name="userPass"
                 onChange={(e)=>onHandleChange(e)}
                type="password" value={formData.userPass.value}
                />
                </div>
               <div className={styles['btn-container']}>
                    <Button color="primary" 
                     variant="contained"
                      className={styles['login-form-btn']}
                      onClick={(e)=>onHandleSubmit(e)}
                      >Click</Button>
                {user.isAuthanticated && 
        <NavLink to="/friends">все пользователи</NavLink>}
        </div>
</form>

</div>
</Fragment>
);
}