import axios from "axios";
import { host, localHost } from '../config'

const loginUrl = host+"/accounts/api/token/";
const userProfileUrl = host+"/accounts/user/";
const accessTokenUrl = host+"accounts/api/token/refresh/";

// export const userLogin = (formData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await axios.post(loginUrl, formData);
//       console.log(res);
//       resolve(res);
//     } catch (error) {
//       console.log(error.response);
//        reject(error.response);
//     }
//   });
// };

export const userLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, formData);
      console.log(res.status);
      resolve(res.data);
      if (res.status === 200) {
        sessionStorage.setItem("accessJWT", res.data.access);
        localStorage.setItem(
          "nafaSite",
          JSON.stringify({
            refreshJWT: res.data.refresh,
          })
        );
      }
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      
      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorization: "Bearer " + accessJWT,
        },
      });
      resolve(res);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const fetchNewAccessJWT = (refreshJWT) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("nafaSite"));

      if (!refreshJWT) {
        return reject("Token not found");
      }

      const res = await axios.post(accessTokenUrl,{
        "refresh": refreshJWT
      })
      console.log(res);
      if(res.status === 200){
        sessionStorage.setItem("accessJWT", res.data.access)
      }
      resolve(true);

    } catch (error) {
      console.log(error);
      if(error.status === 401){
        localStorage.removeItem("nafaSite");
      }
      reject(false);
    }
    
  });
};
