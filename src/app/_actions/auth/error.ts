export type SignUpErrorCode =
  | "EMAIL_ALREADY_EXISTS"
  | "USERNAME_ALREADY_EXISTS"
  | "INVALID_CREDENTIALS"
  | "SOMETHING_WENT_WRONG"
  | "USER_DOES_NOT_EXISTED"
  | "INVALID_TOKEN"

export type CustomAuthError = {
  message: string
  code: SignUpErrorCode
}
