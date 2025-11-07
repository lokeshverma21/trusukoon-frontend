import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store/store";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Service, ServiceState } from "@/types/service.types";


/* ===========================================================
   INITIAL STATE
=========================================================== */
const initialState: ServiceState = {
  services: [],
  total: 0,
  loading: false,
  error: null,
  selectedService: null,
  successMessage: null,
};

/* ===========================================================
   ASYNC THUNKS
=========================================================== */

// ✅ Get all services
export const fetchServices = createAsyncThunk<
  { total: number; services: Service[] },
  { search?: string; active?: boolean; page?: number; limit?: number, isAdmin?:boolean },
  { rejectValue: string }
>("services/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const { search, active, page = 1, limit = 20, isAdmin=false } = params || {};
    // ✅ Choose correct endpoint based on role
    const endpoint = isAdmin ? "/service/admin" : "/service";
    const response = await api.get(endpoint, {
      params: { search, active, page, limit },
    });
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch services");
  }
});

// ✅ Get single service by ID
export const fetchServiceById = createAsyncThunk<Service, string, { rejectValue: string }>(
  "services/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/service/${id}`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch service");
    }
  }
);

// ✅ Create service
export const createService = createAsyncThunk<Service, Partial<Service>, { rejectValue: string }>(
  "services/create",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await api.post("/service", serviceData);
      toast.success("Service created successfully!");
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to create service");
      return rejectWithValue(error.response?.data?.message || "Failed to create service");
    }
  }
);

// ✅ Update service
export const updateService = createAsyncThunk<
  Service,
  { id: string; updates: Partial<Service> },
  { rejectValue: string }
>("services/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/service/${id}`, updates);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to update service");
  }
});

// ✅ Toggle service active/inactive
export const toggleServiceStatus = createAsyncThunk<Service, string, { rejectValue: string }>(
  "services/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/service/${id}/toggle`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to toggle service status");
    }
  }
);

// ✅ Delete service
export const deleteService = createAsyncThunk<string, string, { rejectValue: string }>(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/service/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to delete service");
    }
  }
);

/* ===========================================================
   SLICE
=========================================================== */
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServiceMessages(state) {
      state.successMessage = null;
      state.error = null;
    },
    clearSelectedService(state) {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) => {
    // ===== FETCH ALL =====
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
        state.total = action.payload.total;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // ===== FETCH BY ID =====
    builder
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedService = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch service details";
      });

    // ===== CREATE =====
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.unshift(action.payload);
        state.successMessage = "Service created successfully";
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create service";
      });

    // ===== UPDATE =====
    builder
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.services[index] = action.payload;
        state.successMessage = "Service updated successfully";
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update service";
      });

    // ===== TOGGLE STATUS =====
    builder
      .addCase(toggleServiceStatus.fulfilled, (state, action) => {
        const index = state.services.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.services[index] = action.payload;
        state.successMessage = `Service ${action.payload.active ? "activated" : "deactivated"} successfully`;
      })
      .addCase(toggleServiceStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle service status";
      });

    // ===== DELETE =====
    builder
      .addCase(deleteService.fulfilled, (state, action: PayloadAction<string>) => {
        state.services = state.services.filter((s) => s._id !== action.payload);
        state.successMessage = "Service deleted successfully";
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete service";
      });
  },
});

/* ===========================================================
   EXPORTS
=========================================================== */
export const { clearServiceMessages, clearSelectedService } = serviceSlice.actions;
export const selectServiceState = (state: RootState) => state.services;
export default serviceSlice.reducer;
