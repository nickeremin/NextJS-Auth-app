"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUpSchema, type SignUpInputs } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Loader2Icon,
  LockIcon,
  MailIcon,
  TriangleIcon,
  UserIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { signUpUser } from "@/app/_actions/auth/signup"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { PasswordInput } from "../ui/password-input"

function SignUpForm() {
  const form = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(input: SignUpInputs) {
    startTransition(async () => {
      try {
        const error = await signUpUser(input)

        if (error) {
          if (error.code == "USERNAME_ALREADY_EXISTS") {
            form.setError("username", { message: error.message })
          }
          if (error.code == "EMAIL_ALREADY_EXISTS") {
            form.setError("email", { message: error.message })
          }
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
                Sign Up
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
                        type="text"
                        Icon={UserIcon}
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
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full flex-col">
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="w-full text-lg"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm
