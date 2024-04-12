import { type User } from "next-auth"

export const SIGN_IN_URL = "http://localhost:3000/signin"
export const APP_URL = "http://localhost:3000"

export const TEST_USERNAME = "example_username"
export const TEST_EMAIL = "example_email@example.com"
export const TEST_PASSWORD = "ExamplePassword123"

export const TEST_USER: User = {
  name: TEST_USERNAME,
  email: TEST_EMAIL,
}
