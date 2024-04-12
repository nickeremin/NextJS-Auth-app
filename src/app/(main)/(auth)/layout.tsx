import React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}

export default AuthLayout
