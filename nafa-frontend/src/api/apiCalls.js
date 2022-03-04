import axios from "axios";
import address from "../config";

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
  return axios.post(apiUrl, user);
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
export const createEvent = (eventObject) => {
  return axios.post(eventUrl, eventObject);
};
export const getEventById = (id) => {
  return axios.get(`${eventUrl}${id}/`);
};
export const deleteEventById = (id) => {
  return axios.delete(`${eventUrl}${id}/`);
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
const userProfileUrl = address + "/main/api/userProfile";
const userProfileSearch = address + "/accounts/api/UserProfile/?search=";
export const getProfileByUserID = (id) => {
  return axios.get(`${userProfileSearch}${id}`);
};
export const getUserProfile = () => {
  return axios.get(`${userProfileUrl}`);
};
export const createUserProfile = (userProfileObject) => {
  return axios.post(userProfileUrl, userProfileObject);
};
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
export const getRelationshipbyUserId = (id) => {
  return axios.get(`${RelationshipByUserIdUrl}${id}`);
};
