import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



//initial state
const initialState = {
    cartItems : [],
    loading:false,
    error:null,
    isAdded : false,
    isUpdated : false,
    isDeleted: false
};


// add product to cart 
export const addOrderToCartAction = createAsyncThunk('cart/add-to-cart', async(cartItem)=>{
    try {
        const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ;
        //push to storage
        cartItems.push(cartItem);
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
    } catch (error) {
        
    }
});


// get cart item form local storage
export const getCartItemFromLocalStorage = createAsyncThunk('cart/get-order-items', async()=>{
    try {
        const cartItems = await localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ;
       return cartItems
    } catch (error) {
        
    }
});

// add product to cart 
export const changeOrderQuantityAction = createAsyncThunk('cart/change-item-qtt', async({productId,qty})=>{
    try {
        const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ;
        
        const newCartItems = cartItems?.map((item)=>{
            if(item?._id.toString() === productId?.toString()){
                //get new price
                const newPrice = item?.price * qty;
                item.qty = +qty;
                item.totalPrice = newPrice
            }
            return item
        })
        localStorage.setItem('cartItems',JSON.stringify(newCartItems));
    } catch (error) {
        
    }
});

//removing from cart
export const removeOrderItemAction = createAsyncThunk('cart/removeOrderItem', async(productId)=>{
    try {
        const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ;
        const newItems = cartItems?.filter((item)=>item?._id.toString() !== productId.toString());
        localStorage.setItem('cartItems',JSON.stringify(newItems));
    } catch (error) {
        
    }
});








//cart slice
const cartSlice = createSlice({
    name:"cart",
    initialState,
    extraReducers:(builder)=>{
        //add to cart
        builder.addCase(addOrderToCartAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(addOrderToCartAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.cartItems = action.payload;
            state.isAdded = true;
        });
        builder.addCase(addOrderToCartAction.rejected,(state,action)=>{
            state.loading = false;
            state.cartItems = null;
            state.isAdded = false;
            state.error = action.payload;
        });

        //fetch cart items
        builder.addCase(getCartItemFromLocalStorage.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(getCartItemFromLocalStorage.fulfilled,(state,action)=>{
            state.loading = false;
            state.cartItems = action.payload;
            state.isAdded = true;
        });
        builder.addCase(getCartItemFromLocalStorage.rejected,(state,action)=>{
            state.loading = false;
            state.cartItems = null;
            state.isAdded = false;
            state.error = action.payload;
        })
    }
});

const cartReducer = cartSlice.reducer;
export default cartReducer