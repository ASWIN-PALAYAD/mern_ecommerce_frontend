import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { resetErrorAction, resetSuccessAction } from "../globalActions/globalActions";


const initialState = {
    loading:false,
    brand : {},
   brands:[],
    error : null,
    isAdded:false,
    isUpdated:false,
    isDeleted:false
};


//create brand action
export const createBrandAction = createAsyncThunk('brand/create',  
    async(name,{rejectWithValue,getState,dispatch}) =>{
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await axios.post(`${baseURL}/brands`,{name},config);
            return data;
            
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch brands actin
export const fetchBrandsAction = createAsyncThunk('brand/fetch All',
    async(payload,{rejectWithValue,getState,dispatch})=>{
        try {
            const {data} = await axios.get(`${baseURL}/brands`);
            // console.log(data);
            return data

        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)





//category slice 
const brandSlice = createSlice({
    name:'brands',
    initialState,
    extraReducers:(builder)=>{
        //create
        builder.addCase(createBrandAction.pending,(state)=>{
            state.loading = true
        });

        builder.addCase(createBrandAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.brand = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createBrandAction.rejected,(state,action)=>{
            state.loading = false;
            state.brand = null;
            state.isAdded = false;
            state.error = action.payload;
        })
        //fetch all categories
        builder.addCase(fetchBrandsAction.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchBrandsAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.brands = action.payload;
            state.isAdded = true;
        });
        builder.addCase(fetchBrandsAction.rejected,(state,action)=>{
            state.loading = false;
            state.brands = null;
            state.isAdded = false;
            state.error = action.payload
        });


         //reset err
         builder.addCase(resetErrorAction.pending,(state,action)=>{
            state.error = null
            state.isAdded = false
        });
        //reset success
        builder.addCase(resetSuccessAction.pending,(state,action)=>{
            state.isAdded = false;
            state.error = null
        })


    }
    
});

//generate reducers
const brandReducer = brandSlice.reducer;
export default brandReducer;

