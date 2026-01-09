// lib/getTenantFromHost.ts
export function getTenantFromHost() {
  if (typeof window === "undefined") return null;

  const host = window.location.hostname; 
  // clinic1.trusukoon.com
  const parts = host.split(".");

  if (parts.length < 3) return null; // trusukoon.com
  return parts[0]; // clinic1
}
