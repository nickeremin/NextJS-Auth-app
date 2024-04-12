import { type Metadata } from "next"
import Link from "next/link"
import { auth } from "@/auth"
import { LockIcon, TriangleIcon, UserIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Home",
}

async function HomePage() {
  const session = await auth()

  const isSingnedIn = !!session?.user

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[384px] max-w-sm flex-col items-center gap-2 rounded-lg bg-white p-10">
        <Link href="/">
          <TriangleIcon className="size-10 text-cyan-500" />
        </Link>
        <h1
          data-test="signin-home"
          className="select-none text-3xl font-medium text-cyan-600"
        >
          {isSingnedIn ? `Welcome, ${session.user?.name}` : "Home"}
        </h1>
      </div>
      <div className="flex gap-4 font-medium">
        <Link href="/user" className="group flex-1">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-cyan-200/50 bg-white/20 p-6 backdrop-blur-xl transition-colors group-hover:bg-white/40">
            <UserIcon className="size-8 text-cyan-200" />

            <span className="inline-flex items-center gap-2 whitespace-nowrap text-white">
              Go to User Profile
            </span>
          </div>
        </Link>
        <Link href="/signin" className="group flex-1">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-cyan-200/50 bg-white/20 p-6 backdrop-blur-xl transition-colors group-hover:bg-white/40">
            <LockIcon className="size-8 text-cyan-200" />

            <span className="inline-flex items-center gap-2 whitespace-nowrap text-white">
              Go to Sign In
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
