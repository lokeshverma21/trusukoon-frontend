"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import type { AxiosError } from "axios";
import { Appointment, AppointmentPayload, AppointmentUpdatePayload, FetchAppointmentsParams } from "@/types/appointment.types";

// ==============================
// Types
// ==============================

interface AppointmentState {
  appointmentList: Appointment[];
  currentAppointment: Appointment | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// ==============================
// Initial State
// ==============================

const initialState: AppointmentState = {
  appointmentList: [],
  currentAppointment: null,
  loading: false,
  error: null,
  success: false,
};

// ==============================
// Helper Function for Error
// ==============================

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message || "An unexpected error occurred";
  }
  return "An unexpected error occurred";
};

// ==============================
// Async Thunks
// ==============================

// Get all appointments
export const fetchAppointments = createAsyncThunk<
  Appointment[],
  FetchAppointmentsParams | void,
  { rejectValue: string }
>("appointment/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const response = await api.get("/appointment", { params });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Get appointment by user
export const fetchAppointmentsByUser = createAsyncThunk(
  "appointment/fetchAppointmentsByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appointment/my");
      return response.data.data; // ✅ because data is inside response.data.data
    } catch (error) {
      // return rejectWithValue(getErrorMessage(error));
    }
  }
);


// Get appointment by ID
export const fetchAppointmentById = createAsyncThunk<
  Appointment,
  string,
  { rejectValue: string }
>("appointment/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/appointment/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Create appointment
export const createAppointment = createAsyncThunk<
  Appointment,
  AppointmentPayload,
  { rejectValue: string }
>("appointment/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/appointment", payload);
    console.log("response", response.data)
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Update or reschedule appointment
export const updateAppointment = createAsyncThunk<
  Appointment,
  { id: string; data: AppointmentUpdatePayload },
  { rejectValue: string }
>("appointment/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/appointment/${id}`, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Cancel appointment
export const cancelAppointment = createAsyncThunk<
  Appointment,
  string,
  { rejectValue: string }
>("appointment/cancel", async (id, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/appointment/${id}/cancel`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Delete appointment (admin only)
export const deleteAppointment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("appointment/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/appointment/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ==============================
// Slice
// ==============================

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetAppointmentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all appointments
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.appointmentList = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching appointments";
      });

      // Fetch appointments for logged-in user
    builder
      .addCase(fetchAppointmentsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentsByUser.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.appointmentList = action.payload; // replace with logged-in user's appointments
        state.success = true;
      })
      .addCase(fetchAppointmentsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching your appointments";
      })

    // Fetch by ID
    builder
      .addCase(fetchAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loading = false;
        state.currentAppointment = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching appointment details";
      });

    // Create appointment
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loading = false;
        state.success = true;
        state.appointmentList.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error creating appointment";
      });

    // Update appointment
    builder
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loading = false;
        state.success = true;
        const index = state.appointmentList.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) state.appointmentList[index] = action.payload;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating appointment";
      });

    // Cancel appointment
    builder
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loading = false;
        state.success = true;
        const index = state.appointmentList.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) state.appointmentList[index] = action.payload;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error cancelling appointment";
      });

    // Delete appointment
    builder
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.appointmentList = state.appointmentList.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error deleting appointment";
      });
  },
});

// ==============================
// Export
// ==============================

export const { resetAppointmentState, clearCurrentAppointment } = appointmentSlice.actions;
export const selectAppointmentState = (state: { appointment: AppointmentState }) => state.appointment;

export default appointmentSlice.reducer;
