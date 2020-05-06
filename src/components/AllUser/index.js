import React, {useState,useEffect, useRef, Fragment} from 'react'
import axios from 'axios';
import useModal from 'use-react-modal'


import styles from './styles.module.css';
import Button from '@material-ui/core/Button'
export const AllUsers=()=>{

    const {isOpen, openModal, closeModal, Modal } =useModal();



    const updateRef = useRef();
    const updateFormRef = useRef();
    const [upDatedId, setUpdatedId ] = useState({id:null,
        
    });

    const [updateUserData, setupdateUserData]= useState({
        name: '',
        age:'',
        country:''
    });

    const [addUserData, setaddUserData]= useState({
        name: '',
        age:'',
        country:''
    });
    const [allUsers,setAllUser] = useState([]);
    const [err,setError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        //addUserData
        
        axios.post('http://localhost:5000/add-user', addUserData)
    .then(function (response) {
            console.log(response);
            window.location.reload();
    })
    .catch(function (error) {
            console.log(error);
});

    }


    const handleSubmitUpdate=(e)=>{
        if(updateFormRef.current){
        let resultData ={};
            // console.log(updateFormRef.current.querySelectorAll('input'));
        let allInputs = updateFormRef.current.querySelectorAll('input')
            allInputs.forEach((item)=>{
                resultData[item.getAttribute('name')] = item.value;
            });
            resultData.id = upDatedId.id;
            console.log(resultData);
            axios.post('http://localhost:5000/update-user',resultData)
            .then((res)=>{
                if(res){
                    alert('Вы удалили пользователя c id ='+res.data.id);
                    window.location.reload();
                }
            }).catch((err)=>{
                console.log(err);
            })
    }
    }



    const HandleDelete=(user_id)=>{
        
        axios.post('http://localhost:5000/delete-user',{user_id})
        .then(res=>{
            if(res){
                alert('Вы удалили пользователя c id ='+res.data.id);
            window.location.reload();
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


 



    const HandleChange=(e)=>{
         
        let name_field = e.target.name;
        let value = e.target.value;
        setupdateUserData((prevState)=>{
            return {
                ...prevState,
                [name_field]:value
            }
        })
    }
    useEffect(()=>{
    if(updateRef.current){
    let id = updateRef.current.getAttribute('userid');
    setUpdatedId((prevState)=>{
    return{
    ...prevState,
    id: id
    }
    });
}
    },[isOpen]);
    useEffect(()=>{

        axios.get('http://localhost:5000/all-users/')
        .then(res=>{
            setLoading(false);
            setAllUser([...res.data]);
        
        })
        .catch(err=>{
            setLoading(false);
            setError(true);
        });

    },[]);
    return (
        <div>
    {isOpen && (<Modal> 
        <div className={styles['shadow']}>
            <div className={styles['shadow-content']}>
                <div> 
                <div id="popup1" className="overlay">
            <div className={styles['popup']}>
            <h2>Обновить пользователя	<button className="close"
                onClick={closeModal}>&times;</button>
        </h2>
            <div className= {styles["content"]} >
    <form className={styles['update-user']}   ref={updateFormRef}
    >
                    <label htmlFor="user_name_update">Введите имя пользователя:</label>
                    <input id="user_name_update" type="text" 
                        name="name"
                    />
                    <label htmlFor="user_age_update">введите возраст пользователя:</label>
                    <input id="user_age_update" type="text"
                    name="age"
    
                    />
                    <label htmlFor="user_age">введите страну пользователя:</label>
                    <input type="text" 
                    
                    name="country"
                  
                    />
                    <hr/>
                    <Button color="primary"
                    onClick={handleSubmitUpdate}
                    variant="contained">Обновить текущего пользователя</Button>
                </form>
            </div>
        </div>
    </div>
    </div>
        
        </div>
        
        </div>
        </Modal>)}
        <ol className={styles['rounded']}>
            {isLoading&&<li>Loading ...</li>}
        {
            !isLoading && !err && <Fragment> 
                
                <form className={styles['add-user']}
                
                >
                    <label htmlFor="user_name">введите имя пользователя:</label>
                    <input id="user_name" type="text" name="name"
                        value={addUserData.name}
                        onChange={HandleChange}
                    />
                    <label htmlFor="user_age">введите возраст пользователя:</label>
                    <input id="user_age" type="text" name="age"
    value={addUserData.age}
    onChange={HandleChange}
               
                    />
                    <label htmlFor="user_age">введите страну пользователя:</label>
                    <input type="text" name="country"
                      value={addUserData.country}
                      onChange={HandleChange}
               
                    />
                    <Button color="primary"
                    onClick={handleSubmit}
                    variant="contained">Отправить</Button>
                </form>
                {
                    allUsers.map(item=>{
                    return     <li key={item.id}
                        className={styles['rounded-item']}>
                            <a className={styles['rounded-item-link']} >
                           <div className={styles['delete-btn-container']}> <button onClick={(e)=>HandleDelete(item.id)}>X</button></div>
                              <div>                                 <span>Имя : {item.name}</span>
                        <br/>

                    <span>  Возраст :{item.age}</span>
            <span className={styles['update-container']}> <Button  
                    //    onClick={(e)=>handleUpdate(e,item.id)}
                    onClick={openModal}
                    ref={updateRef}
                    userid={item.id}
                color="primary" variant="contained"> Изменить</Button>
            </span>
                    <br/>
                      
                    </div>

                        </a>
                        
                        </li>
        
                    })
                }
              </Fragment>
        }
               </ol>
        </div>
    )
}
