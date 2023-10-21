import { createAsyncThunk } from "@reduxjs/toolkit";


//reset Error
export const resetErrorAction = createAsyncThunk('resetErr-Action',()=>{
    return {}
});

//reset Success action
export const resetSuccessAction = createAsyncThunk('resetSucess-Action',()=>{
    return {}
})