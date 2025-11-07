import { AppointmentStatus } from "@/types/appointment.types";
import { FC } from "react";

// type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

export const statusColors: Record<AppointmentStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-primary/20 text-primary border-primary/30',
  completed: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
  no_show: 'bg-gray-200 text-gray-700 border-gray-300',
};

export const StatusBadge: FC<{ status: AppointmentStatus }> = ({ status }) => (
  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
    {status.replace('_', ' ')}
  </span>
);
