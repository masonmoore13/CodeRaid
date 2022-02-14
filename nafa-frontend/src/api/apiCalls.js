import axios from "axios";

const apiUrl = "/accounts/register/";
const loginUrl = "/accounts/login/"
const eventUrl= "/main/api/event/";

// Auth
export const signup = (user)=>{
    return axios.post(apiUrl,user)
}

export const login = (user)=>{
    return axios.post(loginUrl,user,{},{auth:user});
}


// Events 

export const getEvents = ()=>{
    return axios.get(`${eventUrl}`)
}

export const createEvent = (eventObject)=>{
    return axios.post(eventUrl,eventObject);
}

export const getEventById = (id)=>{
    return axios.get(`${eventUrl}${id}/`);
}

export const deleteEventById = (id)=>{
    return axios.delete(`${eventUrl}${id}/`);
}

export const updateEventById = (id, eventObject)=>{
    return axios.put(`${eventUrl}${id}/`,eventObject);
}
