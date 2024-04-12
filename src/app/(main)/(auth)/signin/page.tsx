import React from "react"
import { type Metadata } from "next"
import Link from "next/link"
import SignInForm from "@/components/auth/signin-form"

export const metadata: Metadata = {
  title: "Sign In",
}

function SignInPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <SignInForm />
      <Link
        href="/signup"
        className="select-none text-white hover:underline hover:underline-offset-2"
      >
        Not a Member? Sign up
      </Link>
    </div>
  )
}

export default SignInPage
