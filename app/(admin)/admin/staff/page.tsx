"use client"
import PageBreadcrumb from "@/components/admin/PageBreadcrumb";
import StaffStatistics from "@/components/admin/staff/StaffStatistics";
import StaffTable from "@/components/admin/staff/StaffTable";
import { fetchAllStaff, selectStaffState } from "@/lib/features/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";

export default function StaffList() {
  const dispatch = useAppDispatch();
  const { staffList, loading, error } = useAppSelector(selectStaffState);

  useEffect(() => {
    dispatch(fetchAllStaff());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <>
      <PageBreadcrumb
        title="Staff"
        name="Staff"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Staff" },
      ]}/>
      <StaffStatistics />
      <StaffTable />
    </>
  )
}
