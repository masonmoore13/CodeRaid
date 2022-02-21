import {getUserPending, getUserSuccess, getUserFaliure} from './userSlice'
import { fetchUser} from '../../api/userApi'


export const getUserProfile = () => async dispatch =>{
    try{
        // pending before the api call
        dispatch(getUserPending());

        // call the api
        const user = await fetchUser() ;   
        console.log(user);
        //success if success 
        if(user.data){
            return dispatch(getUserSuccess(user.data))
        }
        dispatch(getUserFaliure("User is not found"))

    }catch(error){
        console.log(error)
        dispatch(getUserFaliure(error.message))
    }
}