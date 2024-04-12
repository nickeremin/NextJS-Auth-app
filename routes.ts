// These routes do not require authentication
export const publicRoutes = ["/"]

// An array of routes that are used for authentication
export const authRoutes = [
  "/signin",
  "/signup",
  "/signin/reset-password",
  "/signin/new-password",
]

// The prefix for APi authentication routes
// Routes that start with this prefix are used for API authentication purposes
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_SIGNIN_REDIRECT = "/"
