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

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  console.log("first", host)
  console.log("second", pathname)

  const cleanHost = host.split(":")[0];

  const isRootDomain =
    cleanHost === "lokeshverma.in" ||
    cleanHost === "www.lokeshverma.in" ||
    cleanHost === "localhost";

  // ✅ DO NOTHING for root domain
  if (isRootDomain) {
    return NextResponse.next();
  }

  // ❌ Block non-lokeshverma.in domains
  if (!cleanHost.endsWith(".lokeshverma.in")) {
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  const subdomain = cleanHost.replace(".lokeshverma.in", "");

  // ❌ Block invalid subdomains
  if (!subdomain || subdomain === "www") {
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return NextResponse.next();
  }

  // 🔍 TENANT VALIDATION
  try {
    const res = await fetch(
      "https://trusukoon-backend-pvt.vercel.app/api/v1/tenant-info",
      {
        headers: {
          host: cleanHost,
          cookie: request.headers.get("cookie") || "",
          "x-tenant-subdomain": subdomain,
        },
        cache: "no-store",
      }
    );

    console.log("resoponse:", res)

    if (res.status === 404) {
      return NextResponse.rewrite(
        new URL("/not-found", request.url)
      );
    }

    if (!res.ok) {
      return NextResponse.redirect(new URL("https://lokeshverma.in"));
    }
  } catch (err) {
    console.error("Tenant validation failed", err);
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-subdomain", subdomain);

  // ✅ Valid tenant → rewrite to tenant routes
  const response = NextResponse.rewrite(
    new URL(pathname, request.url),
    {
      request: {
        headers: requestHeaders,
      },
    }
  )


  response.headers.set("x-tenant-id", subdomain);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
