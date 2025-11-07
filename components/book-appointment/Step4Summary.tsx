"use client";
import React from "react";
import { Calendar, Clock, User, DollarSign, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createAppointment } from "@/lib/features/appointment/appointmentSlice";
import { BookingState } from "./BookAppointment";
import { toast } from "sonner";
import { RootState } from "@/lib/store/store";

// ✅ Define prop types
interface Step4SummaryProps {
  bookingState: BookingState;
  loading?: boolean;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onBack: () => void;
  onConfirm: () => void;
}

export default function Step4Summary({
  bookingState,
  loading,
  setBookingState,
  onBack,
  onConfirm,
}: Step4SummaryProps) {
    const user = useAppSelector((state: RootState) => state.auth.user);
    // console.log(user)

  const dispatch = useAppDispatch();
  const { loading: appointmentLoading } = useAppSelector(
    (state) => state.appointment
  );

  const { service, staff, selectedDate, selectedTime, clientInfo } = bookingState;

  const handleChange = (field: keyof typeof clientInfo, value: string) => {
    setBookingState((prev) => ({
      ...prev,
      clientInfo: { ...prev.clientInfo, [field]: value },
    }));
  };

  // ✅ Dispatch Redux thunk to create appointment
  const handleBooking = async () => {
    if (!service || !staff || !selectedDate || !selectedTime) {
      toast.error("Missing booking details!");
      return;
    }

    const startAt = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    startAt.setHours(hours, minutes, 0, 0);

    const endAt = new Date(startAt.getTime() + (service.duration || 30) * 60000);

    const payload = {
      patient: user?._id || "",
      staff: staff.user._id,
      service: service._id,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      notes: clientInfo.notes || "",
    };

    try {
      // const resultAction = await dispatch(createAppointment(payload));
      dispatch(createAppointment(payload))
    // console.log(payload)

      // if (createAppointment.fulfilled.match(resultAction)) {
        toast.success("Appointment booked successfully!");
        onConfirm(); // ✅ move to confirmation screen
      // } else {
        // }
      } catch (err) {
      toast.error("Booking failed. Please try again.");
      // toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

      {/* Form Fields */}
      <div className="space-y-4 mb-6">
        {[
          { label: "Full Name", type: "text", key: "name", placeholder: "John Doe" },
          { label: "Email", type: "email", key: "email", placeholder: "john@example.com" },
          { label: "Phone", type: "tel", key: "phone", placeholder: "+91 98765 43210" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              value={clientInfo[field.key as keyof typeof clientInfo] || ""}
              onChange={(e) => handleChange(field.key as keyof typeof clientInfo, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        ))}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={clientInfo.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Any extra information..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-emerald-600" />
          <span>{selectedDate ? format(selectedDate, "PPP") : "No date selected"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-emerald-600" />
          <span>{selectedTime || "No time selected"}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="text-emerald-600" />
          <span>{service?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-emerald-600" />
          <span>
            {service?.price ? `₹${service.price}` : "N/A"} ({service?.duration || 30} mins)
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleBooking}
          disabled={appointmentLoading}
          className={`px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 transition-all ${
            appointmentLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {appointmentLoading && <Loader2 className="animate-spin w-4 h-4" />}
          {appointmentLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
