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



import api from "@/lib/axiosInstance";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Normalize host (remove port)
  const cleanHost = host.split(":")[0];

  const isLocalhost = cleanHost === "localhost";
  const isVercelDomain = cleanHost.endsWith(".vercel.app");
  const isRootDomain =
    cleanHost === "lokeshverma.in" || cleanHost === "www.lokeshverma.in";

  /* ============================
     MARKETING / SUPER ADMIN
  ============================ */
  if (isLocalhost || isRootDomain || isVercelDomain) {
    return NextResponse.rewrite(
      new URL(`/(marketing)${pathname}`, request.url)
    );
  }

  /* ============================
     TENANT DOMAIN
  ============================ */
  if (!cleanHost.endsWith(".lokeshverma.in")) {
    // unknown domain → hard redirect
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  const subdomain = cleanHost.replace(".lokeshverma.in", "");

  // basic sanity check
  if (!subdomain || subdomain === "www") {
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  /* ============================
     🔥 NEW: VALIDATE TENANT
     (THIS IS THE FIX)
  ============================ */
  try {
  const res = await fetch(
    "https://trusukoon-backend-pvt.vercel.app/api/v1/tenant-info",
    {
      headers: {
        host: cleanHost, // IMPORTANT: backend resolves tenant from host
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    }
  );

  console.log("Tenant Info:", res)
  
  if (res.status === 404) {
    return NextResponse.rewrite(
      new URL("/tenant-not-found", request.url)
    );
  }

  if (!res.ok) {
    return NextResponse.redirect(
      new URL("https://lokeshverma.in")
    );
  }
} catch (err) {
  console.error("Tenant validation failed", err);
  return NextResponse.redirect(
    new URL("https://lokeshverma.in")
  );
}

  /* ============================
     TENANT ROUTING (UNCHANGED)
  ============================ */
  const response = NextResponse.rewrite(
    new URL(`/(tenant)${pathname}`, request.url)
  );

  response.headers.set("x-tenant-id", subdomain);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
