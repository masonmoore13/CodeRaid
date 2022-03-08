import axios from "axios";
import address from "../config";

// let address

// if (process.env.NODE_ENV !== 'production') {
//   address = localHost
// }else{
//   address = host
// }

// Auth
const SIGN_UP_URL = address + "/accounts/register/";

export const signup = (user) => {
  return axios.post(SIGN_UP_URL, user);
};


// Gallery
const GALLERY_URL = address + "/main/api/gallery/";
const GALLERY_BY_EVENT_URL = address + "/main/api/gallery/?search=";
export const getGalleryByEventId = (id) => {
  return axios.get(`${GALLERY_BY_EVENT_URL}${id}`);
};
export const getGallery = () => {
  return axios.get(`${GALLERY_URL}/`);
};
// export const createGalleryImage = (galleryObject) => {
//   return axios.post(GALLERY_URL, galleryObject);
// };
export const createGalleryImage = (galleryObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.post(GALLERY_URL, galleryObject, {
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
  return axios.get(`${GALLERY_URL}${id}/`);
};
// export const deleteGalleryById = (id) => {
//   return axios.delete(`${GALLERY_URL}${id}/`);
// };
export const deleteGalleryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.delete(`${GALLERY_URL}${id}/`, {
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
  return axios.put(`${GALLERY_URL}${id}/`, galleryObject);
};

// Events
const EVENT_URL = address + "/main/api/event/";
export const getEvents = () => {
  return axios.get(`${EVENT_URL}`);
};
export const createEvent = (eventObject) => {
  return axios.post(EVENT_URL, eventObject);
};
export const getEventById = (id) => {
  return axios.get(`${EVENT_URL}${id}/`);
};
export const deleteEventById = (id) => {
  return axios.delete(`${EVENT_URL}${id}/`);
};
// export const updateEventById = (id, eventObject)=>{
//     return axios.put(`${EVENT_URL}${id}/`,eventObject);
// }
export const updateEventById = (id, eventObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.put(`${EVENT_URL}${id}/`, eventObject, {
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
const USER_PROFILE_URL = address + "/accounts/profile/user";



export const getUserProfile = () => {
  return axios.get(`${USER_PROFILE_URL}`);
};
export const createUserProfile = (userProfileObject) => {
  return axios.post(USER_PROFILE_URL, userProfileObject);
};
//This is the url Sital is using in profile
export const getUserProfileById = (id) => {
  return axios.get(`${USER_PROFILE_URL}/${id}/`);
};



// teams
const TEAM_URL = address + "/main/api/Team/";
export const getTeams = () => {
  return axios.get(`${TEAM_URL}`);
};

// Relationship
const RELATIONSHIP_URL = address + "/main/api/relationship/";

export const getRelationship = () => {
  return axios.get(`${RELATIONSHIP_URL}`);
};
export const getRelationshipByUserId = (id) => {
  return axios.get(`${RELATIONSHIP_URL}${id}`);
};
