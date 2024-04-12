"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInSchema, type SignInInputs } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Loader2Icon,
  LockIcon,
  TriangleAlertIcon,
  TriangleIcon,
  UserIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { signInUser } from "@/app/_actions/auth/signin"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { PasswordInput } from "../ui/password-input"

function SignInForm() {
  const form = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const router = useRouter()
  const [error, setError] = React.useState("")
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: SignInInputs) {
    setError("")

    startTransition(async () => {
      try {
        const error = await signInUser(input)

        if (error) {
          setError(error.message)
        } else {
          router.push("/")
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
                Sign In
              </h1>
            </div>

            <div className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        Icon={UserIcon}
                        data-test="signin-username"
                        type="text"
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        Icon={LockIcon}
                        data-test="signin-password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="mt-2 flex select-none items-center gap-2 rounded bg-red-200/70 px-3 py-2 text-sm font-medium text-red-900">
                  <TriangleAlertIcon className="size-5" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-8">
              <Button
                data-test="signin-submit"
                type="submit"
                disabled={isPending}
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
                href="/signin/reset-password"
                className="select-none  font-medium text-secondary hover:underline hover:underline-offset-2"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
