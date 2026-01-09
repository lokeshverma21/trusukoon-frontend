// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   const host = request.headers.get("host") || "";

//   const isRootDomain =
//     host === "trusukoon.com" ||
//     host === "www.trusukoon.com" ||
//     host.match(/^localhost(:\d+)?$/);

//   if (isRootDomain) {
//     return NextResponse.rewrite(
//       new URL("/(marketing)" + request.nextUrl.pathname, request.url)
//     );
//   }

//   return NextResponse.rewrite(
//     new URL("/(tenant)" + request.nextUrl.pathname, request.url)
//   );
// }

// export const config = {
//   matcher: [
//     // Match everything except internal Next.js assets and API routes
//     "/((?!_next/static|_next/image|favicon.ico|api).*)",
//   ],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Normalize host (remove port)
  const cleanHost = host.split(":")[0];

  const isLocalhost = cleanHost === "localhost";
  const isVercelDomain = cleanHost.endsWith(".vercel.app");
  const isRootDomain =
    cleanHost === "lokeshverma.in" || cleanHost === "www.lokeshverma.in";

  // MARKETING / SUPER ADMIN
  if (isLocalhost || isRootDomain || isVercelDomain) {
    return NextResponse.rewrite(
      new URL(`/(marketing)${pathname}`, request.url)
    );
  }

  // TENANT DOMAIN
  const subdomain = cleanHost.replace(".lokeshverma.in", "");

  // OPTIONAL: block invalid tenants
  if (!subdomain || subdomain === "www") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const response = NextResponse.rewrite(
    new URL(`/(tenant)${pathname}`, request.url)
  );

  // pass tenant to backend
  response.headers.set("x-tenant-id", subdomain);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
