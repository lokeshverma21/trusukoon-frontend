// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   const host = request.headers.get("host") || "";
//   const pathname = request.nextUrl.pathname;

//   // Normalize host (remove port)
//   const cleanHost = host.split(":")[0];

//   const isLocalhost = cleanHost === "localhost";
//   const isVercelDomain = cleanHost.endsWith(".vercel.app");
//   const isRootDomain =
//     cleanHost === "lokeshverma.in" || cleanHost === "www.lokeshverma.in";

//   // MARKETING / SUPER ADMIN
//   if (isLocalhost || isRootDomain || isVercelDomain) {
//     return NextResponse.rewrite(
//       new URL(`/(marketing)${pathname}`, request.url)
//     );
//   }

//   // TENANT DOMAIN
//   const subdomain = cleanHost.replace(".lokeshverma.in", "");

//   // OPTIONAL: block invalid tenants
//   if (!subdomain || subdomain === "www") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   const response = NextResponse.rewrite(
//     new URL(`/(tenant)${pathname}`, request.url)
//   );

//   // pass tenant to backend
//   response.headers.set("x-tenant-id", subdomain);

//   return response;
// }

// export const config = {
//   matcher: ["/((?!_next|api|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "@/lib/axiosInstance";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Normalize host
  const cleanHost = host.split(":")[0];

  const isLocalhost = cleanHost === "localhost";
  const isVercelDomain = cleanHost.endsWith(".vercel.app");
  const isRootDomain =
    cleanHost === "lokeshverma.in" || cleanHost === "www.lokeshverma.in";

  // MARKETING / SUPER ADMIN (ROOT)
  if (isLocalhost || isRootDomain || isVercelDomain) {
    return NextResponse.rewrite(new URL(`/(marketing)${pathname}`, request.url));
  }

  // TENANT DOMAIN
  if (!cleanHost.endsWith(".lokeshverma.in")) {
    // Unknown domain → redirect to root
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  const subdomain = cleanHost.replace(".lokeshverma.in", "");

  // Skip empty or invalid subdomain
  if (!subdomain || subdomain === "www") {
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  // Validate tenant via backend
  try {
    const res = await fetch(
      `https://trusukoon-backend-pvt.vercel.app/api/v1/tenant-info`,
      {
        headers: {
          host: cleanHost,
          cookie: request.headers.get("cookie") || "",
          "x-tenant-subdomain": subdomain,
        },
        cache: "no-store",
      }
    );

    if (res.status === 404) {
      // Tenant does NOT exist → show dead page
      return NextResponse.rewrite(new URL("/tenant-not-found", request.url));
    }

    if (!res.ok) {
      return NextResponse.redirect(new URL("https://lokeshverma.in"));
    }
  } catch (err) {
    console.error("Tenant validation failed", err);
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  // Tenant exists → rewrite to tenant path
  const response = NextResponse.rewrite(new URL(`/(tenant)${pathname}`, request.url));
  response.headers.set("x-tenant-id", subdomain);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
