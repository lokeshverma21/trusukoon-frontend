// lib/withRoleGuard.tsx
"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function withRoleGuard(
  WrappedComponent: React.ComponentType,
  allowedRoles: string[]
) {
  return function RoleGuard(props: any) {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        router.push("/unauthorized"); // create this page
      }
    }, [user]);

    if (!user) return null;
    return <WrappedComponent {...props} />;
  };
}
