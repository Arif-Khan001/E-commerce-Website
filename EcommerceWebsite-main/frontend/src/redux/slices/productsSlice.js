import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

/* =========================================================
   ASYNC THUNKS
========================================================= */

/*
  Fetch products using filters (collection, size, price, etc.)
  This is used mainly on collection & listing pages
*/
export const fetchProductByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();

      if (collection) query.append("collection", collection);
      if (size) query.append("size", size);
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (sortBy) query.append("sortBy", sortBy);
      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (limit) query.append("limit", limit);

      const response = await axios.get(
        `${API_URL}/api/products?${query.toString()}`
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

/*
  Fetch a single product by ID
  Used on Product Details page
*/
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch product details" }
      );
    }
  }
);

/*
  Update product (USER SIDE – limited use)
  NOTE: renamed to avoid collision with admin updateProduct
*/
export const updateProductUser = createAsyncThunk(
  "products/updateProductUser",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Product update failed" }
      );
    }
  }
);

/*
  Fetch similar products
  Used for "You may also like" section
*/
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/products/similar/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch similar products" }
      );
    }
  }
);

/* =========================================================
   SLICE
========================================================= */

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],              // product listing
    selectedProduct: null,     // product details
    similarProducts: [],       // related products
    loading: false,
    error: null,

    // Filters applied on collection pages
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    },
  },

  reducers: {
    // Update filter state (merge existing + new filters)
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Reset all filters
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },

    // Clear selected product (important on route change)
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.similarProducts = [];
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH PRODUCTS ---------- */
      .addCase(fetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ---------- FETCH PRODUCT DETAILS ---------- */
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ---------- UPDATE PRODUCT (USER) ---------- */
      .addCase(updateProductUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductUser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload;

        // FIXED: findIndex must return a condition
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        // Also update selected product if open
        if (
          state.selectedProduct &&
          state.selectedProduct._id === updatedProduct._id
        ) {
          state.selectedProduct = updatedProduct;
        }
      })
      .addCase(updateProductUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ---------- FETCH SIMILAR PRODUCTS ---------- */
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

/* =========================================================
   EXPORTS
========================================================= */

export const {
  setFilters,
  clearFilters,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
