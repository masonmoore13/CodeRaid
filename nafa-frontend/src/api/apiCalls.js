import axios from "axios";
const apiUrl = "https://coderaid.free.beeceptor.com/signup";

export const signup = (user)=>{
    return axios.post(apiUrl,user)
}