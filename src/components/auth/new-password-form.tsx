"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  newPasswordSchema,
  type NewPasswordInputs,
} from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CheckIcon,
  Loader2Icon,
  LockIcon,
  TriangleAlertIcon,
  TriangleIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { resetPassword } from "@/app/_actions/auth/reset-password"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { PasswordInput } from "../ui/password-input"

function NewPasswordForm() {
  const form = useForm<NewPasswordInputs>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const token = useSearchParams().get("token")
  const [success, setSuccess] = React.useState("")
  const [error, setError] = React.useState("")
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: NewPasswordInputs) {
    setSuccess("")
    setError("")

    startTransition(async () => {
      try {
        const res = await resetPassword(input, token)

        if (res) {
          setError(res.message)
        } else {
          setSuccess("Password updated successfully!")
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-lg bg-white p-16 pb-8">
          <div className="flex w-[384px] max-w-sm flex-col items-center gap-16">
            <div className="flex flex-col items-center gap-2">
              <Link href="/">
                <TriangleIcon className="size-10 text-cyan-500" />
              </Link>
              <h1 className="select-none text-3xl font-medium text-cyan-600">
                New Password
              </h1>
            </div>

            <div className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        Icon={LockIcon}
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        Icon={LockIcon}
                        placeholder="confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {success && (
                <div className="mt-2 flex select-none items-center gap-2 rounded bg-emerald-200/70 px-3 py-2 text-sm font-medium text-emerald-900">
                  <CheckIcon className="size-5" />
                  {success}
                </div>
              )}
              {error && (
                <div className="mt-2 flex select-none items-center gap-2 rounded bg-red-200/70 px-3 py-2 text-sm font-medium text-red-900">
                  <TriangleAlertIcon className="size-5" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-8">
              <Button
                disabled={isPending}
                type="submit"
                size="lg"
                className="w-full text-lg"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
              <Link
                href="/signin"
                className="flex select-none items-center gap-1 font-medium text-secondary hover:underline hover:underline-offset-2"
              >
                Back to Sign in
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default NewPasswordForm
