// app/(client)/layout.tsx
'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { fetchProfile } from '@/lib/features/auth/authSlice'
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { usePathname, useRouter } from 'next/navigation'

function ClientGuard({ children }: { children: React.ReactNode }) {
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
    } else if (user && pathname === "/login") {
      router.push("/")
    }
  }, [user, pathname])

  return <>{children}</>
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // ❌ Don’t use router/pathname here
  // ✅ Use them only inside ClientGuard
  return (
    <>
      {/* <main className="min-h-screen"> */}
      {/* <SmoothScroll/> */}
      <Navbar />
        <ClientGuard>{children}</ClientGuard>
      <Footer />
      {/* </main> */}
    </>
  )
}
