"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Stethoscope,
  CheckCircle,
  TrendingUp,
  IndianRupee,
  Clock,
  UserPlus,
  UserCheck,
  XCircle,
} from "lucide-react";

interface SummaryStats {
  todayAppointments: number;
  tomorrowAppointments: number;
  pendingPayments: number;
}

interface SummaryCardsProps {
  summary: SummaryStats;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({summary}) => {

  const items = [
    {
      title: "Today Appointments",
      value: summary.todayAppointments,
      icon: Stethoscope,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Tomorrow",
      value: summary.tomorrowAppointments,
      icon: CheckCircle,
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Payments",
      value: summary.pendingPayments,
      icon: Clock,
      gradient: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="min-h-fit bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-full mx-auto space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {items.map((item) => (
            <Card
              key={item.title}
              className="border-0 p-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group"
            >
              <div className={`h-1 bg-linear-to-r ${item.gradient}`} />
              <CardContent className="p-3 flex gap-2">
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`${item.bgColor} p-2 rounded-lg group-hover:scale-105 transition-transform duration-200`}
                  >
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                </div>
                <div className="space-y-1 px-4">
                  <p className="text-sm font-medium text-slate-600 leading-tight">
                    {item.title}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">{item.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-linear-to-r from-slate-50 to-slate-100 p-3">
            <h2 className="text-lg font-semibold text-slate-900">Quick Insights</h2>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-xs font-medium text-slate-700">Appointment Rate</p>
                </div>
                <p className="text-xl font-bold text-slate-900">100%</p>
                <p className="text-xs text-slate-500">All appointments confirmed</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-xs font-medium text-slate-700">Patient Growth</p>
                </div>
                <p className="text-xl font-bold text-slate-900">+1</p>
                <p className="text-xs text-slate-500">New patient this month</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <p className="text-xs font-medium text-slate-700">Revenue Status</p>
                </div>
                <p className="text-xl font-bold text-slate-900">₹0</p>
                <p className="text-xs text-slate-500">Pending collection</p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default SummaryCards;
