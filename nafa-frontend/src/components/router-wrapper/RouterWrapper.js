import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchNewAccessJWT } from "../../api/userApi";
import { getUserProfile } from "../../pages/home/userActions";
import { loginError, loginSuccess } from "../../pages/login/loginSlice";

const RouterWrapper = () => {
  const { isAuth } = useSelector((state) => state.login);
  const {user} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  // rerender if some part of state is change. useEffect.
  useEffect(() => {
    // if not isAuth check the refreshJWT and if it is valid
    console.log("router wrapper");
    const updateAccessJWT = async () => {
      console.log("update access called");
      const res = await fetchNewAccessJWT();
      console.log(res);
      if(res){
          return dispatch(loginSuccess())
      }
      dispatch(loginError(""));
    };

    !sessionStorage.getItem("accessJWT") &&
      localStorage.getItem("nafaSite") &&
      updateAccessJWT();

      !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
      console.log(user.username);
      isAuth  && !user.username && dispatch(getUserProfile())
    // if valid then dispatch loginSuccess()
  }, [isAuth, dispatch, user.username]);
  return <Outlet />;
};

export default RouterWrapper;
