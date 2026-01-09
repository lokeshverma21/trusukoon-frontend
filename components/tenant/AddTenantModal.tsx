"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createTenant, selectTenants } from "@/lib/features/tenant/tenantSlice";
import { CreateTenantPayload } from "@/types/tenant.types";

/* =======================
   Zod Schema
======================= */

const createTenantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase and contain only letters, numbers, and dashes"
    ),
  adminName: z.string().min(2, "Admin name must be at least 2 characters"),
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

/* =======================
   Types
======================= */

export type FormValues = z.infer<typeof createTenantSchema>

interface CreateTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* =======================
   Component
======================= */

export function CreateTenantModal({
  open,
  onOpenChange,
}: CreateTenantModalProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTenants);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createTenantSchema),
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    const payload: CreateTenantPayload = values;

    const action = await dispatch(createTenant(payload));

    if (createTenant.fulfilled.match(action)) {
      reset();
      onOpenChange(false);
    }
    // ❌ no catch block
    // errors are already handled in slice state
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Tenant</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tenant Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Tenant Details
            </h3>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="name">Tenant Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-destructive">
                    {errors.name.message}
                    </p>
                )}
                </div>

                <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register("slug")} />
                {errors.slug && (
                    <p className="text-sm text-destructive">
                    {errors.slug.message}
                    </p>
                )}
                </div>
            </div>
          </div>

          {/* Admin Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Admin Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="adminName">Admin Name</Label>
                <Input id="adminName" {...register("adminName")} />
                {errors.adminName && (
                    <p className="text-sm text-destructive">
                    {errors.adminName.message}
                    </p>
                )}
                </div>

                <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input id="adminEmail" type="email" {...register("adminEmail")} />
                {errors.adminEmail && (
                    <p className="text-sm text-destructive">
                    {errors.adminEmail.message}
                    </p>
                )}
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPhone">Admin Phone</Label>
              <Input id="adminPhone" {...register("adminPhone")} />
              {errors.adminPhone && (
                <p className="text-sm text-destructive">
                  {errors.adminPhone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">Admin Password</Label>
              <Input
                id="adminPassword"
                type="password"
                {...register("adminPassword")}
              />
              {errors.adminPassword && (
                <p className="text-sm text-destructive">
                  {errors.adminPassword.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Tenant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
