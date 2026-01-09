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
    const res = await api.get("/tenant-info")

    if (res.status === 404) {
      // tenant does NOT exist → kill it
      return NextResponse.rewrite(
        new URL("/unauthorized", request.url)
      );
      // OR redirect to root if you prefer:
      // return NextResponse.redirect(new URL("https://lokeshverma.in"));
    }
  } catch (err) {
    // backend down? don't brick prod
    console.error("Tenant validation failed", err);
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
