"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AppointmentTrendItem } from "@/types/adminStats.types";

// ✅ Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// ✅ Define prop types
interface Props {
  data: AppointmentTrendItem[];
  range: "day" | "week" | "month";
  onRangeChange: (v: "day" | "week" | "month") => void;
  loading: boolean;
}

const AppointmentTrendChart: React.FC<Props> = ({ data, range, onRangeChange, loading }) => {
  const categories = data.map((d) => d._id);

  // ✅ Define Apex series properly
  const series: ApexAxisChartSeries = [
    { name: "Total", data: data.map((d) => d.total) },
    { name: "Confirmed", data: data.map((d) => d.confirmed) },
    { name: "Completed", data: data.map((d) => d.completed) },
    { name: "Cancelled", data: data.map((d) => d.cancelled) },
  ];

  // ✅ Strict ApexOptions type
  const options: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { categories },
    colors: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"],
    legend: { position: "top" },
  };

  return (
    <div>
      <div className="flex justify-between mb-2 items-center">
        <h2 className="font-medium">Appointment Trends</h2>

        <Select
          value={range}
          onValueChange={(v: "day" | "week" | "month") => onRangeChange(v)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center">Loading...</p>
      ) : (
        <Chart options={options} series={series} type="line" height={300} />
      )}
    </div>
  );
};

export default AppointmentTrendChart;
