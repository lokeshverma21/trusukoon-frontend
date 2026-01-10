'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { loginUser } from "@/lib/features/auth/authSlice"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data)) // ✅ ONLY email + password
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>

                {error && (
                  <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
                )}

                {/* Signup only on root domain */}
                {/* {typeof window !== "undefined" &&
                  window.location.hostname === "trusukoon.com" && (
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link href="/signup">Sign up</Link>
                    </FieldDescription>
                  )} */}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
