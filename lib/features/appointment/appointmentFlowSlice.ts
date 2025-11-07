"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppointmentFlowState {
  selectedStaffId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
}

const initialState: AppointmentFlowState = {
  selectedStaffId: null,
  selectedDate: null,
  selectedTime: null,
};

const appointmentFlowSlice = createSlice({
  name: "appointmentFlow",
  initialState,
  reducers: {
    setSelectedStaffId: (state, action: PayloadAction<string | null>) => {
      state.selectedStaffId = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload;
    },
    resetAppointmentFlow: () => initialState,
  },
});

export const {
  setSelectedStaffId,
  setSelectedDate,
  setSelectedTime,
  resetAppointmentFlow,
} = appointmentFlowSlice.actions;

export default appointmentFlowSlice.reducer;
