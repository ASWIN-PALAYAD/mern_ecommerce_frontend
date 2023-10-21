import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categorySlices";
import brandReducer from "../slices/categories/brandSlices";
import colorReducer from "../slices/categories/colorSlices";


//store
const store = configureStore({
    reducer:{
        users: usersReducer,
        products: productReducer,
        categories:categoryReducer,
        brands: brandReducer,
        colors : colorReducer,
    }
});

export default store;