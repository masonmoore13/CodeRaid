import axios from "axios";
import {address} from "../config";

const loginUrl = address + "/accounts/login/";
const userProfileUrl = address + "/accounts/user/";
const accessTokenUrl = address + "/accounts/api/token/refresh/";
const verifyTokenUrl = address + "/accounts/api/token/verify/";

export const userLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, formData);

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
      console.log(error)
      return reject(error);
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
      reject(error);
    }
  });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("nafaSite"));
      if (!refreshJWT) {
        return reject("Token not found");
      }

      const res = await axios.post(accessTokenUrl, {
        refresh: refreshJWT,
      });
      if (res.status === 200) {
        sessionStorage.setItem("accessJWT", res.data.access);
      }
      resolve(true);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("nafaSite");
        sessionStorage.removeItem("accessJWT");
      }
      reject(false);
    }
  });
};

export const verifyToken = () => {
  return new Promise(async (resolve, reject) => {
    // send the request.. only accessJWT verification needed
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      const res = await axios.post(verifyTokenUrl, { token: accessJWT });
      // if 200 then token verified and resolve true
      if (res.status === 200) {
        resolve(true);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        reject(false);
      }
    }

    // if not delete that token and resolve false
  });
};
