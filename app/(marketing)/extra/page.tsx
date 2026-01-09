"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAppointmentsByUser } from "@/lib/features/appointment/appointmentSlice";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format, isWithinInterval, parseISO } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CustomSelect } from "@/components/my-appointments/CustomSelect";
import { AppointmentCard } from "@/components/my-appointments/AppointmentCard";
import { statusColors } from "@/components/my-appointments/StatusBadge";
import NotLoggedInPage from "@/components/my-appointments/NotLoggedInPage";
import Loader from "@/components/Loader";

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();
  const { appointmentList, loading } = useAppSelector((state) => state.appointment);
  const { user } = useAppSelector((state) => state.auth);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [staffFilter, setStaffFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch appointments for the logged-in user only
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchAppointmentsByUser()); // backend handles filtering by user
    }
  }, [dispatch, user]);

  // ✅ Apply local filters (status, staff, date)
  const filteredAppointments = useMemo(() => {
    return appointmentList
      .filter((appt) => (statusFilter === "ALL" ? true : appt.status === statusFilter))
      .filter((appt) => (staffFilter === "ALL" ? true : appt.staff?._id === staffFilter))
      .filter((appt) => {
        if (!dateRange?.from) return true;
        const end = dateRange.to || dateRange.from;
        return isWithinInterval(parseISO(appt.startAt), { start: dateRange.from, end });
      });
  }, [appointmentList, statusFilter, staffFilter, dateRange]);

  // ✅ Close date picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearFilters = () => {
    setStatusFilter("ALL");
    setStaffFilter("ALL");
    setDateRange(undefined);
  };

  // ✅ Extract unique staff members
  const staffList = Array.from(
    new Map(
      appointmentList.filter((a) => a.staff).map((a) => [a.staff._id, a.staff])
    ).values()
  );


  if (!user) {
    return(
      <div className="min-w-5xl w-full min-h-90 flex items-center justify-center">
        <NotLoggedInPage/>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen font-body text-foreground">
      <main className="container mx-auto px-0 py-8 md:py-4">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-bold text-headings font-heading">My Appointments</h1>
          <p className="text-sm text-muted/80 mt-2">View and manage your upcoming and past appointments.</p>
        </header>

        {/* Filters */}
        <div className="bg-primary/30 border border-border rounded-md p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-foreground/80 mb-1">
                Status
              </label>
              <CustomSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All</option>
                {Object.keys(statusColors).map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()}
                  </option>
                ))}
              </CustomSelect>
            </div>

            {/* Staff Filter */}
            <div>
              <label htmlFor="staff-filter" className="block text-sm font-medium text-foreground/80 mb-1">
                Staff
              </label>
              <CustomSelect value={staffFilter} onChange={(e) => setStaffFilter(e.target.value)}>
                <option value="ALL">All</option>
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.user.name}
                  </option>
                ))}
              </CustomSelect>
            </div>

            {/* Date Range */}
            <div className="relative" ref={datePickerRef}>
              <label htmlFor="date-filter" className="block text-sm font-medium text-foreground/80 mb-1">
                Date Range
              </label>
              <button
                id="date-filter"
                onClick={() => setDatePickerOpen(!isDatePickerOpen)}
                className="w-full bg-white/50 border border-border rounded-md py-2 pl-3 pr-8 text-left flex items-center justify-between"
              >
                <span className={!dateRange?.from ? "text-foreground/60" : ""}>
                  {dateRange?.from
                    ? `${format(dateRange.from, "LLL dd, y")} ${
                        dateRange.to ? `- ${format(dateRange.to, "LLL dd, y")}` : ""
                      }`
                    : "Select date range"}
                </span>
                <CalendarIcon className="w-4 h-4 text-foreground/50" />
              </button>
              {isDatePickerOpen && (
                <div className="absolute top-full mt-2 z-10 bg-card border border-border rounded-lg shadow-lg">
                  <DayPicker mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                </div>
              )}
            </div>

            {/* Clear Filters */}
            <div className="md:mt-6">
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 bg-accent/80 text-white hover:bg-secondary rounded-lg py-2 px-4 font-semibold"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Appointment List */}
        {loading ? (
          <div className="flex flex-col gap-2 justify-center items-center h-[80vh] text-muted-foreground">
            <Loader /> Loading your appointments...
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {filteredAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
            <h3 className="text-xl font-semibold text-headings">No Appointments Found</h3>
            <p className="text-foreground/70 mt-2">Try changing filters or come back later.</p>
          </div>
        )}
      </main>
    </div>
  );
}
