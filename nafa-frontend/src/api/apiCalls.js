import axios from "axios";
const apiUrl = "http://localhost:8000/accounts/register/";
const loginUrl = "http://localhost:8000/accounts/login/"


export const signup = (user)=>{
    return axios.post(apiUrl,user)
}

export const login = (user)=>{
    return axios.post(loginUrl,user,{},{auth:user});
}