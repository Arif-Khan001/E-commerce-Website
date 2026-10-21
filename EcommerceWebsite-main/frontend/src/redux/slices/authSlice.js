import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================================================
   LOAD USER & GUEST DATA FROM LOCAL STORAGE (PERSISTENCE)
========================================================= */

// Load logged-in user (if exists)
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Generate or retrieve guest ID (used for cart before login)
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${Date.now()}`;

// Ensure guestId is always stored
localStorage.setItem("guestId", initialGuestId);

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  user: userFromStorage,   // logged-in user object
  guestId: initialGuestId, // guest identifier
  loading: false,          // global auth loading flag
  error: null,             // auth error message
};

/* =========================================================
   ASYNC THUNKS
========================================================= */

// User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      // Persist user & token
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (err) {
      // Safe error handling (prevents app crash)
      return rejectWithValue(
        err.response?.data || { message: "Login failed" }
      );
    }
  }
);

// User Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Persist user & token after successful registration
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);

/* =========================================================
   SLICE
========================================================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Logout user and reset guest state
    logout: (state) => {
      state.user = null;
      state.error = null;

      // Generate new guest ID after logout
      state.guestId = `guest_${Date.now()}`;

      // Clear stored auth data
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },

    // Manually regenerate guest ID (rare use case)
    generateNewGuestId: (state) => {
      state.guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- LOGIN ---------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      /* ---------- REGISTER ---------- */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

/* =========================================================
   EXPORTS
========================================================= */

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
