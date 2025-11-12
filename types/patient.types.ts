
export interface PatientSummary {
  _id: string;
  name: string;
  email: string;
  phone: string;
  lastAppointment: string | null;
  totalSessions: number;
  cancellations: number;
  noShows: number;
  totalSpend: number;
}

export interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
}

export interface AppointmentHistoryItem {
  _id: string;
  patient: string;
  staff: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    _id: string;
    name: string;
    price: number;
    duration: number;
  };
  startAt: string;
  endAt: string;
  duration: number;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show" | "rescheduled";
  paymentStatus: "pending" | "paid" | "refund";
  notes: string;
  createdBy: string;
  createdAt: string;
}

export interface PatientStats {
  totalSessions: number;
  totalSpend: number;
  noShows: number;
  cancellations: number;
}

export interface PatientDetails {
  patient: Patient;
  stats: PatientStats;
  history: AppointmentHistoryItem[];
}

export interface PatientSegments {
  new: PatientSummary[];
  active: PatientSummary[];
  atRisk: PatientSummary[];
  lost: PatientSummary[];
  highValue: PatientSummary[];
}

export interface FetchPatientsParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "latest" | "oldest" | "highestSpend" | "mostSessions";
}

export interface PaginatedPatientsResponse {
  patients: PatientSummary[];
  totalPatients: number;
  totalPages: number;
  currentPage: number;
}