"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchAppointments,
  deleteAppointment,
  selectAppointmentState,
  cancelAppointment,
} from "@/lib/features/appointment/appointmentSlice";
import { CircleX, NotebookPen, Plus, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import EditAppointmentModal from "./EditAppointmentModal";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AppointmentsTable = () => {
  const dispatch = useAppDispatch();
  const { appointmentList, loading } = useAppSelector(selectAppointmentState);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"cancel" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  // Debounced fetch (so typing doesn’t refetch instantly)
  const debouncedFetch = React.useMemo(
    () =>
      debounce((query: string, stat: string, pay: string) => {
        dispatch(fetchAppointments({
          search: query || undefined,
          status: stat === 'all' ? undefined: stat,
          paymentStatus: pay === 'all' ? undefined: pay,
        }));
      }, 400),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetch(search, status, paymentStatus);
    return () => debouncedFetch.cancel();
  }, [search, status, paymentStatus, debouncedFetch]);

  
  const handleConfirm = () => {
    if (!selectedId || !selectedAction) return;
    if (selectedAction === "cancel") dispatch(cancelAppointment(selectedId));
    if (selectedAction === "delete") dispatch(deleteAppointment(selectedId));
    setOpenDialog(false);
    setSelectedAction(null);
    setSelectedId(null);
  };
  
  // Fetch all appointments on mount
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="mt-6">
      <div className="rounded-md border border-border bg-card text-card-foreground shadow-sm min-w-full w-sm">
        {/* Header Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-2 p-4">
          <div className="flex gap-2 items-center flex-wrap">
            <Input
              type="text"
              placeholder="Search by patient, staff, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />

            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setPaymentStatus} value={paymentStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button>
              <Plus size={16} /> Add Appointment
            </Button>
            <Button variant="secondary">Export</Button>
          </div>
        </div>


        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="w-full divide-y divide-border">
            <thead className="bg-muted/10 text-foreground">
              <tr>
                {[
                  "Patient",
                  "Staff",
                  "Service",
                  "Date/Time",
                  "Status",
                  "Payment",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-6 text-sm text-muted-foreground"
                  >
                    Loading appointments...
                  </td>
                </tr>
              ) : appointmentList.length > 0 ? (
                appointmentList.map((appt) => (
                  <tr
                    key={appt._id}
                    className="hover:bg-muted/5 transition-colors duration-150"
                  >
                    {/* Patient */}
                    <td className="whitespace-nowrap text-left py-4 ps-4 pe-3 text-sm font-medium">
                      <div>
                        <p>{appt.patient?.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {appt.patient?.email}
                        </p>
                      </div>
                    </td>

                    {/* Staff */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      <div>
                        <p>{appt.staff?.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {appt.staff?.role}
                        </p>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      <div>
                        <p>{appt.service?.name}</p>
                        <p className="text-muted-foreground text-xs">
                          ₹{appt.service?.price} / {appt.service?.duration}min
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      <div>
                        <p>
                          {new Date(appt.startAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            // timeStyle: "short",
                          })}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(appt.startAt).toLocaleString("en-IN", {
                            // dateStyle: "medium",
                            timeStyle: "short",
                          })}
                          -
                          {new Date(appt.endAt).toLocaleString("en-IN", {
                            // dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appt.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appt.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : appt.status === "completed"
                            ? "bg-primary/80 text-white" 
                            : "bg-red-100 text-red-800" 
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm capitalize">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appt.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appt.paymentStatus || "—"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap py-4 px-3 text-center text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                            <EditAppointmentModal appointment={appt} />
                        </TooltipTrigger>
                        <TooltipContent>Edit Appointment</TooltipContent>
                      </Tooltip>


                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              setSelectedId(appt._id);
                              setSelectedAction("cancel");
                              setOpenDialog(true);
                            }}
                            className="me-2 text-yellow-600 hover:opacity-80"
                            aria-label="Cancel Appointment"
                          >
                            <CircleX size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Cancel Appointment</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              setSelectedId(appt._id);
                              setSelectedAction("delete");
                              setOpenDialog(true);
                            }}
                            className="text-destructive hover:opacity-80"
                            aria-label="Delete Appointment"
                          >
                            <Trash size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Appointment</TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-6 text-sm text-muted-foreground"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedAction === "cancel"
                ? "Cancel Appointment?"
                : "Delete Appointment?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAction === "cancel"
                ? "Are you sure you want to cancel this appointment? This action can be undone later if needed."
                : "Are you sure you want to permanently delete this appointment? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                selectedAction === "delete"
                  ? "bg-destructive text-destructive-foreground hover:opacity-90"
                  : "bg-yellow-600 text-white hover:opacity-90"
              }
            >
              {selectedAction === "cancel" ? "Yes, Cancel" : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default AppointmentsTable;
