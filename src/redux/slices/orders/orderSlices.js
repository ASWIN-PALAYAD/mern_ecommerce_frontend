import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initial state
const initialState = {
  orders: [],
  order: {},
  loading: false,
  error: null,
  isAdded: false,
  stats:null
};

//place order action
export const placeOrderAction = createAsyncThunk(
  "order/place-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        orderItems,
        shippingAddress,
        totalPrice
      } = payload;
      //make request

      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/orders`,
       { orderItems,
        shippingAddress,
        totalPrice},
        config
      );
      return window.open(data?.url)
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all orders
export const fetchAllOrdersAction = createAsyncThunk(
  "orders/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch single order
export const fetchSingleOrderAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/orders/${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get order stats
export const ordersStatsAction = createAsyncThunk(
  "orders/statistics",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update order
export const updateOrderAction = createAsyncThunk(
  "order/update-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        id,
        status
      } = payload;
      //make request

      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}/orders/update/${id}`,
       { 
        status
      },
        config
      );
      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);






//orders slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //place order
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = true;
    });
    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all orders
    builder.addCase(fetchAllOrdersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchAllOrdersAction.rejected, (state, action) => { 
      state.loading = false;
      state.orders = null;
      state.error = action.payload;
    });

    //fetch single order
    builder.addCase(fetchSingleOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchSingleOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    });

    //order stats
    builder.addCase(ordersStatsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ordersStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.isAdded = true;
    });

    builder.addCase(ordersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.stats = null;
      state.error = action.payload;
    });


    //update order
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    });




    
    //reset error
    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate reducer

const orderReducer = orderSlice.reducer;
export default orderReducer;
