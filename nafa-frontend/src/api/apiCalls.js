import axios from "axios";
import { host, localHost } from '../config'

const apiUrl = host+"/accounts/register/";
const loginUrl = host+"/accounts/login/"
const eventUrl= host+"/main/api/event/";
const eventGalleryUrl = host+"/main/api/gallery/?search=";

// Auth
export const signup = (user)=>{
    return axios.post(apiUrl,user)
}

export const login = (user)=>{
    return axios.post(loginUrl,user,{},{auth:user});
}

// Gallery 
export const getGalleryByEventId = (id) => {
  return axios.get(`${eventGalleryUrl}${id}`);
};

export const getGallery= ()=>{
    return axios.get(`${eventUrl}`)
}
export const createGallery = (eventObject)=>{
    return axios.post(eventUrl,eventObject);
}
export const getGalleryById = (id) => {
  return axios.get(`${eventUrl}${id}/`);
};
export const deleteGalleryById = (id) => {
  return axios.delete(`${eventUrl}${id}/`);
};
export const updateGalleryById = (id, eventObject) => {
  return axios.put(`${eventUrl}${id}/`, eventObject);
};



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
