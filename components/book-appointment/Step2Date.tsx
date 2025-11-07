"use client";

import React, { useEffect, useState } from "react";
import { addDays, addWeeks, format, isBefore, isSameDay, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchStaffById } from "@/lib/features/staff/staffSlice";
import { setSelectedDate } from "@/lib/features/appointment/appointmentFlowSlice"; 
import { BookingState } from "./BookAppointment";

interface Props {
  bookingState: BookingState;
  onNext: () => void;
  onBack: () => void;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
}

export default function Step2Date({ bookingState, onNext, onBack, setBookingState }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedStaff, loading } = useSelector((state: RootState) => state.staff);
  const { selectedDate } = useSelector((state: RootState) => state.appointmentFlow);

  const staffId = bookingState.staff?._id;
  const today = startOfDay(new Date());

  // 🗓️ Initial week start (Monday)
  const getWeekStart = () => {
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart());

  // 🔄 Fetch staff availability
  useEffect(() => {
    if (!staffId) return; // 🧩 No staff selected yet
    if (!selectedStaff || selectedStaff._id !== staffId) {
      dispatch(fetchStaffById(staffId));
    }
  }, [dispatch, staffId, selectedStaff]);

  // 🟢 Select Date
  const handleDateSelect = (date: Date) => {
    const dateStart = startOfDay(date);
    if (isBefore(dateStart, today)) return; // ❌ no past bookings

    setBookingState(prev => ({ ...prev, selectedDate: dateStart }));
    dispatch(setSelectedDate(dateStart.toISOString()));
  };

  // 🧠 Check staff availability
  const isAvailable = (date: Date) => {
    if (!selectedStaff?.availability?.length) return false;
    const weekday = date.getDay();

    const isWorkingDay = selectedStaff.availability.some(a => a.weekday === weekday);
    if (!isWorkingDay) return false;

    const dateStr = format(date, "yyyy-MM-dd");
    const hasFullBreak = selectedStaff.breaks?.some(
      b =>
        format(new Date(b?.date || ""), "yyyy-MM-dd") === dateStr &&
        b.start === "00:00" &&
        b.end === "23:59"
    );

    return !hasFullBreak;
  };

  // 📆 Render Weekdays
  const renderWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(currentWeekStart, i);
      const past = isBefore(startOfDay(date), today);
      const available = isAvailable(date);
      const selected = selectedDate && isSameDay(new Date(selectedDate), date);

      days.push(
        <button
          key={i}
          disabled={!available || past}
          onClick={() => handleDateSelect(date)}
          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center
            ${
              selected
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : available && !past
                ? "border-gray-200 hover:border-emerald-300"
                : "border-gray-200 opacity-40 cursor-not-allowed"
            }`}
        >
          <span className="text-xs text-gray-500">{format(date, "EEE")}</span>
          <span className="block text-lg font-semibold">{format(date, "d")}</span>
        </button>
      );
    }
    return days;
  };

  // ⬅️➡️ Week Navigation (no past weeks)
  const handlePrevWeek = () => {
    const prevWeek = addWeeks(currentWeekStart, -1);
    if (isBefore(prevWeek, today)) return;
    setCurrentWeekStart(prevWeek);
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Select a Date</h2>

      {loading ? (
        <p className="text-gray-500">Loading staff availability...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevWeek}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold">{format(currentWeekStart, "MMMM yyyy")}</h3>
            <button onClick={handleNextWeek}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">{renderWeekDays()}</div>

          <div className="flex justify-end gap-4">
            <button onClick={onBack} className="px-6 py-2 border rounded-lg">
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!selectedDate}
              className={`px-6 py-2 rounded-lg text-white ${
                selectedDate
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
