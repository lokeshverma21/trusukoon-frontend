import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString(); // 👈 send cookies to backend

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/me`,
    {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    redirect("/login");
  }

    const json = await res.json();
    const { user, role } = json.data;

    if (role !== "super_admin") {
        redirect("/unauthorized");
    }

  return <>{children}</>;
}
