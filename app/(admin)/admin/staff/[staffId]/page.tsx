"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchStaffById,
  selectStaffState,
  updateStaff,
  updateAvailability,
  updateBreaks,
} from "@/lib/features/staff/staffSlice";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CalendarDays, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { AddAvailabilityModal } from "@/components/admin/staff/AddAvailabilityModal";
import BreaksModal from "@/components/admin/staff/BreaksModal";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb";
import { AddServicesModal } from "@/components/admin/staff/AddServicesModal";
import { fetchServices } from "@/lib/features/service/serviceSlice";

export default function StaffDetailsPage() {
  const { staffId } = useParams<{ staffId: string }>();
  const dispatch = useAppDispatch();
  const { selectedStaff, loading, error } = useAppSelector(selectStaffState);
  const allServices = useAppSelector((state) => state.services.services);
  console.log(allServices)

  useEffect(() => {
    if (staffId) dispatch(fetchStaffById(staffId));
    dispatch(fetchServices({})); // ✅ Fetch all services for dropdown
  }, [dispatch, staffId]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );

  if (!selectedStaff)
    return (
      <div className="text-center py-10 text-muted-foreground">
        Staff details not found.
      </div>
    );

  const { user, services, availability, breaks, maxAppointmentsPerSlot } = selectedStaff;
  
  return (
    <>
      <PageBreadcrumb
        title="Staff Details"
        name="Staff"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Staff", href:"/admin/staff" },
          { label: `${user?.name || "Staff Details"}` },
      ]}/>
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Staff Details</h1>
        <Button variant="default" onClick={() => toast.info("Edit feature coming soon!")}>
          Edit Staff
        </Button>
      </div>

      {/* ===== STAFF PROFILE ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>{user?.role?.toUpperCase()}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{user?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Max Appointments per Slot
            </p>
            <p className="font-medium">{maxAppointmentsPerSlot}</p>
          </div>
        </CardContent>
      </Card>

      {/* ===== SERVICES ===== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p>Services</p>
            <AddServicesModal staffId={staffId} allServices={allServices} />
          </CardTitle>
          <CardDescription>List of services provided</CardDescription>
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          {services && services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {services.map((srv) => (
                <Badge key={srv._id} variant="outline">
                  {srv.name} – ₹{srv.price}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No services assigned yet.
            </p>
          )}
        </CardContent>
      </Card>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ===== AVAILABILITY ===== */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
            <p> Weekly Availability</p>
              {staffId && <AddAvailabilityModal staffId={staffId} />}
            </CardTitle>
            <CardDescription>Days and time slots available</CardDescription>
          </CardHeader>
          <CardContent>
            {availability && availability.length > 0 ? (
              <div className="space-y-2">
                {availability.map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-lg p-2"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <span className="capitalize font-medium">
                        {getWeekdayName(slot.weekday)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span className="text-sm text-muted-foreground">
                        {slot.start} – {slot.end}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No availability set yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* ===== BREAKS ===== */}
        <Card>
          <CardHeader>
            <CardTitle  className="flex items-center justify-between">
              <p>Breaks</p>
              <BreaksModal
                staffId={selectedStaff._id}
                existingBreaks={selectedStaff.breaks}
              />
            </CardTitle>
            <CardDescription>Custom unavailable slots</CardDescription>
          </CardHeader>
          <CardContent>
            {breaks && breaks.length > 0 ? (
              <div className="space-y-2">
                {breaks.map((b, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-lg p-2"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <span className="font-medium">
                        {b?.date ? (
                          <span className="font-medium">
                            {format(new Date(b.date), "dd MMM yyyy")}
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">No date</span>
                        )}

                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span className="text-sm text-muted-foreground">
                        {b.start} – {b.end}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No breaks set yet.</p>
            )}
          </CardContent>
        </Card>
            </div>
    </div>
    </>
  );
}

// ✅ Helper: Convert weekday number to readable name
function getWeekdayName(weekday: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[weekday % 7];
}
