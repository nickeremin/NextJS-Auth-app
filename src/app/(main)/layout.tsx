import React from "react"
import BackgroundImage from "@/components/ui/background-image"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex h-screen min-h-screen w-screen max-w-[100vw] flex-col items-center justify-center overflow-hidden bg-auth-background">
      <BackgroundImage />
      <main className="relative z-20">{children}</main>
    </div>
  )
}

export default MainLayout
