CREATE TABLE IF NOT EXISTS "courtesex"."audios" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer,
	"message_id" integer,
	"comment_id" integer,
	"url" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courtesex"."images" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "courtesex"."messages" ADD COLUMN "message_id" integer;--> statement-breakpoint
ALTER TABLE "courtesex"."messages" ADD COLUMN "post_id" integer;--> statement-breakpoint
ALTER TABLE "courtesex"."reactions" ADD COLUMN "message_id" integer;--> statement-breakpoint
ALTER TABLE "courtesex"."users" ADD COLUMN "avatar_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."audios" ADD CONSTRAINT "audios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "courtesex"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."audios" ADD CONSTRAINT "audios_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "courtesex"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."audios" ADD CONSTRAINT "audios_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "courtesex"."messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."audios" ADD CONSTRAINT "audios_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "courtesex"."comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."images" ADD CONSTRAINT "images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "courtesex"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."messages" ADD CONSTRAINT "messages_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "courtesex"."messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."messages" ADD CONSTRAINT "messages_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "courtesex"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."reactions" ADD CONSTRAINT "reactions_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "courtesex"."messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."users" ADD CONSTRAINT "users_avatar_id_images_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "courtesex"."images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
