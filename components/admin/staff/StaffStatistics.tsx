"use client";
import React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { selectStaffState } from "@/lib/features/staff/staffSlice";
import { Calendar1, CalendarX2, ShieldCheck, Users } from "lucide-react";

interface StaffStatisticCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  variant: string;
}

const StaffStatistics: React.FC = () => {
  const { staffList } = useAppSelector(selectStaffState);

  // === Derived metrics ===
  const totalStaff = staffList.length;

  const activeStaff = staffList.filter((staff) => staff.availability.length > 0).length;

  const today = new Date().toISOString().split("T")[0];
  const onBreakToday = staffList.filter((staff) =>
    staff.breaks.some((b) => b.date?.startsWith(today) || 0)
  ).length;

  const totalServices = staffList.reduce(
    (acc, staff) => acc + staff.services.length,
    0
  );

  const averageMaxAppointments =
    totalStaff > 0
      ? (
          staffList.reduce((acc, s) => acc + s.maxAppointmentsPerSlot, 0) /
          totalStaff
        ).toFixed(1)
      : "0";

  // === Cards ===
  const stats: StaffStatisticCard[] = [
    {
      title: "Total Staff",
      count: totalStaff,
      icon: <Users/>,
      variant: "bg-primary/10 text-primary",
    },
    {
      title: "Active Staff",
      count: activeStaff,
      icon: <ShieldCheck/>,
      variant: "bg-secondary/10 text-secondary",
    },
    {
      title: "On Break Today",
      count: onBreakToday,
      icon: <CalendarX2/>,
      variant: "bg-muted/10 text-muted",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-border bg-card text-card-foreground shadow-sm"
        >
          <div className="p-5">
            <div className="flex justify-between items-center">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center ${stat.variant}`}
              >
                {stat.icon}
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold">{stat.count}</h3>
                <p className="text-muted-foreground text-sm ">
                  {stat.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Optional Extra: Average Max Appointments */}
      <div className="card rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <div className="p-5 flex justify-between items-center">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-accent/10 text-accent">
            <Calendar1 />
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold">{averageMaxAppointments}</h3>
            <p className="text-accent text-sm mt-1">
              Avg. Slot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffStatistics;
