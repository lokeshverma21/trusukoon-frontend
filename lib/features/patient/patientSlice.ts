import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { RootState } from "@/lib/store/store";
import { AxiosError } from "axios";
import { PatientDetails, FetchPatientsParams,PaginatedPatientsResponse, PatientSegments, PatientSummary } from "@/types/patient.types";

// ==============================
// API Thunks
// ==============================

export const fetchPatientsList = createAsyncThunk<
  PaginatedPatientsResponse,
  FetchPatientsParams | void,
  { rejectValue: string }
>("patients/fetchList", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.search) query.append("search", params.search);
    if (params?.sort) query.append("sort", params.sort);

    const res = await api.get(`/patient?${query.toString()}`);
    return res.data.data as PaginatedPatientsResponse;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch patients");
  }
});

export const fetchPatientDetails = createAsyncThunk<
  PatientDetails,
  string,
  { rejectValue: string }
>("patients/fetchDetails", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/patient/${id}`);
    return res.data.data as PatientDetails;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch patient details");
  }
});

export const fetchPatientSegments = createAsyncThunk<
  PatientSegments,
  void,
  { rejectValue: string }
>("patients/fetchSegments", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/patient/segments");
    return res.data.data as PatientSegments;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch patient segments");
  }
});

// ==============================
// Slice
// ==============================

interface PatientsState {
  list: PatientSummary[];
  totalPatients: number;
  totalPages: number;
  currentPage: number;
  details: PatientDetails | null;
  segments: PatientSegments | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  list: [],
  totalPatients: 0,
  totalPages: 0,
  currentPage: 1,
  details: null,
  segments: null,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearPatientDetails: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchPatientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientsList.fulfilled, (state, action: PayloadAction<PaginatedPatientsResponse>) => {
        state.loading = false;
        state.list = action.payload.patients;
        state.totalPatients = action.payload.totalPatients;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPatientsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patients";
      })
      // Fetch Details
      .addCase(fetchPatientDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientDetails.fulfilled, (state, action: PayloadAction<PatientDetails>) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPatientDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patient details";
      })
      // Fetch Segments
      .addCase(fetchPatientSegments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientSegments.fulfilled, (state, action: PayloadAction<PatientSegments>) => {
        state.loading = false;
        state.segments = action.payload;
      })
      .addCase(fetchPatientSegments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patient segments";
      });
  },
});

export const { clearPatientDetails } = patientSlice.actions;
export const selectPatients = (state: RootState) => state.patients;
export default patientSlice.reducer;
