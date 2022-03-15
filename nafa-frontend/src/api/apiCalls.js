import axios from "axios";
import {address,frontEndAddress} from "../config";

// let address

// if (process.env.NODE_ENV !== 'production') {
//   address = localHost
// }else{
//   address = host
// }

// Auth
const apiUrl = address + "/accounts/register/";
const loginUrl = address + "/accounts/login/";
export const signup = (user) => {
  const userObj = {
    ...user,
    redirect_url : frontEndAddress +"/login/"
  }
  return axios.post(apiUrl, userObj);
};

export const login = (user) => {
  return axios.post(loginUrl, user, {}, { auth: user });
};

// Gallery
const galleryUrl = address + "/main/api/gallery/";
const GalleryByEventIdUrl = address + "/main/api/gallery/?search=";
export const getGalleryByEventId = (id) => {
  return axios.get(`${GalleryByEventIdUrl}${id}`);
};
export const getGallery = () => {
  return axios.get(`${galleryUrl}/`);
};
// export const createGalleryImage = (galleryObject) => {
//   return axios.post(galleryUrl, galleryObject);
// };
export const createGalleryImage = (galleryObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.post(galleryUrl, galleryObject, {
        headers: {
          Authorization: "Bearer " + accessJWT,
        },
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
export const getGalleryById = (id) => {
  return axios.get(`${galleryUrl}${id}/`);
};
// export const deleteGalleryById = (id) => {
//   return axios.delete(`${galleryUrl}${id}/`);
// };
export const deleteGalleryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.delete(`${galleryUrl}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessJWT,
        },
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateGalleryById = (id, galleryObject) => {
  return axios.put(`${galleryUrl}${id}/`, galleryObject);
};

// Events
const eventUrl = address + "/main/api/event/";
export const getEvents = () => {
  return axios.get(`${eventUrl}`);
};
// export const createEvent = (eventObject) => {
//   return axios.post(eventUrl, eventObject);
// };
export const createEvent = (eventObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.post(`${eventUrl}`, eventObject, {
        headers: {
          Authorization: "Bearer " + accessJWT,
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEventById = (id) => {
  return axios.get(`${eventUrl}${id}/`);
};
// export const deleteEventById = (id) => {
//   return axios.delete(`${eventUrl}${id}/`);
// };
export const deleteEventById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.delete(`${eventUrl}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessJWT,
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
// export const updateEventById = (id, eventObject)=>{
//     return axios.put(`${eventUrl}${id}/`,eventObject);
// }
export const updateEventById = (id, eventObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.put(`${eventUrl}${id}/`, eventObject, {
        headers: {
          Authorization: "Bearer " + accessJWT,
        },
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

// Profile
const userProfileUrl = address + "/accounts/profile/user";
const searchUserByNameUrl = address + "/accounts/profile/user/?search=";

export const getUserProfile = () => {
  return axios.get(`${userProfileUrl}`);
};
export const createUserProfile = (userProfileObject) => {
  return axios.post(userProfileUrl, userProfileObject);
};

//This is the url Sital is using in profile
export const getUserProfileById = (id) => {
  return axios.get(`${userProfileUrl}/${id}/`);
};

export const deleteUserProfileId = (id) => {
  return axios.delete(`${userProfileUrl}${id}/`);
};
export const updateUserProfileById = (userProfile, id) => {
  return axios.patch(`${userProfileUrl}/${id}/`, userProfile, {
    "Content-Type": "multipart/form-data",
  });
};

// teams
const teamUrl = address + "/main/api/Team/";
export const getTeams = () => {
  return axios.get(`${teamUrl}`);
};

// Relationship
const relationshipUrl = address + "/main/api/relationship/";
const RelationshipByUserIdUrl = address + "/main/api/relationship/?search=";
export const getRelationship = () => {
  return axios.get(`${relationshipUrl}`);
};
export const getRelationshipByUserId = (id) => {
  return axios.get(`${RelationshipByUserIdUrl}${id}`);
};

/**
 * Reset Password Links
 */

const REQUEST_RESET_PASSWORD_URL =
  address + "/accounts/request-reset-password/";

const SET_NEW_PASSWORD_URL = address + "/accounts/set-new-password/";

export const resetPasswordRequest = (email) => {
  const requestObject = {
    email: email,
    redirect_url : frontEndAddress + "/update-password/"
  }
  return axios.post(REQUEST_RESET_PASSWORD_URL,requestObject);
};

export const updatePassword = (updatePasswordObject)=>{
  
  return axios.patch(SET_NEW_PASSWORD_URL,updatePasswordObject);

}
