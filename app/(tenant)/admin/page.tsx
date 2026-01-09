"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchSummary,
  fetchAppointmentTrends,
  fetchRevenueTrends,
  fetchStaffPerformance,
  fetchServiceInsights,
  fetchOperationalEfficiency,
  selectAdminSummary,
  selectAppointmentTrends,
  selectRevenueTrends,
  selectStaffPerformance,
  selectServiceInsights,
  selectOperationalEfficiency,
  selectAdminLoading,
} from "@/lib/features/adminStats/adminStatsSlice";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SummaryCards from "@/components/admin/dashboard/SummaryCards";
import AppointmentTrendChart from "@/components/admin/dashboard/AppointmentTrendChart";
import RevenueTrendChart from "@/components/admin/dashboard/RevenueTrendChart";
import StaffPerformanceChart from "@/components/admin/dashboard/StaffPerformanceChart";
import ServiceInsightsChart from "@/components/admin/dashboard/ServiceInsightsChart";
import OperationalSnapshot from "@/components/admin/dashboard/OperationalSnapshot";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb";
import withRoleGuard from "@/lib/withRoleGuard";
import Loader from "@/components/Loader";
import TodayTomorrowTable from "@/components/admin/dashboard/TodayTomorrowTable";

const AdminDashboardPage = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectAdminSummary);
  const appointmentTrends = useAppSelector(selectAppointmentTrends);
  const revenueTrends = useAppSelector(selectRevenueTrends);
  const staffPerformance = useAppSelector(selectStaffPerformance);
  const serviceInsights = useAppSelector(selectServiceInsights);
  const operationalEfficiency = useAppSelector(selectOperationalEfficiency);
  const loading = useAppSelector(selectAdminLoading);

  const [range, setRange] = useState<"day" | "week" | "month">("week");

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchAppointmentTrends({ range }));
    dispatch(fetchRevenueTrends());
    dispatch(fetchStaffPerformance());
    dispatch(fetchServiceInsights());
    dispatch(fetchOperationalEfficiency());
  }, [dispatch, range]);

  const isLoadingAll =
    loading.summary &&
    loading.appointmentTrends &&
    loading.revenueTrends &&
    loading.staffPerformance &&
    loading.serviceInsights &&
    loading.operationalEfficiency;

  if (isLoadingAll) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-[80vh] text-muted-foreground">
        <Loader /> Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title="Dashboard"
        name="Dashboard"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Dashboard" },
        ]}
      />
      {/* 🔹 Summary Cards */}
      {summary && <SummaryCards  summary={summary} />}

        {/* <div className="grid grid-cols-1 md:grid-cols-2"> */}
          <TodayTomorrowTable/>
        {/* </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🔹 Appointment Trends */}
        <Card className="p-4">
          <AppointmentTrendChart
            data={appointmentTrends}
            range={range}
            onRangeChange={setRange}
            loading={loading.appointmentTrends}
          />
        </Card>

        {/* 🔹 Revenue Trend */}
        <Card className="p-4">
          <RevenueTrendChart data={revenueTrends} loading={loading.revenueTrends} />
        </Card>

        {/* 🔹 Staff Performance */}
        {/* <Card className="p-4 md:col-span-2">
          <StaffPerformanceChart data={staffPerformance} loading={loading.staffPerformance} />
        </Card> */}

        {/* 🔹 Service Insights */}
        {/* <Card className="p-4">
          <ServiceInsightsChart data={serviceInsights} loading={loading.serviceInsights} />
        </Card> */}

        {/* 🔹 Operational Snapshot */}
        {/* <Card className="p-4">
          <OperationalSnapshot data={operationalEfficiency} loading={loading.operationalEfficiency} />
        </Card> */}
      </div>
    </div>
  );
};

export default withRoleGuard(AdminDashboardPage,["admin"]);

