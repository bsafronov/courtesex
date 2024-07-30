CREATE TABLE IF NOT EXISTS "courtesex"."videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer,
	"message_id" integer,
	"comment_id" integer,
	"url" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."videos" ADD CONSTRAINT "videos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "courtesex"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."videos" ADD CONSTRAINT "videos_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "courtesex"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."videos" ADD CONSTRAINT "videos_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "courtesex"."messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courtesex"."videos" ADD CONSTRAINT "videos_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "courtesex"."comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
