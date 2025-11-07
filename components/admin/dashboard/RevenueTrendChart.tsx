"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { RevenueTrendItem } from "@/types/adminStats.types"; 

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: RevenueTrendItem[];
  loading: boolean;
}

const RevenueTrendChart: React.FC<Props> = ({ data, loading }) => {
  const categories = data.map((d) => d._id);
  const series = [
    {
      name: "Revenue",
      data: data.map((d) => d.totalRevenue),
    },
  ];

  // ✅ Explicitly typed options as ApexOptions
  const options: ApexOptions = {
    chart: {
      type: "area", // ✅ literal type, not string
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth", // ✅ literal union type
      width: 2,
    },
    fill: { opacity: 0.2 },
    colors: ["#22c55e"],
    xaxis: { categories },
    yaxis: {
      labels: {
        formatter: (val: number) => `₹${val.toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `₹${val.toLocaleString()}`,
      },
    },
  };

  return (
    <div>
      <h2 className="font-medium mb-2">Revenue Trend</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground text-center">Loading...</p>
      ) : (
        <Chart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      )}
    </div>
  );
};

export default RevenueTrendChart;
