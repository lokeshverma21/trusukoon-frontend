"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchSummary,
  fetchAppointmentTrends,
  fetchRevenueTrends,
  fetchStaffPerformance,
  fetchServiceInsights,
  fetchPatientInsights,
  fetchOperationalEfficiency,
} from "@/lib/features/adminStats/adminStatsSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Users, Activity, Clock, Wallet } from "lucide-react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import SummaryCard from "./SummaryCards";
import InsightCard from "./InsightCard";
import Metric from "./Metric";
import Loader from "@/components/Loader";

// Lazy load ApexCharts to prevent SSR errors
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// ==============================
// Page Component
// ==============================
export default function ReportsPage() {
  const dispatch = useAppDispatch();

  const {
    summary,
    appointmentTrends,
    revenueTrends,
    staffPerformance,
    serviceInsights,
    patientInsights,
    operationalEfficiency,
    loading,
  } = useAppSelector((state) => state.adminStats);

  // Fetch all data once
  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchAppointmentTrends({ range: "month" }));
    dispatch(fetchRevenueTrends());
    dispatch(fetchStaffPerformance());
    dispatch(fetchServiceInsights());
    dispatch(fetchPatientInsights());
    dispatch(fetchOperationalEfficiency());
  }, [dispatch]);

  const isLoading = Object.values(loading).some(Boolean);

  // ===========================
  // Chart Configs
  // ===========================
  const appointmentTrendChart = {
    series: [
      appointmentTrends.reduce((sum, i) => sum + i.completed, 0),
      appointmentTrends.reduce((sum, i) => sum + i.cancelled, 0),
      appointmentTrends.reduce((sum, i) => sum + i.total - (i.completed + i.cancelled), 0),
    ],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Completed", "Cancelled", "Pending"],
      colors: ["#2ABBB1", "#dc2626", "#facc15"],
      legend: {
        position: "bottom",
      },
      tooltip: {
        y: { formatter: (val: number) => `${val} appointments` },
      },
      dataLabels: { enabled: true },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                formatter: () =>
                  appointmentTrends.reduce((sum, i) => sum + i.total, 0).toString(),
              },
            },
          },
        },
      },
    } as ApexOptions,
  };


  const revenueTrendChart = {
    series: [{ name: "Revenue", data: revenueTrends.map((r) => r.totalRevenue) }],
    options: {
      chart: { type: "area", toolbar: { show: false } },
      xaxis: { categories: revenueTrends.map((r) => r._id) },
      fill: { type: "gradient" },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      tooltip: { y: { formatter: (val: number) => `₹${val}` } },
    } as ApexOptions,
  };

  const staffPerformanceChart = {
    series: [
      {
        name: "Completion Rate",
        data: staffPerformance.map((s) => Number((s.completionRate * 100).toFixed(2))),
      },
    ],
    options: {
      chart: { type: "bar", toolbar: { show: false } },
      xaxis: { categories: staffPerformance.map((s) => s.staffName) },
      plotOptions: { bar: { distributed: true, borderRadius: 0 } },
      tooltip: { y: { formatter: (val: number) => `${val}%` } },
    }as ApexOptions,
  };

  const serviceInsightsChart = {
    series: [
      {
        name: "Bookings",
        data: serviceInsights.map((s) => s.totalBookings),
      },
    ],
    options: {
      chart: { type: "bar", toolbar: { show: false } },
      xaxis: { categories: serviceInsights.map((s) => s.name) },
      colors: ["#2563eb"],
      plotOptions: { bar: { horizontal: false, borderRadius: 0 } },
      tooltip: { y: { formatter: (val: number) => `${val} bookings` } },
    } as ApexOptions,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-[80vh] text-muted-foreground">
        <Loader /> Loading reports...
      </div>
    );
  }

  // ==============================
  // Page UI
  // ==============================
  return (
    <>
    <div className="space-y-6 pb-10">
      <Separator />
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Insights</h1>
        <p className="text-muted-foreground">
          Visual analytics and operational data at a glance
        </p>
      </div> */}


      {/* ===== Summary Section ===== */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Appointments"
            value={summary.totalAppointments}
            icon={<Activity className="h-5 w-5 text-blue-500" />}
          />
          <SummaryCard
            title="Total Revenue"
            value={`₹${summary.totalRevenue.toLocaleString()}`}
            icon={<Wallet className="h-5 w-5 text-green-500" />}
          />
          <SummaryCard
            title="New Patients (Month)"
            value={summary.newPatients}
            icon={<Users className="h-5 w-5 text-purple-500" />}
          />
          <SummaryCard
            title="Active Staff"
            value={summary.activeStaff}
            icon={<Clock className="h-5 w-5 text-orange-500" />}
          />
        </div>
      )}

      {/* ===== Charts Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <InsightCard
          title="Appointment Trends"
          description="Completed, cancelled, and pending overview"
        >
          <Chart
            type="donut"
            options={appointmentTrendChart.options}
            series={appointmentTrendChart.series}
            height={300}
          />
        </InsightCard>


        <InsightCard
          title="Revenue Trends"
          description="Monthly revenue performance"
        >
          <Chart
            type="area"
            options={revenueTrendChart.options}
            series={revenueTrendChart.series}
            height={300}
          />
        </InsightCard>

        <InsightCard
          title="Staff Performance"
          description="Completion rate by staff"
        >
          <Chart
            type="bar"
            options={staffPerformanceChart.options}
            series={staffPerformanceChart.series}
            height={300}
          />
        </InsightCard>

        <InsightCard
          title="Service Insights"
          description="Most booked and profitable services"
        >
          <Chart
            type="bar"
            options={serviceInsightsChart.options}
            series={serviceInsightsChart.series}
            height={300}
          />
        </InsightCard>
      </div>

      {/* ===== Additional Metrics ===== */}
      {patientInsights && operationalEfficiency && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Insights</CardTitle>
              <CardDescription>
                Returning & new patient statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Metric label="Total Patients" value={patientInsights.totalPatients} />
              <Metric
                label="Returning Patients"
                value={patientInsights.returningPatients}
              />
              <Metric
                label="Returning Rate"
                value={`${patientInsights.returningRate.toFixed(1)}%`}
              />
              <Metric
                label="New Patients (30 days)"
                value={patientInsights.newPatients}
                />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency</CardTitle>
              <CardDescription>
                Scheduling & utilization overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Metric
                label="Avg Lead Time"
                value={`${operationalEfficiency.avgLeadTimeHours?.toFixed(1)} hrs`}
              />
              <Metric
                label="Avg Duration"
                value={`${operationalEfficiency.avgDurationMinutes?.toFixed(0)} mins`}
              />
              <Metric
                label="No-Shows"
                value={Number(operationalEfficiency.totalNoShow)}
              />
              <Metric
                label="Cancellations"
                value={Number(operationalEfficiency.totalCancelled)}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  </>
  );
}

// ==============================
// Reusable Components
// ==============================



