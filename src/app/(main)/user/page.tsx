import React from "react"
import { type Metadata } from "next"
import Link from "next/link"
import { auth } from "@/auth"
import SignOutButton from "@/components/auth/signout-button"
import { TriangleIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile",
}

async function UserProfilePage() {
  const session = await auth()

  return (
    <div className="rounded-lg bg-white p-16 pb-8">
      <div className="flex w-[384px] max-w-sm flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-2">
          <Link href="/">
            <TriangleIcon className="size-10 text-cyan-500" />
          </Link>
          <h1 className="select-none text-3xl font-medium text-cyan-600">
            User Profile
          </h1>
        </div>

        <div className="flex w-full flex-col gap-4 text-lg font-semibold">
          <p className="">Username: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>

        <SignOutButton />
      </div>
    </div>
  )
}

export default UserProfilePage
