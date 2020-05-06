

const initialState = {
    user:{
        email:"",
        password:"",
        isAuthanticated: localStorage.getItem('is_authorised')=='1'? true:false ,
    }
};
    
    function mainReducer(state = initialState, action) {
    switch(action.type) {
        case 'AUTHENTIACTION':{
            console.log('Hello')
            let isAuthanticated = false;
             let {password, email } = action.payload;
            if(password==="12345" && email==="user@mail.ru"){
                isAuthanticated = true;
                localStorage.setItem('is_authorised','1');
}
            else {
                isAuthanticated  = false;
                
            }
            return {...state,
                user:{
                    ...state.user,
                    isAuthanticated:  isAuthanticated
                }
            };
        }
    default:
        return state;
    }
}

    export default mainReducer;
