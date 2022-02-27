import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchNewAccessJWT, verifyToken } from "../../api/userApi";
import { getUserProfile } from "../../pages/home/userActions";
import { loginError, loginSuccess } from "../../pages/login/loginSlice";

const RouterWrapper = () => {
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  
  // rerender if some part of state is change. useEffect.
  useEffect(() => {
    // updates the access token based on user token
    const updateAccessJWT = () => {
      fetchNewAccessJWT()
        .then((res) => {
          if (res) {
            dispatch(getUserProfile());
            dispatch(loginSuccess());
          }
        })
        .catch((error) => {
         
          dispatch(loginError(""));
        });
    };

    // checks the access token as long as the use is logged in
    const tokenCheck = async () => {
      try {
        const res = await verifyToken();
        return res;
      } catch (error) {
        if (localStorage.getItem("nafaSite")) {
          updateAccessJWT();
        }
        return error;
      }
    };

    // if the user is logged in but doesn't have a userProfile then fetches it
    isAuth && !user.username && dispatch(getUserProfile());

    // check if there is a valid auth token if the user is logged in
    isAuth && tokenCheck();

    // if not logged in but there are tokens in storage then log them in
    !isAuth &&
      sessionStorage.getItem("accessJWT") &&
      localStorage.getItem("nafaSite") &&
      dispatch(loginSuccess());
      
    // if valid then dispatch loginSuccess()
  }, [isAuth, dispatch, user.username]);
  return <Outlet />;
};

export default RouterWrapper;
