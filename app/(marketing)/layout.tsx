// app/(client)/layout.tsx
'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { fetchProfile } from '@/lib/features/auth/authSlice'
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { usePathname, useRouter } from 'next/navigation'
import RouteLoader from '@/components/global/RouteLoader'

export function ClientGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const pathname = usePathname()
  const router = useRouter()

  // Fetch user profile
  useEffect(() => {
    if (!user) dispatch(fetchProfile())
  }, [user, dispatch])

  // Redirect logic
  useEffect(() => {
    if (!user && pathname.startsWith("/admin")) {
      router.push("/login")
    } else if (user && pathname === "/login" || user && pathname === "/signup") {
      router.push("/")
    }
  }, [user, pathname, router])

  return <>{children}</>
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // ❌ Don’t use router/pathname here
  // ✅ Use them only inside ClientGuard
    const pathname = usePathname()

  // 🧠 Hide navbar & footer on these routes:
  const hideLayout = ["/login", "/signup"].includes(pathname)
  return (
    <>
      <main className="max-w-5xl mx-auto">
      {/* <SmoothScroll/> */}
      {!hideLayout && <Navbar />}
        <RouteLoader/>
        <ClientGuard>{children}</ClientGuard>
      {!hideLayout && <Footer />}
      </main>
    </>
  )
}
