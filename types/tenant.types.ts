// types/tenant.types.ts

export type SubscriptionPlan = "free" | "paid";
export type TenantStatus = "active" | "inactive";

export interface Tenant {
  _id: string;
  name: string;
  slug: string;
  owner: string | null;
  subscriptionPlan: SubscriptionPlan;
  status: TenantStatus;
  createdAt: string;
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
    Pick<Tenant, "name" | "slug" | "owner" | "subscriptionPlan" | "status">
  >;
}
