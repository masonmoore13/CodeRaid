import { loginPending, loginSuccess, loginError } from "./loginSlice";
import { userLogin } from '../../api/userApi'
import { getUserProfile } from '../home/userActions'

export const loginUser = (user) => async dispatch =>{
    try{
        // pending before the api call
        dispatch(loginPending());
        // call the api
        const res = await userLogin(user) ;   
        dispatch(loginSuccess())  
        dispatch(getUserProfile());
    }catch(error){
        console.log(error)
        dispatch(loginError(error.response.data.detail))
    }
}