"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check, User, DollarSign, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, isSameDay, isToday, isBefore, addMinutes, setHours, setMinutes } from 'date-fns';

interface Service {
  id: string;
  title: string;
  duration: number;
  price: number;
  currency: string;
  description?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  staffId?: string;
  staffName?: string;
}

interface BookingState {
  service: Service | null;
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
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({
    service: null,
    selectedDate: null,
    selectedTime: null,
    clientInfo: {
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const services: Service[] = [
    { id: '1', title: 'Financial Planning', duration: 60, price: 150, currency: 'USD', description: 'Comprehensive financial planning session' },
    { id: '2', title: 'Retirement Planning', duration: 60, price: 200, currency: 'USD', description: 'Plan your retirement with expert advice' },
    { id: '3', title: 'Investment Advice', duration: 60, price: 175, currency: 'USD', description: 'Personalized investment strategy session' },
    { id: '4', title: 'Tax Consultation', duration: 45, price: 125, currency: 'USD', description: 'Tax planning and optimization strategies' },
    { id: '5', title: 'Estate Planning', duration: 90, price: 300, currency: 'USD', description: 'Comprehensive estate planning services' },
    { id: '6', title: 'Business Advisory', duration: 60, price: 250, currency: 'USD', description: 'Strategic business financial advice' }
  ];

  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3;
        slots.push({
          time: timeString,
          available: isAvailable,
          staffId: 'staff_1',
          staffName: isAvailable ? 'Sarah Johnson' : undefined
        });
      }
    }
    return slots;
  };

  useEffect(() => {
    if (bookingState.selectedDate) {
      setAvailableTimeSlots(generateTimeSlots(bookingState.selectedDate));
    }
  }, [bookingState.selectedDate]);

  const handleServiceSelect = (service: Service) => {
    setBookingState(prev => ({ ...prev, service }));
    setCurrentStep(2);
  };

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, new Date().setHours(0, 0, 0, 0))) return;
    setBookingState(prev => ({ ...prev, selectedDate: date, selectedTime: null }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingState(prev => ({ ...prev, selectedTime: time }));
  };

  const handleClientInfoChange = (field: keyof BookingState['clientInfo'], value: string) => {
    setBookingState(prev => ({
      ...prev,
      clientInfo: {
        ...prev.clientInfo,
        [field]: value
      }
    }));
  };

  const handleBooking = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBookingConfirmed(true);
    setLoading(false);
  };

  const renderWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(currentWeekStart, i);
      const isSelected = bookingState.selectedDate && isSameDay(date, bookingState.selectedDate);
      const isPast = isBefore(date, new Date().setHours(0, 0, 0, 0));
      
      days.push(
        <button
          key={i}
          onClick={() => handleDateSelect(date)}
          disabled={isPast}
          className={`
            flex flex-col items-center p-3 rounded-lg border-2 transition-all
            ${isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}
            ${isPast ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span className="text-xs text-gray-500">{format(date, 'EEE')}</span>
          <span className={`text-lg font-semibold ${isSelected ? 'text-emerald-600' : 'text-gray-900'}`}>
            {format(date, 'd')}
          </span>
        </button>
      );
    }
    return days;
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your appointment has been successfully booked.</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                {bookingState.selectedDate && format(bookingState.selectedDate, 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{bookingState.selectedTime}</span>
            </div>
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{bookingState.service?.title}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                ${bookingState.service?.price} {bookingState.service?.currency}
              </span>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-teal-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#6f9b92] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-emerald-50">
            Get expert financial advice from our certified accountants
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${currentStep >= step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}
                  `}
                >
                  {step}
                </div>
                <span className={`ml-2 text-sm ${currentStep >= step ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {step === 1 && 'Service'}
                  {step === 2 && 'Date'}
                  {step === 3 && 'Time'}
                  {step === 4 && 'Details'}
                </span>
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-4 ${currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                      {service.title}
                    </h3>
                    <span className="text-emerald-600 font-bold">
                      ${service.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration} minutes
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Date</h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, -1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {format(currentWeekStart, 'MMMM yyyy')}
                </h3>
                <button
                  onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {renderWeekDays()}
              </div>
            </div>

            {bookingState.selectedDate && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Selected: <span className="font-semibold text-gray-900">
                    {format(bookingState.selectedDate, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Time Selection */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Time</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Available times for {bookingState.selectedDate && format(bookingState.selectedDate, 'EEEE, MMMM d')}
              </p>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`
                      py-3 px-4 rounded-lg font-medium transition-all
                      ${!slot.available 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : bookingState.selectedTime === slot.time
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200'}
                    `}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {bookingState.selectedTime && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Selected: <span className="font-semibold text-gray-900">{bookingState.selectedTime}</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Client Details */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={bookingState.clientInfo.name}
                  onChange={(e) => handleClientInfoChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={bookingState.clientInfo.email}
                  onChange={(e) => handleClientInfoChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={bookingState.clientInfo.phone}
                  onChange={(e) => handleClientInfoChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  value={bookingState.clientInfo.notes}
                  onChange={(e) => handleClientInfoChange('notes', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="Any specific topics you'd like to discuss..."
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{bookingState.service?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {bookingState.selectedDate && format(bookingState.selectedDate, 'MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingState.selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{bookingState.service?.duration} minutes</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">Total:</span>
                  <span className="font-bold text-emerald-600">
                    ${bookingState.service?.price} {bookingState.service?.currency}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleBooking}
                disabled={loading || !bookingState.clientInfo.name || !bookingState.clientInfo.email}
                className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
