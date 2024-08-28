import { createSlice } from "@reduxjs/toolkit";

// 7.1 : This slice is for user authentication check. We will ask from store whether the user is authenticated or not
const initialState = {
    status : false,
    userData : null
} 
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state,action)=>{
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout : (state) =>{
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;