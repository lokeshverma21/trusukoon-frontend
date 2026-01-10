import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  // ✅ Convert cookies to proper header string
  const cookieHeader = (await cookieStore)
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/me`,
    {
      headers: {
        Cookie: cookieHeader, // ⚠️ capital C matters
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    redirect("/login");
  }

  const json = await res.json();

  const role = json?.data?.role;
  if (role !== "super_admin") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
