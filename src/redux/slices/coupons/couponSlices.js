import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create coupon action
export const createCouponAction = createAsyncThunk(
  "coupons/create",
  async (
    { code, discount, startDate, endDate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/coupons`,
        { code, discount, startDate, endDate },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all coupons
export const fetchCouponsAction = createAsyncThunk(
  "coupons/fetch-All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/coupons`);
      return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);

    }
  }
);

//fetch single coupons
export const fetchSingleCouponAction = createAsyncThunk(
    "coupons/single",
    async (code, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseURL}/coupons/single?code=${code}`, {code});
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);

      }

    }
  );


  //update coupon action
export const updateCouponAction = createAsyncThunk(
  "coupons/update",
  async (
    { code, discount, startDate, endDate,id },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/coupons/update/${id}`,
        { code, discount, startDate, endDate },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete action
export const deleteCouponAction = createAsyncThunk(
  "coupons/delete",
  async ({id}, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/coupons/delete/${id}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);

    }

  }
);









//slices

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all coupons
    builder.addCase(fetchCouponsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload;
    });
    builder.addCase(fetchCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = null;
      state.error = action.payload;
    });

    //fetch single coupon
    builder.addCase(fetchSingleCouponAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchSingleCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      });
      builder.addCase(fetchSingleCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.coupon = null;
        state.error = action.payload;
      });

      //update
    builder.addCase(updateCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isUpdated = false;
      state.error = action.payload;
    });


       //delete
       builder.addCase(deleteCouponAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = true;
      });
      builder.addCase(deleteCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.isDeleted = false;
        state.error = action.payload;
      });




    //reset err
    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

const couponsReducer = couponsSlice.reducer;
export default couponsReducer;
