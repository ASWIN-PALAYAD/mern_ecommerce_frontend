import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

//login action
export const loginUserAction = createAsyncThunk(
    "users/login", 
    async ({email,password},{rejectWithValue,getState,dispatch}) => {
        try {
            //http request
            const {data} = await axios.post(`${baseURL}/users/login`,{
                email,
                password
            });
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data)
        }
    }
    
);


//users Clice

const userSlice = createSlice({
    name:"users",
    initialState,
    extraReducers:(builder)=>{
        //handle action
        //login
        builder.addCase(loginUserAction.pending,(state,action)=>{
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled,(state,action)=>{
            state.userAuth.loading = false;
            state.userAuth.userInfo = action.payload;
        });
        builder.addCase(loginUserAction.rejected,(state,action)=>{
            state.userAuth.loading = false;
            state.userAuth.error = action.payload;
        });
    }
});


//generate reducer
const usersReducer = userSlice.reducer;
export default usersReducer;