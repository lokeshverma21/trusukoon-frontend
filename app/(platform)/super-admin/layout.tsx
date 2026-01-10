import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ cookies() is async in new Next
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `/api/v1/user/me`,
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