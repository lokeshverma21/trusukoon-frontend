"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts"; // ✅ import type
import type { OperationalEfficiency } from "@/types/adminStats.types"; // ✅ import from types file

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: OperationalEfficiency;
  loading: boolean;
}

const OperationalSnapshot: React.FC<Props> = ({ data, loading }) => {
  // ✅ Fallback for undefined/null data
  const series = [data?.avgLeadTimeHours ?? 0];

  // ✅ Explicitly type options
  const options: ApexOptions = {
    chart: {
      type: "radialBar", // ✅ exact literal
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        dataLabels: {
          show: true,
          name: { show: true, offsetY: 20 },
          value: {
            fontSize: "22px",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    labels: ["Utilization"],
    colors: ["#6366f1"],
  };

  return (
    <div>
      <h2 className="font-medium mb-3">Operational Snapshot</h2>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            {/* ✅ Chart now fully typed */}
            <Chart options={options} series={series} type="radialBar" height={200} />
            <p className="text-sm text-muted-foreground mt-2">Utilization Rate</p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Average Completion Time</p>
              <h3 className="text-lg font-semibold">
                {data?.avgDurationMinutes ?? 0} mins
              </h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Cancelled Rate</p>
              <h3 className="text-lg font-semibold">
                {data?.totalCancelled ?? 0}%
              </h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">No-Show Rate</p>
              <h3 className="text-lg font-semibold">
                {data?.totalNoShow ?? 0}%
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationalSnapshot;
