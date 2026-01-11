"use client";

import * as React from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateTenant, deleteTenant } from "@/lib/features/tenant/tenantSlice";
import {
  Tenant,
  SubscriptionPlan,
  TenantStatus,
} from "@/types/tenant.types";

interface EditTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: Tenant | null;
}

interface FormState {
  name: string;
  slug: string;
  owner: string;
  subscriptionPlan: SubscriptionPlan;
  status: TenantStatus;
}

export function EditTenantModal({
  open,
  onOpenChange,
  tenant,
}: EditTenantModalProps) {
  const dispatch = useAppDispatch();

  const [form, setForm] = React.useState<FormState | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Populate form when modal opens
  React.useEffect(() => {
    if (tenant && open) {
      setForm({
        name: tenant.name,
        slug: tenant.slug,
        owner: tenant.owner ?? "",
        subscriptionPlan: tenant.subscriptionPlan,
        status: tenant.status,
      });
      setError(null);
    }
  }, [tenant, open]);

  if (!open || !form || !tenant) return null;

  const updateField = (
    key: keyof FormState,
    value: string
  ) => {
    setForm((prev) =>
      prev ? { ...prev, [key]: value } : prev
    );
  };

  const validate = (): boolean => {
    if (!form.name.trim()) {
      setError("Tenant name is required");
      return false;
    }
    if (!form.slug.trim()) {
      setError("Slug is required");
      return false;
    }
    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      setError("Slug can only contain lowercase letters, numbers, and hyphens");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSubmitting(true);
      await dispatch(
        updateTenant({
          id: tenant._id,
          data: form,
        })
      ).unwrap();

      onOpenChange(false);
    } catch (err) {
      setError(
        typeof err === "string" ? err : "Update failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this tenant permanently?")) return;

    try {
      setSubmitting(true);
      await dispatch(deleteTenant(tenant._id)).unwrap();
      onOpenChange(false);
    } catch {
      setError("Delete failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Edit Tenant</h2>
          <p className="text-sm text-slate-500">
            Update tenant details
          </p>
        </header>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <input
            value={form.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            placeholder="Tenant name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            value={form.slug}
            onChange={(e) =>
              updateField(
                "slug",
                e.target.value.toLowerCase()
              )
            }
            placeholder="tenant-slug"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            value={form.owner}
            onChange={(e) =>
              updateField("owner", e.target.value)
            }
            placeholder="Owner name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={form.subscriptionPlan}
            onChange={(e) =>
              updateField(
                "subscriptionPlan",
                e.target.value
              )
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <footer className="flex justify-between pt-4">
          <button
            onClick={handleDelete}
            disabled={submitting}
            className="text-red-600 text-sm"
          >
            Delete Tenant
          </button>

          <div className="space-x-2">
            <button
              onClick={() => onOpenChange(false)}
              className="border px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
