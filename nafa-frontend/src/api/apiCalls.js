import axios from "axios";
const apiUrl = "http://localhost:8000/accounts/register/";

export const signup = (user)=>{
    return axios.post(apiUrl,user)
}