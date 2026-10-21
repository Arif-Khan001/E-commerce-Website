import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("userToken")}`,
});

/* =========================================================
   ASYNC THUNKS
========================================================= */

// Fetch all products (Admin)
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/products`,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

// Fetch single product (Admin)
export const fetchAdminProductDetails = createAsyncThunk(
  "adminProducts/fetchAdminProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/products/${id}`,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch product details" }
      );
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to create product" }
      );
    }
  }
);

// Update product
export const updateAdminProduct = createAsyncThunk(
  "adminProducts/updateAdminProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to update product" }
      );
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/products/${id}`,
        { headers: getAuthHeader() }
      );
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to delete product" }
      );
    }
  }
);

/* =========================================================
   SLICE
========================================================= */

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ---------- FETCH ONE ---------- */
      .addCase(fetchAdminProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAdminProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ---------- CREATE ---------- */
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.selectedProduct = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export const { clearSelectedProduct } = adminProductSlice.actions;
export default adminProductSlice.reducer;
