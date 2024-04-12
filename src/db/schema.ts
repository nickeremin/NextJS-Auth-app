import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => {
      return nanoid()
    }),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
})

export const resetPasswordTokens = pgTable(
  "reset_password_tokens",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => {
        return nanoid()
      }),
    email: text("email").notNull(),
    token: text("token").unique().notNull(),
    expires: timestamp("expires").notNull(),
  },
  (t) => ({
    emailTokenUnique: unique().on(t.email, t.token),
  })
)
