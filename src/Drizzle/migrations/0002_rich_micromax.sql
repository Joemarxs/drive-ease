CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user',
	"is_verified" boolean DEFAULT false,
	"verification_code" varchar(10),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "is_verified";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "verification_code";