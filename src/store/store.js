// 7. Store for reducers : for the use of redux toolkit

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
const store = configureStore({
    reducer : {
        auth : authSlice,
    }
});

export default store;