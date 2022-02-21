import { configureStore } from "@reduxjs/toolkit";

import loginReducer from './pages/login/loginSlice'
import userReducer from './pages/home/userSlice'

const store = configureStore({
    reducer:{
        login: loginReducer,
        user: userReducer,
    }
})

export default store;