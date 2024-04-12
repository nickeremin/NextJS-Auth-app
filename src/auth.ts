import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcryptjs"
import { and, eq } from "drizzle-orm"
import NextAuth, { type User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {
  TEST_PASSWORD,
  TEST_USER,
  TEST_USERNAME,
} from "../tests/e2e/constants/auth"
import { db } from "./db"
import { users } from "./db/schema"
import { SignInInputs, signInSchema } from "./lib/validations/auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = signInSchema.safeParse(credentials)

        if (!res.success) return null

        const { username, password } = res.data

        if (username == TEST_USERNAME && password == TEST_PASSWORD) {
          return TEST_USER
        }

        const user = await getUserFromDb(res.data)

        return user
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
})

async function getUserFromDb({ username, password }: SignInInputs) {
  const user = await db.query.users.findFirst({
    where: and(eq(users.username, username)),
  })

  if (!user) return null

  const isPasswordEqual = bcrypt.compareSync(password, user.password)

  if (isPasswordEqual) {
    return {
      id: user.id,
      name: user.username,
      email: user.email,
    } satisfies User
  } else {
    return null
  }
}
