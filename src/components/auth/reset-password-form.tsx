"use client"

import React from "react"
import Link from "next/link"
import { EmailInputs, emailSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CheckIcon,
  Loader2Icon,
  MailIcon,
  TriangleAlertIcon,
  TriangleIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { generateAndSendResetToken } from "@/app/_actions/auth/reset-password"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"

function ResetPasswordForm() {
  const form = useForm<EmailInputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const [success, setSuccess] = React.useState("")
  const [error, setError] = React.useState("")

  const [isPending, startTransiton] = React.useTransition()

  function onSubmit({ email }: EmailInputs) {
    setSuccess("")
    setError("")

    startTransiton(async () => {
      const res = await generateAndSendResetToken(email)

      if (res) {
        setError(res.message)
      } else {
        setSuccess("Confirmation link sent to your email!")
      }
      try {
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
                Reset Password
              </h1>
            </div>

            <div className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        Icon={MailIcon}
                        type="email"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
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
                type="submit"
                disabled={isPending}
                size="lg"
                className="w-full text-lg"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Submit"
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

export default ResetPasswordForm
