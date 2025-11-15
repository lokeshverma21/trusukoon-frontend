"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchAllStaff,
  fetchAllStaffByService,
  selectStaffState,
  IStaff,
} from "@/lib/features/staff/staffSlice";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/lib/store/store";
import { Service } from "@/types/service.types";
import Loader from "../Loader";

// ===========================================================
// 🧱 Types
// ===========================================================

interface Props {
  services: Service[];
  loading: boolean;
  onSelect: (service: Service, staff: IStaff) => void;
}

// ===========================================================
// 🧱 Component
// ===========================================================
export default function Step1Service({ services, onSelect, loading }: Props) {
  const dispatch = useAppDispatch<AppDispatch>();
  const { staffList, loading: staffLoading } = useAppSelector(selectStaffState);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false);

  // ✅ Fetch all staff when component mounts (initially)
  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  // ===========================================================
  // 🧭 Handle service click — fetch staff for that service
  // ===========================================================
  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsStaffDialogOpen(true);

    // 🔥 Fetch staff offering this specific service
    dispatch(fetchAllStaffByService(service._id));
  };

  // ===========================================================
  // 🧭 Handle staff select
  // ===========================================================
  const handleStaffSelect = (staff: IStaff) => {
    if (selectedService) {
      onSelect(selectedService, staff);
      setIsStaffDialogOpen(false);
      setSelectedService(null);
    }
  };

  // ===========================================================
  // 🌀 Loading UI
  // ===========================================================
  if (loading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-[80vh] text-muted-foreground">
        <Loader /> Loading services...
      </div>
    );
  }

  // ===========================================================
  // 🧱 Render
  // ===========================================================
  return (
    <>
      {/* ✅ Service List */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <button
              key={service._id}
              onClick={() => handleServiceClick(service)}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg text-left transition-all"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-black">{service.name}</h3>
                <span className="text-emerald-600 font-bold">
                  ₹{service.price}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {service.description || "No description"}
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-1" /> {service.duration} min
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Staff Selection Dialog */}
      <Dialog open={isStaffDialogOpen} onOpenChange={setIsStaffDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Select a Staff for{" "}
              <span className="text-emerald-600 font-semibold p-2">
                {selectedService?.name}
              </span>
            </DialogTitle>
          </DialogHeader>

          {staffLoading ? (
            <p className="text-center text-gray-500">Loading staff...</p>
          ) : staffList.length === 0 ? (
            <p className="text-center text-gray-500">
              No staff available for this service.
            </p>
          ) : (
            <ScrollArea className="max-h-[300px] pr-3">
              <div className="grid gap-3">
                {staffList.map((staff) => (
                  <Button
                    key={staff.user._id}
                    variant="outline"
                    onClick={() => handleStaffSelect(staff)}
                    className={cn(
                      "flex items-center justify-start gap-3 rounded-xl border border-gray-200 p-3 w-full hover:bg-muted/10 hover:border-emerald-500"
                    )}
                  >
                    <Avatar>
                      <AvatarImage
                        src={staff.user.avatarUrl || ""}
                        alt={staff.user.name}
                      />
                      <AvatarFallback>
                        {staff.user.name?.[0]?.toUpperCase() || "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold">{staff.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {staff.user.email}
                        {/* {staff.user._id} */}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
