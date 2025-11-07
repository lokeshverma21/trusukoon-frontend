"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  updateAppointment,
  selectAppointmentState,
} from "@/lib/features/appointment/appointmentSlice";
import { NotebookPen } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment.types";
import { toast } from "sonner";

interface EditAppointmentModalProps {
  appointment: Appointment;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  appointment,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectAppointmentState);

  const [open, setOpen] = React.useState(false);

  // ✅ Use strongly typed states
  const [status, setStatus] = React.useState<AppointmentStatus>(
    appointment.status
  );
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>(
    appointment.paymentStatus || "pending"
  );
  const [notes, setNotes] = React.useState<string>(appointment.notes || "");

  // ✅ Type-safe submit
  const handleSubmit = async () => {
    try {
      await dispatch(
        updateAppointment({
          id: appointment._id,
          data: {
            status,
            paymentStatus,
            notes,
          },
        })
      ).unwrap();

      toast.success("Appointment updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update appointment");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button
              className="me-2 text-accent hover:opacity-80"
              aria-label="Edit Appointment"
            >
              <NotebookPen size={16} />
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Edit Appointment</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogDescription>
            Update appointment and payment status for{" "}
            <span className="font-medium">{appointment.patient?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-y-auto">
          {/* Patient Info */}
          <div className="flex gap-6 items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground">Patient</Label>
              <p className="text-sm font-medium">
                {appointment.patient?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {appointment.patient?.email}
              </p>
            </div>

            {/* Staff Info */}
            <div>
              <Label className="text-sm text-muted-foreground">Staff</Label>
              <p className="text-sm font-medium">{appointment.staff?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {appointment.staff?.email}
              </p>
            </div>

            {/* Service */}
            <div>
              <Label className="text-sm text-muted-foreground">Service</Label>
              <p className="text-sm font-medium">
                {appointment.service?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{appointment.service?.price} / {appointment.service?.duration}
                min
              </p>
            </div>
          </div>

          {/* Appointment Date */}
          <div>
            <Label className="text-sm text-muted-foreground">Date / Time</Label>
            <p className="text-sm">
              {new Date(appointment.startAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}{" "}
              -{" "}
              {new Date(appointment.endAt).toLocaleTimeString("en-IN", {
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Appointment & Payment Status */}
          <div className="flex gap-6 items-center">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="status">Appointment Status</Label>
              <Select
                value={status}
                onValueChange={(val: AppointmentStatus) => setStatus(val)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={paymentStatus}
                onValueChange={(val: PaymentStatus) => setPaymentStatus(val)}
              >
                <SelectTrigger id="paymentStatus">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal or follow-up notes"
              className="min-h-20"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentModal;
