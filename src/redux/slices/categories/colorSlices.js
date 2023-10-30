import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { resetErrorAction, resetSuccessAction } from "../globalActions/globalActions";

const initialState = {
    loading:false,
    color : {},
   colors:[],
    error : null,
    isAdded:false,
    isUpdated:false,
    isDeleted:false
};


//create color action
export const createColorAction = createAsyncThunk('color/create', 
    async(name,{rejectWithValue,getState,dispatch}) =>{
        console.log(name);
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await axios.post(`${baseURL}/colors`,{name},config);
            return data;
            
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch colors actin
export const fetchColorsAction = createAsyncThunk('color/fetch-All',
    async(payload,{rejectWithValue,getState,dispatch})=>{
        try {
            const {data} = await axios.get(`${baseURL}/colors`);
            // console.log(data);
            return data

        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)





//color slice 
const colorSlice = createSlice({
    name:'colors',
    initialState,
    extraReducers:(builder)=>{ 
        //create
        builder.addCase(createColorAction.pending,(state)=>{
            state.loading = true
        });

        builder.addCase(createColorAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.color = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createColorAction.rejected,(state,action)=>{
            state.loading = false;
            state.color = null;
            state.isAdded = false;
            state.error = action.payload;
        })
        //fetch all categories
        builder.addCase(fetchColorsAction.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchColorsAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.colors = action.payload;
            state.isAdded = true;
        });
        builder.addCase(fetchColorsAction.rejected,(state,action)=>{
            state.loading = false;
            state.colors = null;
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
const colorReducer = colorSlice.reducer;
export default colorReducer;

