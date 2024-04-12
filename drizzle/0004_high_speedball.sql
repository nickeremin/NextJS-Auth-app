CREATE TABLE IF NOT EXISTS "reset_password_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "reset_password_tokens_token_unique" UNIQUE("token"),
	CONSTRAINT "reset_password_tokens_email_token_unique" UNIQUE("email","token")
);
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");