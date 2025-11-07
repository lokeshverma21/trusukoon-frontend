"use client";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FC } from "react";
import { StatusBadge } from "./StatusBadge";
import { Appointment } from "@/types/appointment.types";


export const AppointmentCard: FC<{ appointment: Appointment }> = ({ appointment }) => {
  const startDate = parseISO(appointment.startAt);

  return (
    <div className="bg-white/60 border border-border rounded-xl p-4 md:p-6 transition-all hover:shadow-md hover:border-primary/30">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="grow">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-headings font-heading">{appointment.service.name}</h3>
              <p className="text-sm text-foreground/80">with {appointment.staff?.name}</p>
            </div>
          </div>
        </div>
        <div>
          <StatusBadge status={appointment.status} />
        </div>
      </div>

      <div className="border-t border-dashed border-border my-4"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-foreground/60 mb-1">Date</p>
          <p className="font-medium text-foreground">{format(startDate, "E, MMM d, yyyy")}</p>
        </div>
        <div>
          <p className="text-foreground/60 mb-1">Time</p>
          <p className="font-medium text-foreground">{format(startDate, "p")}</p>
        </div>
        <div>
          <p className="text-foreground/60 mb-1">Price</p>
          <p className="font-medium text-black">
             ₹{appointment.service.price}
          </p>
        </div>
      </div>
    </div>
  );
};
