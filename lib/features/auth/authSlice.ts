import api from "@/lib/axiosInstance";
import { ApiErrorResponse } from "@/types";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

/* ===========================================================
   @section  API Base
=========================================================== */
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/* ===========================================================
   @section  Types
=========================================================== */
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "patient" | "staff" | "admin";
  timezone: string;
  googleCalendar?: { connected: boolean };
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: "staff" | "admin" | "patient";
  timezone?: string;
}

interface UpdateUserInput {
  id: string;
  name?: string;
  phone?: string;
  avatarUrl?: string;
  timezone?: string;
  meta?: Record<string, unknown>;
  role?: "staff" | "admin" | "patient";
}

interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

/* ===========================================================
   @section  Async Thunks
=========================================================== */

// ✅ Register new user (Admin or self)
export const registerUser = createAsyncThunk<
  User, // success return type
  RegisterInput, // input type
  { rejectValue: string } // error
>("auth/registerUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ data: User }>(
      `${API_URL}/user/register`,
      formData,
      { withCredentials: true }
    );

    toast.success("User Registerd successfully!!")
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "User registration failed.";
      toast.error(message)
    return rejectWithValue(message);
  }
});

// ✅ Login user
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ data: LoginResponse }>(
      `${API_URL}/user/login`,
      credentials
    );
    toast.success("User logged In successfully!!")
    return response.data.data.user;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "Login failed. Please try again.";
      toast.error(message)
    return rejectWithValue(message);
  }
});

// ✅ Get current profile
export const fetchProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<{ data: User }>(
      `${API_URL}/user/me`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch profile.";
    return rejectWithValue(message);
  }
});

// ✅ Update user (Admin or self)
export const updateUser = createAsyncThunk<
  User,
  UpdateUserInput,
  { rejectValue: string }
>("auth/updateUser", async (data, { rejectWithValue }) => {
  try {
    const { id, ...payload } = data;
    const response = await axios.patch<{ data: User }>(
      `${API_URL}/user/${id}`,
      payload,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "User update failed.";
    return rejectWithValue(message);
  }
});

// ✅ Get all users (Admin only)
export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("auth/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<{ data: User[] }>(
      `${API_URL}/user`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch users.";
    return rejectWithValue(message);
  }
});

// ✅ Delete user (Admin only)
export const deleteUser = createAsyncThunk<
  string, // returning deleted user ID
  string, // input: user ID
  { rejectValue: string }
>("auth/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await api.delete<{ data: User }>(
      `${API_URL}/user/${userId}`,
      { withCredentials: true }
    );
    return userId;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "User deletion failed.";
    return rejectWithValue(message);
  }
});

// ✅ Logout user
export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await axios.post(
      `${API_URL}/user/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data?.message || "Logout failed.";
    return rejectWithValue(message);
  }
});

/* ===========================================================
   @section  Slice
=========================================================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // === Register ===
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";
      });

    // === Login ===
    builder
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
        state.error = action.payload || "Login failed.";
      });

    // === Fetch Profile ===
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch profile.";
      });

    // === Update User ===
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || "User update failed.";
      });

    // === Get All Users ===
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload || "Failed to load users.";
      });

    // === Delete User ===
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete user.";
      });

    // === Logout ===
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.users = [];
      state.error = null;
    });
  },
});

/* ===========================================================
   @section  Exports
=========================================================== */
export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
