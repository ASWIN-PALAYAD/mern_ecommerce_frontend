import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrorAction } from "../globalActions/globalActions";

//initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem('userInfo') ): null
  },
  allUsers : []
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


//Update user shiping adress
export const updateUserShippingAddressAction = createAsyncThunk(
    "users/update-shipping-address", 
    async ({firstName,lastName,address,city,postalCode,province,phone,country},{rejectWithValue,getState,dispatch}) => {
        try {
            //http request
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await axios.put(`${baseURL}/users/update/shipping`,{
                firstName,lastName,address,city,postalCode,province,phone,country
            },config);
            
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data)
        }
    }
    
);


//user profile action
export const getUserProfileAction = createAsyncThunk(
    "users/profile-fetched", 
    async (payload,{rejectWithValue,getState,dispatch}) => {
        try {
            //http request
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await axios.get(`${baseURL}/users/profile`,config);
            
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data)
        }
    }
    
);

//get all users
export const getAllUsersAction = createAsyncThunk(
    "users/all-users", 
    async (payload,{rejectWithValue,getState,dispatch}) => {
        try {
            //http request
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await axios.get(`${baseURL}/users/allUsers`,config);
            
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data)
        }
    }
    
);


//logout
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    localStorage.removeItem("userInfo");
    return true;
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

        //update shipping address
        builder.addCase(updateUserShippingAddressAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(updateUserShippingAddressAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(updateUserShippingAddressAction.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        });

         //user profile
         builder.addCase(getUserProfileAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(getUserProfileAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(getUserProfileAction.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        });

        //all users 
        builder.addCase(getAllUsersAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(getAllUsersAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.allUsers = action.payload;
        });
        builder.addCase(getAllUsersAction.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.allUsers = null
        });

        //logout
        builder.addCase(logoutUserAction.fulfilled,(state,action)=>{
            state.userAuth.userInfo = null
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