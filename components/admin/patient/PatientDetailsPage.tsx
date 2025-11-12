"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchPatientDetails,
  clearPatientDetails,
  selectPatients,
} from "@/lib/features/patient/patientSlice";
import { useParams } from "next/navigation";
import {
  Mail,
  Phone,
  User,
  Calendar,
  BarChart2,
  Hash,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import clsx from "clsx";
import { StatCard } from "@/components/admin/patient/StatCard";
import { StatusBadge } from "@/components/admin/patient/StatusBadge";

export default function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { details, loading, error } = useAppSelector(selectPatients);

  const [activeFilter, setActiveFilter] = useState<
    "all" | "completed" | "cancelled" | "no_show"
  >("all");

  useEffect(() => {
    if (id) dispatch(fetchPatientDetails(id));
    return () => {
      dispatch(clearPatientDetails());
    };
  }, [id, dispatch]);

  const filteredHistory = useMemo(() => {
    if (!details) return [];
    if (activeFilter === "all") return details.history;
    return details.history.filter((h) => h.status === activeFilter);
  }, [details, activeFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          <p className="text-lg font-semibold text-muted-foreground">
            Loading Patient Data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12 text-red-500 font-semibold">
        {error || "Failed to load patient details"}
      </div>
    );
  }

  if (!details) return <p className="p-6 text-center">No patient details found.</p>;

  const { patient, stats, history } = details;

  const filterOptions: Array<"all" | "completed" | "cancelled" | "no_show"> = [
    "all",
    "completed",
    "cancelled",
    "no_show",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Patient Dashboard
          </h1>
          <p className="text-md text-muted-foreground">
            Detailed overview for {patient.name}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
          {/* LEFT: Patient Info + Stats */}
          <aside className="lg:col-span-1 flex flex-col gap-4 mb-8 lg:mb-0">
            {/* Patient Info */}
            <div className="border border-border rounded-md shadow-sm p-6 bg-white">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 shrink-0 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-primary">
                    {patient.name}
                  </h2>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{patient.email}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="border border-border rounded-md shadow-sm p-4 bg-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-accent" />
                Key Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  icon={Calendar}
                  title="Total Sessions"
                  value={stats.totalSessions}
                  color="bg-[#2ABBB1]"
                />
                <StatCard
                  icon={Hash}
                  title="Total Spend"
                  value={`₹${stats.totalSpend.toLocaleString()}`}
                  color="bg-[#5AA7D8]"
                />
                <StatCard
                  icon={AlertTriangle}
                  title="No Shows"
                  value={stats.noShows}
                  color="bg-[#F59E0B]"
                />
                <StatCard
                  icon={XCircle}
                  title="Cancellations"
                  value={stats.cancellations}
                  color="bg-[#EF4444]"
                />
              </div>
            </div>
          </aside>

          {/* RIGHT: Appointment History */}
          <section className="lg:col-span-2">
            <div className="border border-border rounded-md shadow-sm bg-white">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Appointment History</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={clsx(
                        "px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer",
                        activeFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/10 hover:bg-accent/20 text-muted-foreground"
                      )}
                    >
                      {filter === "all"
                        ? "All"
                        : filter.replace("_", " ").toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="divide-y divide-[--border]">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((h) => (
                    <li
                      key={h._id}
                      className="p-6 hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <p className="font-semibold text-[--foreground]">
                            {h.service?.name || "Unknown Service"}
                          </p>
                          <p className="text-sm text-[--muted-foreground]">
                            {new Date(h.startAt).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <StatusBadge status={h.status} />
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-6 text-center text-[--muted-foreground]">
                    No appointments found for this filter.
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
