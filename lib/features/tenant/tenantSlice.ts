import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { RootState } from "@/lib/store/store";
import { AxiosError } from "axios";
import {
  Tenant,
  CreateTenantPayload,
  UpdateTenantPayload,
  TenantStatus,
} from "@/types/tenant.types";

/* ================= THUNKS ================= */

// Fetch tenants
export const fetchTenants = createAsyncThunk<
  Tenant[],
  void,
  { rejectValue: string }
>("tenant/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/platform/tenants");
    return res.data.data as Tenant[];
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to fetch tenants"
    );
  }
});

// Create tenant
export const createTenant = createAsyncThunk<
  Tenant,
  CreateTenantPayload,
  { rejectValue: string }
>("tenant/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/platform/tenants", payload);
    return res.data.data.tenant as Tenant;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to create tenant"
    );
  }
});

// Update tenant
export const updateTenant = createAsyncThunk<
  Tenant,
  UpdateTenantPayload,
  { rejectValue: string }
>("tenant/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/platform/tenants/${id}`, data);
    return res.data.data as Tenant;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to update tenant"
    );
  }
});

// Toggle status
export const toggleTenantStatus = createAsyncThunk<
  { id: string; status: TenantStatus },
  string,
  { rejectValue: string }
>("tenant/toggleStatus", async (id, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/platform/tenants/${id}/toggle`);
    return { id, status: res.data.data.status as TenantStatus };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to toggle tenant status"
    );
  }
});

// Delete tenant
export const deleteTenant = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("tenant/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/platform/tenants/${id}`);
    return id;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to delete tenant"
    );
  }
});

/* ================= SLICE ================= */

interface TenantState {
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantState = {
  tenants: [],
  loading: false,
  error: null,
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch tenants";
      })

      // Create
      .addCase(createTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants.unshift(action.payload);
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create tenant";
      })

      // Update
      .addCase(updateTenant.fulfilled, (state, action) => {
        const idx = state.tenants.findIndex(
          (t) => t._id === action.payload._id
        );
        if (idx !== -1) state.tenants[idx] = action.payload;
      })

      // Toggle
      .addCase(toggleTenantStatus.fulfilled, (state, action) => {
        const tenant = state.tenants.find(
          (t) => t._id === action.payload.id
        );
        if (tenant) tenant.status = action.payload.status;
      })

      // Delete
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.tenants = state.tenants.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export const selectTenants = (state: RootState): TenantState => state.tenant;

export default tenantSlice.reducer;
