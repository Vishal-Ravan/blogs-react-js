import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./component/redux/authSlice"

const store = configureStore({
    reducer:{
user: authSlice,
    }
})

export default store;