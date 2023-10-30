import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categorySlices";
import brandReducer from "../slices/categories/brandSlices";
import colorReducer from "../slices/categories/colorSlices";
import cartReducer from "../slices/cart/cartSlices";
import couponsReducer from "../slices/coupons/couponSlices";
import orderReducer from "../slices/orders/orderSlices";
import reviewsReducer from "../slices/reviews/reviewSlices";


//store
const store = configureStore({
    reducer:{
        users: usersReducer,
        products: productReducer,
        categories:categoryReducer,
        brands: brandReducer,
        colors : colorReducer,
        carts:cartReducer,
        coupons:couponsReducer,
        orders:orderReducer,
        reviews : reviewsReducer,
    }
});

export default store;