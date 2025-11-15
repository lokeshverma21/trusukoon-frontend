"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"; // make sure you have typed hooks
import { fetchPatientsList, selectPatients } from "@/lib/features/patient/patientSlice";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function PatientsListPage() {
  const dispatch = useAppDispatch();
  const { list: patients, loading, error, totalPages, currentPage, totalPatients } = useAppSelector(selectPatients);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch from backend using Redux thunk
  useEffect(() => {
    setTimeout(()=>{
      dispatch(fetchPatientsList({ page, limit: itemsPerPage, search, sort: sort as "latest" | "oldest" | "highestSpend" | "mostSessions" }));
    },2000)
  }, [dispatch, page, search, sort]);

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  // Sort options
  const sortOptions = [
    { id: "latest", name: "Latest" },
    { id: "oldest", name: "Oldest" },
    { id: "highestSpend", name: "Highest Spend" },
    { id: "mostSessions", name: "Most Sessions" },
  ];

  if (loading) {
    return (
          <div className="flex flex-col gap-2 justify-center items-center h-[80vh] text-muted-foreground">
            <Loader /> Loading patients...
          </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6 bg-card rounded-lg shadow-lg max-w-md">
          <div className="text-destructive text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Data</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent transition-colors"
            onClick={() => dispatch(fetchPatientsList({ page, limit: itemsPerPage, search, sort: sort as "latest" | "oldest" | "highestSpend" | "mostSessions" }))}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Patient Management
              </h1>
              <p className="text-muted-foreground mt-1">Manage and track your patients</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <select
                className="px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-md shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">All Patients</h2>
              <span className="text-sm text-muted-foreground">
                Showing {patients.length} of {totalPatients} patients
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Sessions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Total Spend
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {patients.length > 0 ? (
                    patients.map((patient) => (
                      <tr key={patient._id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-medium">
                                {patient.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-foreground">
                                {patient.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-foreground">{patient.email}</div>
                          <div className="text-sm text-muted-foreground">{patient.phone}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-foreground">{patient.totalSessions}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-foreground">
                            ₹{patient.totalSpend.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                          {patient.lastAppointment
                            ? new Date(patient.lastAppointment).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/patients/${patient._id}`} className="text-primary hover:text-accent font-medium px-3 py-1 rounded-md hover:bg-primary/10 transition-colors">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No patients found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      page === 1
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-primary hover:bg-primary/10"
                    }`}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          page === pageNum
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      page === totalPages
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-primary hover:bg-primary/10"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
