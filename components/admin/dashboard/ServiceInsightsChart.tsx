"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { ServiceInsightItem } from "@/types/adminStats.types";

// ✅ Import ApexCharts dynamically (avoids SSR crash)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: ServiceInsightItem[];
  loading: boolean;
}

const ServiceInsightsChart: React.FC<Props> = ({ data, loading }) => {
  const labels = data.map((d) => d.name);
  const revenue = data.map((d) => d.totalRevenue);

  // ✅ Explicit type for ApexCharts options
  const options: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels,
    colors: ["#3b82f6", "#f97316", "#10b981", "#eab308", "#ec4899"],
    legend: { position: "bottom" },
    tooltip: {
      y: {
        formatter: (val: number) => `₹${val.toLocaleString()}`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // ✅ common visual enhancement for clarity
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
  };

  return (
    <div>
      <h2 className="font-medium mb-2">Service Insights</h2>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center">Loading...</p>
      ) : (
        <Chart
          options={options}
          series={revenue}
          type="donut"
          height={320}
        />
      )}

      {/* Summary Info */}
      {!loading && (
        <div className="mt-3 text-sm text-muted-foreground space-y-1">
          {data.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>{item.name}</span>
              <span>
                {item.totalBookings} appts | ₹
                {item.totalRevenue.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceInsightsChart;
