"use client";

import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  toggleTenantStatus,
  selectTenants,
} from "@/lib/features/tenant/tenantSlice";
import {
  Tenant,
  SubscriptionPlan,
  TenantStatus,
} from "@/types/tenant.types";
import { CreateTenantModal } from "@/components/tenant/AddTenantModal";

type ModalMode = "add" | "edit";

interface FormState {
  name: string;
  slug: string;
  owner: string;
  subscriptionPlan: SubscriptionPlan;
  status: TenantStatus;
}

type FilterPlan = "all" | SubscriptionPlan;
type FilterStatus = "all" | TenantStatus;

export default function TenantsPage() {
  const dispatch = useAppDispatch();
  const { tenants, loading, error } = useAppSelector(selectTenants);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalMode, setModalMode] = React.useState<ModalMode>("add");
  const [editing, setEditing] = React.useState<Tenant | null>(null);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const [q, setQ] = React.useState<string>("");
  const [plan, setPlan] = React.useState<FilterPlan>("all");
  const [status, setStatus] = React.useState<FilterStatus>("all");

  React.useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  const filtered = React.useMemo<Tenant[]>(() => {
    const query = q.toLowerCase();

    return tenants.filter((t) => {
      const matchQuery =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.slug.toLowerCase().includes(query);

      const matchPlan =
        plan === "all" || t.subscriptionPlan === plan;

      const matchStatus =
        status === "all" || t.status === status;

      return matchQuery && matchPlan && matchStatus;
    });
  }, [tenants, q, plan, status]);

  const handlePlanChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = e.target.value as FilterPlan;
    setPlan(value);
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = e.target.value as FilterStatus;
    setStatus(value);
  };

  const handleDelete = async (): Promise<void> => {
    if (!editing) return;
    await dispatch(deleteTenant(editing._id)).unwrap();
    setModalOpen(false);
    setEditing(null);
  };

  const handleToggleStatus = (tenantId: string): void => {
    dispatch(toggleTenantStatus(tenantId));
  };

  const openAdd = (): void => {
    setCreateModalOpen(true);
  };

  const openEdit = (tenant: Tenant): void => {
    setModalMode("edit");
    setEditing(tenant);
    setModalOpen(true);
  };



  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold">Tenants</h1>
            <p className="text-sm text-slate-600">
              Platform-level tenant management
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => dispatch(fetchTenants())}
              className="border px-3 py-2 rounded-lg bg-white text-sm"
            >
              Refresh
            </button>
            <button
              onClick={openAdd}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add Tenant
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl border">
          <div className="p-4 flex gap-3">
            <input
              className="border rounded-lg px-3 py-2 text-sm w-full"
              placeholder="Search tenants"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <select
              value={plan}
              onChange={handlePlanChange}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            <select
              value={status}
              onChange={handleStatusChange}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

          </div>

          {error && (
            <div className="p-4 text-sm text-red-600 border-t">
              {error}
            </div>
          )}

          <table className="w-full text-sm">
            <thead className="border-t bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Slug</th>
                <th className="text-left px-4 py-3">Plan</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center">
                    No tenants found
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t._id} className="border-t">
                    <td className="px-4 py-3">{t.name}</td>
                    <td className="px-4 py-3">{t.slug}</td>
                    <td className="px-4 py-3">{t.subscriptionPlan}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(t._id)}
                        className="underline"
                      >
                        {t.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="border px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setEditing(t);
                          setModalMode("edit");
                          setModalOpen(true);
                        }}
                        className="border border-red-300 text-red-600 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateTenantModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
}
