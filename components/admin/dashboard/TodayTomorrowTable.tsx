"use client";

import React from "react";
import { useSelector } from "react-redux";
import { fetchTodayTomorrowAppointments, selectTodayTomorrowAppointments } from "@/lib/features/adminStats/adminStatsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppDispatch } from "@/lib/store/store";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Card, CardHeader } from "@/components/ui/card";
import { MessageCircleMore } from "lucide-react";

function buildWhatsAppLink(phone: string, message: string) {
  const cleaned = phone.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMsg}`;
}


function getReminderMessage(patientName: string, time: string) {
  const date = new Date(time).toLocaleString();
  return `Hello ${patientName}, this is a reminder for your appointment scheduled at ${date}. Please let us know if you need to reschedule.`;
}

function TodayTomorrowTable() {
  const dispatch = useAppDispatch<AppDispatch>();

  const data = useAppSelector(selectTodayTomorrowAppointments);

  React.useEffect(() => {
    dispatch(fetchTodayTomorrowAppointments());
  }, [dispatch]);

  if (!data) {
    return <div className="text-sm text-muted-foreground">Loading appointments…</div>;
  }

  const renderTable = (
    title: string,
    rows: typeof data.today
  ) => (
    <div className="space-y-3">
      {/* <h3 className="text-lg font-semibold">{title}</h3> */}

      {rows.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No appointments for {title}
        </div>
      ) : (
        <Card className="gap-0 p-4">
        <CardHeader className="font-bold text-primary px-2">{title}</CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => {
              const message = getReminderMessage(
                row.patientName,
                row.time
              );
              const waLink = buildWhatsAppLink(row.contact, message);

              return (
                <TableRow key={idx} className="hover:bg-gray-100">
                  <TableCell className="font-medium">
                    {row.patientName}
                  </TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell className="capitalize">
                    {row.status}
                  </TableCell>
                  <TableCell>
                    {new Date(row.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                        className="bg-primary text-white hover:text-white cursor-pointer"
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(waLink, "_blank")}
                      >
                      WhatsApp <MessageCircleMore />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderTable("Today", data.today)}
      {/* <Separator /> */}
      {renderTable("Tomorrow", data.tomorrow)}
    </div>
  );
}

export default TodayTomorrowTable;
