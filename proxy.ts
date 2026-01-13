// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function proxy(request: NextRequest) {
//   const host = request.headers.get("host") || "";
//   const pathname = request.nextUrl.pathname;

//   console.log("first", host)
//   console.log("second", pathname)

//   const cleanHost = host.split(":")[0];

//   const isRootDomain =
//     cleanHost === "lokeshverma.in" ||
//     cleanHost === "www.lokeshverma.in" ||
//     cleanHost === "localhost";

//   // ✅ DO NOTHING for root domain
//   if (isRootDomain) {
//     return NextResponse.next();
//   }

//   // ❌ Block non-lokeshverma.in domains
//   if (!cleanHost.endsWith(".lokeshverma.in")) {
//     return NextResponse.redirect(new URL("https://lokeshverma.in"));
//   }

//   const subdomain = cleanHost.replace(".lokeshverma.in", "");

//   // ❌ Block invalid subdomains
//   if (!subdomain || subdomain === "www") {
//     return NextResponse.redirect(new URL("https://lokeshverma.in"));
//   }

//   if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
//     return NextResponse.next();
//   }

//   // 🔍 TENANT VALIDATION
//   try {
//     const res = await fetch(
//       "https://trusukoon-backend-pvt.vercel.app/api/v1/tenant-info",
//       {
//         headers: {
//           host: cleanHost,
//           cookie: request.headers.get("cookie") || "",
//           "x-tenant-subdomain": subdomain,
//         },
//         cache: "no-store",
//       }
//     );

//     console.log("resoponse:", res)

//     if (res.status === 404) {
//       return NextResponse.rewrite(
//         new URL("/not-found", request.url)
//       );
//     }

//     if (!res.ok) {
//       return NextResponse.redirect(new URL("https://lokeshverma.in"));
//     }
//   } catch (err) {
//     console.error("Tenant validation failed", err);
//     return NextResponse.redirect(new URL("https://lokeshverma.in"));
//   }

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-tenant-subdomain", subdomain);

//   // ✅ Valid tenant → rewrite to tenant routes
//   const response = NextResponse.rewrite(
//     new URL(pathname, request.url),
//     {
//       request: {
//         headers: requestHeaders,
//       },
//     }
//   )


//   response.headers.set("x-tenant-id", subdomain);
//   return response;
// }

// export const config = {
//   matcher: ["/((?!_next|api|favicon.ico).*)"],//|super_admin
// };




import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  const cleanHost = host.split(":")[0];

  const isRootDomain =
    cleanHost === "lokeshverma.in" ||
    cleanHost === "www.lokeshverma.in" ||
    cleanHost === "localhost";

  // ✅ Root domain → no tenant logic
  if (isRootDomain) {
    return NextResponse.next();
  }

  // ❌ Reject unknown domains
  if (!cleanHost.endsWith(".lokeshverma.in")) {
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  const subdomain = cleanHost.replace(".lokeshverma.in", "");

  // ❌ Invalid subdomain
  if (!subdomain || subdomain === "www") {
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }

  // ✅ Allow auth pages
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return NextResponse.next();
  }

  // ✅ If tenant already cached → just pass header
  const tenantCtx = request.cookies.get("tenant_ctx");

  if (tenantCtx) {
    const headers = new Headers(request.headers);
    headers.set("x-tenant-subdomain", subdomain);

    return NextResponse.next({
      request: { headers },
    });
  }

  // 🔍 TENANT VALIDATION (only once per 6h)
  try {
    const res = await fetch(
      "https://trusukoon-backend-pvt.vercel.app/api/v1/tenant-info",
      {
        headers: {
          "x-tenant-subdomain": subdomain,
        },
        cache: "no-store",
      }
    );

    if (res.status === 404) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    if (!res.ok) {
      return NextResponse.redirect(new URL("https://lokeshverma.in"));
    }

    const json = await res.json();
    const data = json.data;

    const headers = new Headers(request.headers);
    headers.set("x-tenant-subdomain", subdomain);

    const response = NextResponse.rewrite(
      new URL(pathname, request.url),
      { request: { headers } }
    );

    // ✅ Cache tenant context
    response.cookies.set(
      "tenant_ctx",
      JSON.stringify({
        tenantId: data.tenantId,
        slug: data.slug,
        plan: data.subscriptionPlan,
      }),
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 6, // 6 hours
      }
    );

    return response;
  } catch (err) {
    console.error("Tenant validation failed", err);
    return NextResponse.redirect(new URL("https://lokeshverma.in"));
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
