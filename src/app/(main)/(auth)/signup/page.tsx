import React from "react"
import { type Metadata } from "next"
import Link from "next/link"
import SignUpForm from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up",
}

function SignUpPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <SignUpForm />
      <Link
        href="/signin"
        className="select-none text-white hover:underline hover:underline-offset-2"
      >
        Already have an account? Sign in
      </Link>
    </div>
  )
}

export default SignUpPage
