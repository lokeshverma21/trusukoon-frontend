// store/features/adminStats/adminStatsSlice.ts
import api from "@/lib/axiosInstance";
import { AdminStatsState, 
  AppointmentTrendItem, 
  OperationalEfficiency, 
  PatientInsights,
  RevenueTrendItem,
  ServiceInsightItem,
  StaffPerformanceItem,
  SummaryStats,
  TodayTomorrowAppointmentItem,
  TodayTomorrowAppointments
} from "@/types/adminStats.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

//
// Types
//

const initialState: AdminStatsState = {
  summary: null,
  appointmentTrends: [],
  revenueTrends: [],
  staffPerformance: [],
  serviceInsights: [],
  patientInsights: null,
  operationalEfficiency: null,
  todayTomorrow: null,

  loading: {
    summary: false,
    appointmentTrends: false,
    revenueTrends: false,
    staffPerformance: false,
    serviceInsights: false,
    patientInsights: false,
    operationalEfficiency: false,
    todayTomorrow: false,
  },
  errors: {
    summary: null,
    appointmentTrends: null,
    revenueTrends: null,
    staffPerformance: null,
    serviceInsights: null,
    patientInsights: null,
    operationalEfficiency: null,
    todayTomorrow: null
  },
};

//
// Helper to normalize API response
//
function extractData<T>(response: unknown): T {
  // server normally returns: { status: number, data: <T>, message: string }
  // but be defensive if server returns data directly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = response as any;
  if (res && typeof res === "object" && "data" in res) {
    return res.data as T;
  }
  return res as T;
}

function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError | Error | unknown;
  if ((error as AxiosError).isAxiosError) {
    const aErr = error as AxiosError;
    // try server message first
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (aErr.response && (aErr.response.data as any)) || {};
    const message =
      (data && (data.message || data.msg || data.error)) ||
      aErr.message ||
      "An unknown network error occurred";
    return String(message);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
}

//
// API base path
//
// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";
const BASE_PATH = `/admin-stats`;

//
// Thunks
//
export const fetchSummary = createAsyncThunk<
  SummaryStats,
  void,
  { rejectValue: string }
>("adminStats/fetchSummary", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/summary`);
    const payload = extractData<{ status?: number; data?: SummaryStats }>(resp.data ?? resp);
    // server might return {status, data, message} where data is the payload
    const data = (payload && (payload.data as SummaryStats)) ?? (payload as unknown as SummaryStats);
    return data;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchTodayTomorrowAppointments = createAsyncThunk<
  TodayTomorrowAppointments,
  void,
  { rejectValue: string }
>("adminStats/fetchTodayTomorrowAppointments", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/today-tomorrow`);
    const payload = extractData<{ data?: TodayTomorrowAppointments }>(resp.data ?? resp);
    const data =
      (payload && payload.data) ??
      (payload as unknown as TodayTomorrowAppointments);
      console.log(resp)
    return data;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});


export const fetchAppointmentTrends = createAsyncThunk<
  AppointmentTrendItem[],
  { range?: "day" | "week" | "month" } | undefined,
  { rejectValue: string }
>("adminStats/fetchAppointmentTrends", async (params, { rejectWithValue }) => {
  try {
    const query = params?.range ? `?range=${params.range}` : "";
    const resp = await api.get(`${BASE_PATH}/appointments-trend${query}`);
    const payload = extractData<AppointmentTrendItem[] | { data: AppointmentTrendItem[] }>(resp.data ?? resp);
    const data = Array.isArray(payload) ? payload : payload.data;
    return data ?? [];
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchRevenueTrends = createAsyncThunk<
  RevenueTrendItem[],
  void,
  { rejectValue: string }
>("adminStats/fetchRevenueTrends", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/revenue-trend`);
    const payload = extractData<RevenueTrendItem[] | { data: RevenueTrendItem[] }>(resp.data ?? resp);
    const data = Array.isArray(payload) ? payload : payload.data;
    return data ?? [];
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchStaffPerformance = createAsyncThunk<
  StaffPerformanceItem[],
  void,
  { rejectValue: string }
>("adminStats/fetchStaffPerformance", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/staff-performance`);
    const payload = extractData<StaffPerformanceItem[] | { data: StaffPerformanceItem[] }>(resp.data ?? resp);
    const data = Array.isArray(payload) ? payload : payload.data;
    return data ?? [];
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchServiceInsights = createAsyncThunk<
  ServiceInsightItem[],
  void,
  { rejectValue: string }
>("adminStats/fetchServiceInsights", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/services-insight`);
    const payload = extractData<ServiceInsightItem[] | { data: ServiceInsightItem[] }>(resp.data ?? resp);
    const data = Array.isArray(payload) ? payload : payload.data;
    return data ?? [];
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchPatientInsights = createAsyncThunk<
  PatientInsights,
  void,
  { rejectValue: string }
>("adminStats/fetchPatientInsights", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/patients-insight`);
    const payload = extractData<{ data?: PatientInsights }>(resp.data ?? resp);
    const data = (payload && payload.data) ?? (payload as unknown as PatientInsights);
    return data;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchOperationalEfficiency = createAsyncThunk<
  OperationalEfficiency,
  void,
  { rejectValue: string }
>("adminStats/fetchOperationalEfficiency", async (_arg, { rejectWithValue }) => {
  try {
    const resp = await api.get(`${BASE_PATH}/efficiency`);
    const payload = extractData<{ data?: OperationalEfficiency }>(resp.data ?? resp);
    const data = (payload && payload.data) ?? (payload as unknown as OperationalEfficiency);
    return data;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

//
// Slice
//
const adminStatsSlice = createSlice({
  name: "adminStats",
  initialState,
  reducers: {
    // local-only helpers if needed
    clearAdminStatsErrors(state) {
      Object.keys(state.errors).forEach((k) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.errors[k] = null;
      });
    },
    resetAdminStats(state) {
      state.summary = null;
      state.appointmentTrends = [];
      state.revenueTrends = [];
      state.staffPerformance = [];
      state.serviceInsights = [];
      state.patientInsights = null;
      state.operationalEfficiency = null;
      state.loading = {
        summary: false,
        appointmentTrends: false,
        revenueTrends: false,
        staffPerformance: false,
        serviceInsights: false,
        patientInsights: false,
        operationalEfficiency: false,
        todayTomorrow: false,
      };
      state.errors = {
        summary: null,
        appointmentTrends: null,
        revenueTrends: null,
        staffPerformance: null,
        serviceInsights: null,
        patientInsights: null,
        operationalEfficiency: null,
        todayTomorrow: null,
      };
    },
  },
  extraReducers: (builder) => {
    // summary
    builder.addCase(fetchSummary.pending, (state) => {
      state.loading.summary = true;
      state.errors.summary = null;
    });
    builder.addCase(fetchSummary.fulfilled, (state, action: PayloadAction<SummaryStats>) => {
      state.loading.summary = false;
      state.summary = action.payload;
      state.errors.summary = null;
    });
    builder.addCase(fetchSummary.rejected, (state, action) => {
      state.loading.summary = false;
      state.errors.summary = action.payload ?? "Failed to fetch summary";
    });
    // today & tomorrow table
    builder.addCase(fetchTodayTomorrowAppointments.pending, (state) => {
      state.loading.todayTomorrow = true;
      state.errors.todayTomorrow = null;
    });
    builder.addCase(
      fetchTodayTomorrowAppointments.fulfilled,
      (state, action: PayloadAction<TodayTomorrowAppointments>) => {
        state.loading.todayTomorrow = false;
        state.todayTomorrow = action.payload;
        state.errors.todayTomorrow = null;
      }
    );
    builder.addCase(fetchTodayTomorrowAppointments.rejected, (state, action) => {
      state.loading.todayTomorrow = false;
      state.errors.todayTomorrow =
        action.payload ?? "Failed to fetch today & tomorrow appointments";
    });

    // appointment trends
    builder.addCase(fetchAppointmentTrends.pending, (state) => {
      state.loading.appointmentTrends = true;
      state.errors.appointmentTrends = null;
      state.appointmentTrends = [];
    });
    builder.addCase(fetchAppointmentTrends.fulfilled, (state, action: PayloadAction<AppointmentTrendItem[]>) => {
      state.loading.appointmentTrends = false;
      state.appointmentTrends = action.payload;
      state.errors.appointmentTrends = null;
    });
    builder.addCase(fetchAppointmentTrends.rejected, (state, action) => {
      state.loading.appointmentTrends = false;
      state.errors.appointmentTrends = action.payload ?? "Failed to fetch appointment trends";
    });

    // revenue trends
    builder.addCase(fetchRevenueTrends.pending, (state) => {
      state.loading.revenueTrends = true;
      state.errors.revenueTrends = null;
      state.revenueTrends = [];
    });
    builder.addCase(fetchRevenueTrends.fulfilled, (state, action: PayloadAction<RevenueTrendItem[]>) => {
      state.loading.revenueTrends = false;
      state.revenueTrends = action.payload;
      state.errors.revenueTrends = null;
    });
    builder.addCase(fetchRevenueTrends.rejected, (state, action) => {
      state.loading.revenueTrends = false;
      state.errors.revenueTrends = action.payload ?? "Failed to fetch revenue trends";
    });

    // staff performance
    builder.addCase(fetchStaffPerformance.pending, (state) => {
      state.loading.staffPerformance = true;
      state.errors.staffPerformance = null;
      state.staffPerformance = [];
    });
    builder.addCase(fetchStaffPerformance.fulfilled, (state, action: PayloadAction<StaffPerformanceItem[]>) => {
      state.loading.staffPerformance = false;
      state.staffPerformance = action.payload;
      state.errors.staffPerformance = null;
    });
    builder.addCase(fetchStaffPerformance.rejected, (state, action) => {
      state.loading.staffPerformance = false;
      state.errors.staffPerformance = action.payload ?? "Failed to fetch staff performance";
    });

    // service insights
    builder.addCase(fetchServiceInsights.pending, (state) => {
      state.loading.serviceInsights = true;
      state.errors.serviceInsights = null;
      state.serviceInsights = [];
    });
    builder.addCase(fetchServiceInsights.fulfilled, (state, action: PayloadAction<ServiceInsightItem[]>) => {
      state.loading.serviceInsights = false;
      state.serviceInsights = action.payload;
      state.errors.serviceInsights = null;
    });
    builder.addCase(fetchServiceInsights.rejected, (state, action) => {
      state.loading.serviceInsights = false;
      state.errors.serviceInsights = action.payload ?? "Failed to fetch service insights";
    });

    // patient insights
    builder.addCase(fetchPatientInsights.pending, (state) => {
      state.loading.patientInsights = true;
      state.errors.patientInsights = null;
    });
    builder.addCase(fetchPatientInsights.fulfilled, (state, action: PayloadAction<PatientInsights>) => {
      state.loading.patientInsights = false;
      state.patientInsights = action.payload;
      state.errors.patientInsights = null;
    });
    builder.addCase(fetchPatientInsights.rejected, (state, action) => {
      state.loading.patientInsights = false;
      state.errors.patientInsights = action.payload ?? "Failed to fetch patient insights";
    });

    // operational efficiency
    builder.addCase(fetchOperationalEfficiency.pending, (state) => {
      state.loading.operationalEfficiency = true;
      state.errors.operationalEfficiency = null;
    });
    builder.addCase(fetchOperationalEfficiency.fulfilled, (state, action: PayloadAction<OperationalEfficiency>) => {
      state.loading.operationalEfficiency = false;
      state.operationalEfficiency = action.payload;
      state.errors.operationalEfficiency = null;
    });
    builder.addCase(fetchOperationalEfficiency.rejected, (state, action) => {
      state.loading.operationalEfficiency = false;
      state.errors.operationalEfficiency = action.payload ?? "Failed to fetch operational efficiency";
    });
  },
});

//
// Exports
//
export const { clearAdminStatsErrors, resetAdminStats } = adminStatsSlice.actions;

export default adminStatsSlice.reducer;

//
// Selectors
//
// NOTE: If your RootState type is defined elsewhere, update the RootState below.
// For easier integration, we type RootState minimally here:
export type RootStateWithAdminStats = { adminStats: AdminStatsState };

export const selectAdminSummary = (state: RootStateWithAdminStats): SummaryStats | null =>
  state.adminStats.summary;

export const selectTodayTomorrowAppointments = (state: RootStateWithAdminStats): TodayTomorrowAppointments | null =>
  state.adminStats.todayTomorrow;

export const selectAppointmentTrends = (state: RootStateWithAdminStats): AppointmentTrendItem[] =>
  state.adminStats.appointmentTrends;

export const selectRevenueTrends = (state: RootStateWithAdminStats): RevenueTrendItem[] =>
  state.adminStats.revenueTrends;

export const selectStaffPerformance = (state: RootStateWithAdminStats): StaffPerformanceItem[] =>
  state.adminStats.staffPerformance;

export const selectServiceInsights = (state: RootStateWithAdminStats): ServiceInsightItem[] =>
  state.adminStats.serviceInsights;

export const selectPatientInsights = (state: RootStateWithAdminStats): PatientInsights | null =>
  state.adminStats.patientInsights;

export const selectOperationalEfficiency = (state: RootStateWithAdminStats): OperationalEfficiency | null =>
  state.adminStats.operationalEfficiency;

export const selectAdminLoading = (state: RootStateWithAdminStats) => state.adminStats.loading;
export const selectAdminErrors = (state: RootStateWithAdminStats) => state.adminStats.errors;
