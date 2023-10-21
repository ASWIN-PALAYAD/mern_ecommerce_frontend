import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrorAction } from "../globalActions/globalActions";

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
    userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem('userInfo') ): null
  },
};


//register action
export const registerUserAction = createAsyncThunk(
    "users/register", 
    async ({email,password,fullname},{rejectWithValue,getState,dispatch}) => {
        try {
            //http request
            const {data} = await axios.post(`${baseURL}/users/register`,{
                email,
                password,
                fullname
            });
            
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data)
        }
    }
    
);



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
            //save the user to localstorage
            localStorage.setItem('userInfo',JSON.stringify(data))
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data)
        }
    }
    
);


//users slice

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

        //register
        builder.addCase(registerUserAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(registerUserAction.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        });

        //reset error action
        builder.addCase(resetErrorAction.pending,(state)=>{
            state.error = null
        });
    }
});


//generate reducer
const usersReducer = userSlice.reducer;
export default usersReducer;