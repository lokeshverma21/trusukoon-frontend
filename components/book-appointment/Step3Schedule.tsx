"use client";
import React, { useEffect, useState } from "react";
import { format, addMinutes, isSameDay, isBefore } from "date-fns";
import { Clock } from "lucide-react";
import { IStaff } from "@/lib/features/staff/staffSlice";
import { BookingState } from "./BookAppointment";

interface Props {
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onNext: () => void;
  onBack: () => void;
  setAvailableTimeSlots: React.Dispatch<
    React.SetStateAction<{ time: string; available: boolean }[]>
  >;
  availableTimeSlots: { time: string; available: boolean }[];
}

export default function Step3Schedule({
  bookingState,
  setBookingState,
  onNext,
  onBack,
  availableTimeSlots,
  setAvailableTimeSlots,
}: Props) {
  const [selectedTime, setSelectedTime] = useState<string | null>(
    bookingState.selectedTime
  );

  const staff = bookingState.staff as IStaff | null;
  const selectedDate = bookingState.selectedDate;

  // 🧮 Generate time slots
useEffect(() => {
  if (!staff || !selectedDate || !bookingState.service) return;

  const weekday = selectedDate.getDay();
  const workingDay = staff.availability?.find((a) => a.weekday === weekday);
  if (!workingDay) {
    setAvailableTimeSlots([]);
    return;
  }

  // Extract service info
  const service = bookingState.service;
  const duration = service.duration || 30; // minutes
  const bufferBefore = service.bufferBefore || 0;
  const bufferAfter = service.bufferAfter || 0;

  // Calculate actual slot length (including buffer)
  const totalSlotLength = duration + bufferBefore + bufferAfter;

  const [startHour, startMin] = workingDay.start.split(":").map(Number);
  const [endHour, endMin] = workingDay.end.split(":").map(Number);

  const startTime = new Date(selectedDate);
  startTime.setHours(startHour, startMin, 0, 0);

  const endTime = new Date(selectedDate);
  endTime.setHours(endHour, endMin, 0, 0);

  const breaks =
    staff.breaks?.filter(
      (b) =>
        format(new Date(b.date || ""), "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
    ) || [];

  const now = new Date();
  const slots: { time: string; available: boolean }[] = [];

  let current = new Date(startTime);

  while (current < endTime) {
    const nextSlotEnd = addMinutes(current, totalSlotLength);

    // ❌ Skip if slot extends beyond working hours
    if (nextSlotEnd > endTime) break;

    const slotTime = format(current, "HH:mm");

    // ❌ Check if slot overlaps with a break
    const isInBreak = breaks.some((b) => {
      const breakStart = new Date(selectedDate);
      const breakEnd = new Date(selectedDate);
      const [bStartHour, bStartMin] = b.start.split(":").map(Number);
      const [bEndHour, bEndMin] = b.end.split(":").map(Number);
      breakStart.setHours(bStartHour, bStartMin, 0, 0);
      breakEnd.setHours(bEndHour, bEndMin, 0, 0);
      return current < breakEnd && nextSlotEnd > breakStart; // overlap
    });

    // ❌ Skip past times if same-day
    const isPast = isSameDay(selectedDate, now) && isBefore(nextSlotEnd, now);

    const available = !isInBreak && !isPast;

    slots.push({ time: slotTime, available });

    // Move to next potential slot (back-to-back)
    current = addMinutes(current, totalSlotLength);
  }

  setAvailableTimeSlots(slots);
}, [staff, selectedDate, bookingState.service, setAvailableTimeSlots]);


  const handleSelect = (time: string) => {
    setSelectedTime(time);
    setBookingState((prev) => ({ ...prev, selectedTime: time }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Time</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          Available times for{" "}
          {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "—"}
        </p>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {availableTimeSlots.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center py-4">
              No available times for this day.
            </p>
          ) : (
            availableTimeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleSelect(slot.time)}
                disabled={!slot.available}
                className={`py-3 px-4 rounded-lg font-medium transition-all
                  ${
                    !slot.available
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedTime === slot.time
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200"
                  }`}
              >
                {slot.time}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTime}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
            selectedTime
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
