import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { resetErrorAction, resetSuccessAction } from "../globalActions/globalActions";


const initialState = {
    loading:false,
    category : {},
    categories:[],
    error : null,
    isAdded:false,
    isUpdated:false,
    isDeleted:false
};


//create category action
export const createCategoryAction = createAsyncThunk('category/create', 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        try {
            const {name,file} = payload;
            //form data
            const formData = new FormData();
            formData.append('name',name);
            formData.append('file',file)
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await axios.post(`${baseURL}/categories`,formData,config);
            return data;
            
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch categories actin
export const fetchCategoriesAction = createAsyncThunk('category/fetch All',
    async(payload,{rejectWithValue,getState,dispatch})=>{
        try {
            const {data} = await axios.get(`${baseURL}/categories`);
            // console.log(data);
            return data

        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)





//category slice 
const categorySlice = createSlice({
    name:'categories',
    initialState,
    extraReducers:(builder)=>{
        //create
        builder.addCase(createCategoryAction.pending,(state)=>{
            state.loading = true
        });

        builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.category = action.payload;
            state.isAdded = true;
        });

        builder.addCase(createCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.category = null;
            state.isAdded = false;
            state.error = action.payload;
        })
        //fetch all categories
        builder.addCase(fetchCategoriesAction.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchCategoriesAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.categories = null;
            state.error = action.payload
        });



        //reset err
        builder.addCase(resetErrorAction.pending,(state,action)=>{
            state.error = null
        });
        //reset success
        builder.addCase(resetSuccessAction.pending,(state,action)=>{
            state.isAdded = false;
        })



    }
    
});

//generate reducers
const categoryReducer = categorySlice.reducer;
export default categoryReducer;

