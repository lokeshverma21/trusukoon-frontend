"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { StaffPerformanceItem } from "@/types/adminStats.types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: StaffPerformanceItem[];
  loading: boolean;
}

// ✅ Tooltip formatter must always return a string
type TooltipFormatter = (val: number, opts: { seriesIndex: number }) => string;

const StaffPerformanceChart: React.FC<Props> = ({ data, loading }) => {
  const categories = data.map((d) => d.staffName);
  const totalAppointments = data.map((d) => d.totalAppointments);
  const completionRate = data.map((d) => d.completionRate);
  // const revenue = data.map((d) => d.totalRevenue);

  const tooltipFormatter: TooltipFormatter = (val, opts) => {
    const index = opts.seriesIndex;
    if (index === 2) return `₹${val.toLocaleString()}`; // Revenue
    if (index === 1) return `${val}%`; // Completion %
    return val.toString(); // Appointments
  };

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    colors: ["#3b82f6", "#10b981", "#f59e0b"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
    legend: { position: "top" },
    tooltip: {
      y: {
        formatter: tooltipFormatter,
      },
    },
  };

  const series: { name: string; data: number[] }[] = [
    { name: "Appointments", data: totalAppointments },
    { name: "Completion %", data: completionRate },
    // { name: "Revenue", data: revenue },
  ];

  return (
    <div>
      <h2 className="font-medium mb-2">Staff Performance</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground text-center">Loading...</p>
      ) : (
        <Chart options={options} series={series} type="bar" height={350} />
      )}
    </div>
  );
};

export default StaffPerformanceChart;
