// /types/adminStats.types.ts

// ===========================
// 📊 Admin Stats Types
// ===========================

// Summary of all dashboard metrics
export interface SummaryStats {
  totalAppointments: number;
  confirmedToday: number;
  completedMonth: number;
  cancelledCount: number;
  noShowCount: number;
  totalRevenue: number;
  pendingPayments: number;
  newPatients: number;
  activeStaff: number;
}

// Daily/weekly/monthly appointment trend item
export interface AppointmentTrendItem {
  _id: string; // date string "YYYY-MM-DD"
  total: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

// Monthly revenue trend item
export interface RevenueTrendItem {
  _id: string; // month string "YYYY-MM"
  totalRevenue: number;
}

// Staff-wise performance metrics
export interface StaffPerformanceItem {
  staffId: string;
  staffName: string;
  totalAppointments: number;
  completed: number;
  cancelled: number;
  noShow: number;
  completionRate: number; // 0..1
}

// Service-wise booking & revenue metrics
export interface ServiceInsightItem {
  _id: string;
  name: string;
  totalBookings: number;
  completed: number;
  cancelled: number;
  totalRevenue: number;
  avgDuration: number;
}

// Patient demographic insights
export interface PatientInsights {
  totalPatients: number;
  returningPatients: number;
  newPatients: number;
  returningRate: number; // percent (0..100)
}

// Operational KPI metrics
export interface OperationalEfficiency {
  avgLeadTimeHours?: number;
  avgDurationMinutes?: number;
  totalNoShow?: number;
  totalCancelled?: number;
  busiestDay?: number; // 1..7 (Mongo $dayOfWeek)
}

// ===========================
// 🧱 Redux State Type
// ===========================
export interface AdminStatsState {
  summary: SummaryStats | null;
  appointmentTrends: AppointmentTrendItem[];
  revenueTrends: RevenueTrendItem[];
  staffPerformance: StaffPerformanceItem[];
  serviceInsights: ServiceInsightItem[];
  patientInsights: PatientInsights | null;
  operationalEfficiency: OperationalEfficiency | null;

  loading: {
    summary: boolean;
    appointmentTrends: boolean;
    revenueTrends: boolean;
    staffPerformance: boolean;
    serviceInsights: boolean;
    patientInsights: boolean;
    operationalEfficiency: boolean;
  };

  errors: {
    summary?: string | null;
    appointmentTrends?: string | null;
    revenueTrends?: string | null;
    staffPerformance?: string | null;
    serviceInsights?: string | null;
    patientInsights?: string | null;
    operationalEfficiency?: string | null;
  };
}

// ===========================
// 🧭 Root Selector Type Helper
// ===========================
export type RootStateWithAdminStats = {
  adminStats: AdminStatsState;
};
