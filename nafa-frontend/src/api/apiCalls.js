import axios from "axios";
import address from '../config'

// let address

// if (process.env.NODE_ENV !== 'production') {
//   address = localHost
// }else{
//   address = host
// }


const apiUrl = address+"/accounts/register/";
const loginUrl = address+"/accounts/login/"
const eventUrl= address+"/main/api/event/";
const eventGalleryUrl = address+"/main/api/gallery/?search=";
const userProfileUrl = address + '/main/api/userProfile'

// Auth
export const signup = (user)=>{
    return axios.post(apiUrl,user)
}

export const login = (user)=>{
    return axios.post(loginUrl,user,{},{auth:user});
}

// Gallery 
export const getGalleryByEventId = (id) => {
  return axios.get(`${eventGalleryUrl}${id}/`);
};

export const getGallery= ()=>{
    return axios.get(`${eventUrl}/`)
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



// Profile

export const updateUserProfileById = ((userProfile,id) => {
    return axios.patch(`${userProfileUrl}/${id}/`,userProfile);
})

export const getUserProfile = ()=>{
    return axios.get(`${userProfileUrl}/`)
}