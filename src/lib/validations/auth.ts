import { z } from "zod"

export const signInSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters.")
    .max(32, "Username must be no longer than 32 characters."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(32, "Username must be no longer than 32 characters.")
    .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/, {
      message:
        "The password must consist of letters and digits, with at least one uppercase letter and one digit, and must be between 8 and 32 characters long.",
    }),
})

export type SignInInputs = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters.")
    .max(32, "Username must be no longer than 32 characters."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(32, "Username must be no longer than 32 characters.")
    .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/, {
      message:
        "The password must consist of letters and digits, with at least one uppercase letter and one digit, and must be between 8 and 32 characters long.",
    }),
})

export type SignUpInputs = z.infer<typeof signUpSchema>

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export type EmailInputs = z.infer<typeof emailSchema>

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, "Username must be no longer than 32 characters.")
      .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/, {
        message:
          "The password must consist of letters and digits, with at least one uppercase letter and one digit, and must be between 8 and 32 characters long.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, "Username must be no longer than 32 characters.")
      .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/, {
        message:
          "The password must consist of letters and digits, with at least one uppercase letter and one digit, and must be between 8 and 32 characters long.",
      }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  })

export type NewPasswordInputs = z.infer<typeof newPasswordSchema>
