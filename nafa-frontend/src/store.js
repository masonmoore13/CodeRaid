import { configureStore } from "@reduxjs/toolkit";

import loginReducer from './pages/login/loginSlice'
import userReducer from './pages/home/userSlice'

import signUpReducer from './pages/user-signup/userSignupSlice'

const store = configureStore({
    reducer:{
        login: loginReducer,
        user: userReducer,
        signup:signUpReducer
    }
})

export default store;