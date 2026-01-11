"use client";

import * as React from "react";
import { z } from "zod";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateTenant, deleteTenant } from "@/lib/features/tenant/tenantSlice";
import {
  Tenant,
  SubscriptionPlan,
  TenantStatus,
} from "@/types/tenant.types";

/* ================= ZOD SCHEMA ================= */

const tenantSchema = z.object({
  name: z.string().min(1, "Tenant name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  owner: z.string().optional(),
  subscriptionPlan: z.enum(["free", "paid"]),
  status: z.enum(["active", "inactive"]),
});

type FormState = z.infer<typeof tenantSchema>;

interface EditTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: Tenant | null;
}

export function EditTenantModal({
  open,
  onOpenChange,
  tenant,
}: EditTenantModalProps) {
  const dispatch = useAppDispatch();

  const [form, setForm] = React.useState<FormState | null>(null);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = React.useState(false);
  const [rootError, setRootError] = React.useState<string | null>(null);

  /* ============== INIT FORM ============== */

  React.useEffect(() => {
    if (tenant && open) {
      setForm({
        name: tenant.name,
        slug: tenant.slug,
        owner: tenant.adminName ?? "",
        subscriptionPlan: tenant.subscriptionPlan,
        status: tenant.status,
      });
      setErrors({});
      setRootError(null);
    }
  }, [tenant, open]);

  if (!open || !form || !tenant) return null;

  /* ============== HELPERS ============== */

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) =>
      prev ? { ...prev, [key]: value } : prev
    );
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const result = tenantSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
     result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
    });
      setErrors(fieldErrors);
      return false;
    }

    return true;
  };

  /* ============== ACTIONS ============== */

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
      setRootError(
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
      setRootError("Delete failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ============== UI ============== */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4">
        <header>
          <h2 className="text-lg font-semibold">Edit Tenant</h2>
          <p className="text-sm text-slate-500">
            Update tenant details
          </p>
        </header>

        {rootError && (
          <div className="text-sm text-red-600">
            {rootError}
          </div>
        )}

        <div className="space-y-3">
          {/* Tenant Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tenant Name
            </label>
            <input
              value={form.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Slug
            </label>
            <input
              value={form.slug}
              onChange={(e) =>
                updateField(
                  "slug",
                  e.target.value.toLowerCase()
                )
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors.slug && (
              <p className="text-xs text-red-600 mt-1">
                {errors.slug}
              </p>
            )}
          </div>

          {/* Owner */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Owner
            </label>
            <input
              value={form.owner ?? ""}
              onChange={(e) =>
                updateField("owner", e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Plan */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Subscription Plan
            </label>
            <select
              value={form.subscriptionPlan}
              onChange={(e) =>
                updateField(
                  "subscriptionPlan",
                  e.target.value as SubscriptionPlan
                )
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                updateField(
                  "status",
                  e.target.value as TenantStatus
                )
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
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
