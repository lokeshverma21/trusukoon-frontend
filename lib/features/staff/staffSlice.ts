import { createSlice, createAsyncThunk, PayloadAction, AnyAction, UnknownAction, isRejected } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "@/lib/store/store"; // adjust path as needed
import api from "@/lib/axiosInstance";

// ✅ Base API URL
const API_URL = `/staff`;

// ===========================================================
// 🧱 Types
// ===========================================================
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "staff";
  avatarUrl?: string;
  timezone?: string;
  meta?: StaffMeta;
}

export interface IStaff {
  _id: string;
  user: IUser;
  services: IService[];
  availability: IAvailabilitySlot[];
  breaks: IBreakSlot[];
  maxAppointmentsPerSlot: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStaffResponse {
  user: IUser;
  staff: IStaff;
}

export interface StaffMeta {
  specialties?: string[];
  qualifications?: string[];
  experienceYears?: number;
  bio?: string;
  notes?: string;
}


export interface IService {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

export interface IAvailabilitySlot {
  weekday: number; // 0 = Sunday, 6 = Saturday
  start: string;   // e.g. "09:00"
  end: string;     // e.g. "17:00"
}

export interface IBreakSlot {
  date?: string;   // Optional specific date
  start: string;
  end: string;
}

export interface StaffState {
  staffList: IStaff[];
  selectedStaff: IStaff | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface UpdateStaffPayload {
  id: string;
  user?: {
    name?: string;
    phone?: string;
    meta?: StaffMeta;
  };
  maxAppointmentsPerSlot?: number;
}

// ===========================================================
// 🧱 Initial State
// ===========================================================
const initialState: StaffState = {
  staffList: [],
  selectedStaff: null,
  loading: false,
  error: null,
  successMessage: null,
};

// ===========================================================
// 🧱 Async Thunks (CRUD Operations)
// ===========================================================

// 🟢 Create new staff
export const createStaff = createAsyncThunk<
  CreateStaffResponse,
  {
    name: string;
    email: string;
    phone: string;
    password: string;
    timezone?: string;
    meta?: StaffMeta;
  },
  { rejectValue: string }
>("staff/createStaff", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(API_URL, payload, {
      withCredentials: true,
    });

    return res.data.data as CreateStaffResponse;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to create staff"
    );
  }
});

// 🟣 Get all staff
export const fetchAllStaff = createAsyncThunk<IStaff[], void, { rejectValue: string }>(
  "staff/fetchAllStaff",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/staff`, { withCredentials: true });
      console.log(res)
      return res.data.data as IStaff[];
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch staff list.");
    }
  }
);

// 🆕 Fetch staff by service ID
export const fetchAllStaffByService = createAsyncThunk<IStaff[], string, { rejectValue: string }>(
  "staff/fetchAllStaffByService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${API_URL}?serviceId=${serviceId}`, { withCredentials: true });
      console.log(res.data)
      return res.data.data as IStaff[];
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch staff for service.");
    }
  }
);


// 🔵 Get staff by ID
export const fetchStaffById = createAsyncThunk<IStaff, string, { rejectValue: string }>(
  "staff/fetchStaffById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${API_URL}/${id}`, { withCredentials: true });
      return res.data.data as IStaff;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch staff details.");
    }
  }
);

// 🟠 Update staff profile
export const updateStaff = createAsyncThunk<
  IStaff,
  UpdateStaffPayload,
  { rejectValue: string }
>(
  "staff/updateStaff",
  async ({ id, user, maxAppointmentsPerSlot }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `${API_URL}/${id}`,
        {
          user,
          maxAppointmentsPerSlot,
        },
        { withCredentials: true }
      );

      return res.data.data as IStaff;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to update staff"
      );
    }
  }
);


// 🟡 Update availability
export const updateAvailability = createAsyncThunk<
  IStaff,
  { id: string; availability: IAvailabilitySlot[] },
  { rejectValue: string }
>("staff/updateAvailability", async ({ id, availability }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`${API_URL}/${id}/availability`, { availability });
    console.log(res.data)
    return res.data.data as IStaff;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to update availability.");
  }
});

// 🔴 Update breaks
export const updateBreaks = createAsyncThunk<
  IStaff,
  { id: string; breaks: IBreakSlot[] },
  { rejectValue: string }
>("staff/updateBreaks", async ({ id, breaks }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`${API_URL}/${id}/breaks`, { breaks });
    return res.data.data as IStaff;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to update breaks.");
  }
});

// ⚫ Delete staff
export const deleteStaff = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("staff/deleteStaff", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to delete staff.");
  }
});

// ===========================================================
// 🧱 Slice
// ===========================================================
const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffError: (state) => {
      state.error = null;
    },
    clearStaffSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE STAFF
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(
        createStaff.fulfilled,
        (state, action: PayloadAction<CreateStaffResponse>) => {
          state.loading = false;
          state.staffList.push(action.payload.staff);
          state.successMessage = "Staff created successfully";
        }
      )
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create staff.";
      })

      // GET ALL STAFF
      .addCase(fetchAllStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch staff list.";
      })

      //GET STAFF BY SERVICE PROVIDED
      .addCase(fetchAllStaffByService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStaffByService.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchAllStaffByService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch staff.";
      })


      // GET STAFF BY ID
      .addCase(fetchStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStaff = action.payload;
      })
      .addCase(fetchStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch staff details.";
      })

      // UPDATE STAFF
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Staff updated successfully";

        const index = state.staffList.findIndex(
          (s) => s._id === action.payload._id
        );

        if (index !== -1) {
          state.staffList[index] = action.payload;
        }

        if (state.selectedStaff?._id === action.payload._id) {
          state.selectedStaff = action.payload;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update staff.";
      })

      // UPDATE AVAILABILITY
      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.staffList.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.staffList[index] = action.payload;

        if (state.selectedStaff?._id === action.payload._id) {
          state.selectedStaff = action.payload;
        }

        state.successMessage = "Availability updated successfully.";
      })

      // UPDATE BREAKS
      .addCase(updateBreaks.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.staffList.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.staffList[index] = action.payload;

        if (state.selectedStaff?._id === action.payload._id) {
          state.selectedStaff = action.payload;
        }
        
        state.successMessage = "Breaks updated successfully.";
      })

      // DELETE STAFF
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = state.staffList.filter((s) => s._id !== action.payload);
        state.successMessage = "Staff deleted successfully.";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
        builder.addMatcher(
        isRejected,
        (state, action: UnknownAction) => {
            state.loading = false;
            // Safely extract payload or error if available
            const payload = (action as { payload?: string }).payload;
            const errorMessage = (action as { error?: { message?: string } }).error?.message;

            state.error = payload || errorMessage || "Something went wrong.";
        }
        );


  },
});

// ===========================================================
// 🧱 Exports
// ===========================================================
export const { clearStaffError, clearStaffSuccess } = staffSlice.actions;
export const selectStaffState = (state: RootState) => state.staff;
export default staffSlice.reducer;

