"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"

import { signOutUser } from "@/app/_actions/auth/signout"

import { Button } from "../ui/button"

function SignOutButton() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  function onClick() {
    startTransition(async () => {
      try {
        const res = await signOutUser()

        if (res) {
          console.log(res.message)
        } else {
          router.push("/signin")
        }
      } catch (error) {
        console.log()
      }
    })
  }

  return (
    <Button disabled={isPending} size="lg" onClick={onClick} className="w-full">
      {isPending ? <Loader2Icon className="animate-spin" /> : "Sign out"}
    </Button>
  )
}

export default SignOutButton
