import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/check");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/logout");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSuccess = createAsyncThunk(
  "auth/google/success",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/google/success");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleFailure = createAsyncThunk(
  "auth/google/failure",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/google/failed");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put("/auth/update", userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null as any,
  isChecking: false,
  isSignInUp: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isChecking = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isChecking = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isChecking = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(login.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSignInUp = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(register.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSignInUp = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(googleSuccess.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(googleSuccess.fulfilled, (state, action) => {
        state.isSignInUp = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(googleSuccess.rejected, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(googleFailure.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(googleFailure.fulfilled, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(googleFailure.rejected, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isSignInUp = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isSignInUp = false;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
