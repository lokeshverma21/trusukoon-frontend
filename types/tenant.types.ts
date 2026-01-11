// types/tenant.types.ts

export type SubscriptionPlan = "free" | "paid";
export type TenantStatus = "active" | "inactive";

export interface Tenant {
  _id: string;
  name: string;
  slug: string;
  subscriptionPlan: SubscriptionPlan;
  status: TenantStatus;
  createdAt: string;

  adminName: string | null;
  adminEmail: string | null;
  adminPhone: string | null;
}

export interface CreateTenantPayload {
  name: string;
  slug: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminPassword: string;
}

export interface UpdateTenantPayload {
  id: string;
  data: Partial<
    Pick<Tenant, "name" | "slug" | "adminName" | "subscriptionPlan" | "status" | "adminEmail" | "adminPhone">
  >;
}
