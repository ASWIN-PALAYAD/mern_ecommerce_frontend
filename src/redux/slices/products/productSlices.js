import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;
      //make request

      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      //form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("brand", brand);

      formData.append("price", price);
      formData.append("totalQty", totalQty);

      sizes.forEach((size) => {
        formData.append("sizes", size);
      });

      colors.forEach((color) => {
        formData.append("colors", color);
      });

      files.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch products action
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async ({url}, { rejectWithValue, getState, dispatch }) => {
    console.log(url);
    try {
      //token authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${url}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch product action
export const fetchProductAction = createAsyncThunk(
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

      const { data } = await axios.get(`${baseURL}/products/${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);





//product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all product
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchProductsAction.rejected, (state, action) => { 
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch product
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
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

const productReducer = productSlice.reducer;
export default productReducer;
