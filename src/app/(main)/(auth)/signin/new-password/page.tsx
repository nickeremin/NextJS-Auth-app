import React from "react"
import { Metadata } from "next"
import NewPasswordForm from "@/components/auth/new-password-form"

export const metadata: Metadata = {
  title: "New Password",
}

function NewPasswordPage() {
  return (
    <React.Suspense>
      <NewPasswordForm />
    </React.Suspense>
  )
}

export default NewPasswordPage
