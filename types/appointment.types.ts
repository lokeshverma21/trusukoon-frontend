// ==============================
// Appointment Shared Types
// ==============================

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentStatus = 'pending'|'paid'| 'refund';

export interface Appointment {
  _id: string;
  patient: { _id: string; name: string; email: string };
  staff: { _id: string; name: string; email: string; role: string };
  service: { _id: string; name: string; duration: number; price: number };
  startAt: string;
  endAt: string;
  duration: number;
  status: AppointmentStatus;       // ✅ strongly typed
  paymentStatus?: PaymentStatus; 
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface AppointmentPayload {
  patient: string;
  staff: string;
  service: string;
  startAt: string;
  endAt: string;
  notes?: string;
  createdBy?: string;
}

export interface AppointmentUpdatePayload {
  startAt?: string;
  endAt?: string;
  notes?: string;
  status?: AppointmentStatus;
  paymentStatus?: PaymentStatus;
}

export interface FetchAppointmentsParams {
  search?: string;
  status?: string;
  paymentStatus?: string;
}
