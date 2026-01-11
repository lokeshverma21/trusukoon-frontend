"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import avatar1 from "@/public/assets/avatar-1.jpg";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAllStaff, selectStaffState } from "@/lib/features/staff/staffSlice";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, Plus } from "lucide-react";
import AddStaffModal from "./AddStaffModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

// === Types ===
interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

interface Availability {
  _id: string;
  weekday: number;
  start: string;
  end: string;
}

interface Break {
  _id: string;
  date: string;
  start: string;
  end: string;
}

interface StaffUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Staff {
  _id: string;
  user: StaffUser;
  services: Service[];
  availability: Availability[];
  breaks: Break[];
  maxAppointmentsPerSlot: number;
  __v?: number;
}

function StaffTable() {
  const dispatch = useAppDispatch()
  const { staffList } = useAppSelector(selectStaffState);
  // useEffect(() => {
  //   dispatch(fetchAllStaff());
  // }, [dispatch]);

  return (
    <div className="mt-6">
      <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        {/* Header Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-2 p-4">
          <AddStaffModal/>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn text-lg font-medium bg-primary text-primary-foreground hover:opacity-90"
            >
              <i className="mgc_settings_3_line"></i>
            </button>
            <Button
              type="button"
              className="text-sm font-medium bg-muted text-foreground hover:opacity-80"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="w-full divide-y divide-border">
            <thead className="bg-muted/10 text-foreground">
              <tr>
                {[
                  "Staff Name",
                  "Email",
                  "Phone",
                  "Role",
                  "Services",
                  "Availability",
                  "Breaks",
                  "Max Appointments",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-3 py-3.5 text-center text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {staffList.length > 0 ? (
                staffList.map((staff) => (
                  <tr
                    key={staff._id}
                    className="hover:bg-muted/5 transition-colors duration-150"
                  >
                    {/* Name + Avatar */}
                    <td className="whitespace-nowrap py-4 ps-4 pe-0 text-center text-sm font-medium">
                      <div className="flex items-center">
                        <Image
                          src={avatar1}
                          alt={staff.user.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <span className="ml-3">{staff.user.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm">
                      {staff.user.email}
                    </td>

                    {/* Phone */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm">
                      {staff.user.phone}
                    </td>

                    {/* Role */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm capitalize">
                      {staff.user.role}
                    </td>

                    {/* Services */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm">
                      {staff.services.map((srv) => srv.name).join(", ")}
                    </td>

                    {/* Availability */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm">
                      {staff.availability.length > 0
                        ? `${staff.availability.length} days`
                        : "—"}
                    </td>

                    {/* Breaks */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm">
                      {staff.breaks.length > 0
                        ? `${staff.breaks.length} breaks`
                        : "—"}
                    </td>

                    {/* Max Appointments */}
                    <td className="whitespace-nowrap py-4 pe-0 text-center text-sm">
                      {staff.maxAppointmentsPerSlot}
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap py-4 px-3 text-center text-sm">
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/admin/staff/${staff._id}`}><ArrowRightFromLine size={16} /></Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Staff Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-6 text-sm text-muted-foreground"
                  >
                    No staff data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffTable;
