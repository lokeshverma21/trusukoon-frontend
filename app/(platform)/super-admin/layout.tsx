import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headersList = await headers();

  const host = headersList.get("host"); // 👈 current domain
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  if (!host) redirect("/login");

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${protocol}://${host}/api/v1/user/me`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) redirect("/login");

  const json = await res.json();

  if (json?.data?.role !== "super_admin") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
