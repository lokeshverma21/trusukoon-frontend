"use client";
import React, { useState, useEffect } from "react";
import { startOfWeek, addWeeks } from "date-fns";
import { Check } from "lucide-react";
import Step1Service from "./Step1Service";
import Step2Date from "./Step2Date";
import Step3Schedule from "./Step3Schedule";
import Step4Summary from "./Step4Summary";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchServices } from "@/lib/features/service/serviceSlice";
import { IStaff } from "@/lib/features/staff/staffSlice";
import { Service } from "@/types/service.types";


export interface TimeSlot {
  time: string;
  available: boolean;
  staffId?: string;
  staffName?: string;
}

export interface BookingState {
  service: Service | null;
  staff?: IStaff | null; 
  selectedDate: Date | null;
  selectedTime: string | null;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
}

export default function BookAppointment() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { services, loading } = useAppSelector((state: RootState) => state.services);

  useEffect(() => {
    dispatch(fetchServices({}));
  }, [dispatch]);

  const [currentStep, setCurrentStep] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({
    service: null,
    selectedDate: null,
    selectedTime: null,
    clientInfo: { name: "", email: "", phone: "", notes: "" },
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const serviceList: Service[] = services.map((s) => ({
    _id: s._id,
    name: s.name,
    duration: s.duration,
    price: s.price,
    currency: "₹",
    description: s.description,
    bufferAfter: s.bufferAfter,
    bufferBefore: s.bufferBefore,
    active: s.active,
    createdAt: s.createdAt
  }));



  // ------------------------
  // Simulated API call
  // ------------------------
  const handleBooking = async () => {
    // setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setBookingConfirmed(true);
    // setLoading(false);
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="mx-auto w-20 h-20 bg-emerald-100 flex items-center justify-center rounded-full mb-4">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${
                    currentStep >= step
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    currentStep >= step ? "text-emerald-600" : "text-gray-500"
                  }`}
                >
                  {["Service", "Date", "Time", "Details"][step - 1]}
                </span>
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    currentStep > step ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Steps */}
        {currentStep === 1 && (
          <Step1Service
            services={serviceList}
            loading={loading}
            onSelect={(service, staff) => {
            setBookingState((prev) => ({
              ...prev, // ✅ keep old state values
              service,
              staff,
            }));
            setCurrentStep(2);
          }}
          />

        )}
        {currentStep === 2 && (
          <Step2Date
            // staffId={bookingState.staff?._id || ""}
            bookingState={bookingState}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            setBookingState={setBookingState}
          />
        )}

        {currentStep === 3 && (
          <Step3Schedule
            bookingState={bookingState}
            availableTimeSlots={availableTimeSlots}
            setAvailableTimeSlots={setAvailableTimeSlots}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
            setBookingState={setBookingState}
          />
        )}
        {currentStep === 4 && (
          <Step4Summary
            bookingState={bookingState}
            loading={loading}
            onBack={() => setCurrentStep(3)}
            onConfirm={handleBooking}
            setBookingState={setBookingState}
          />
        )}
      </div>
    </div>
  );
}


// {currentStep === 3 && (
//           <Step3Schedule
//             availableTimeSlots={availableTimeSlots}
//             selectedDate={bookingState.selectedDate}
//             selectedTime={bookingState.selectedTime}
//             onTimeSelect={handleTimeSelect}
//             onBack={() => setCurrentStep(2)}
//             onContinue={() => setCurrentStep(4)}
//           />
//         )}

//         {currentStep === 4 && (
//           <Step4Summary
//             service={bookingState.service}
//             selectedDate={bookingState.selectedDate}
//             selectedTime={bookingState.selectedTime}
//             clientInfo={bookingState.clientInfo}
//             loading={loading}
//             onChange={handleClientInfoChange}
//             onBack={() => setCurrentStep(3)}
//             onConfirm={handleBooking}
//           />
//         )}