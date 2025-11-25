CREATE TABLE "projects_ada" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(300) NOT NULL,
	CONSTRAINT "projects_ada_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"start_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(300) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"github_url" text NOT NULL,
	"demo_url" text,
	"thumbnail_url" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp DEFAULT null,
	"promotion_id" integer NOT NULL,
	"project_ada_id" integer NOT NULL,
	CONSTRAINT "student_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_project_ada_id_projects_ada_id_fk" FOREIGN KEY ("project_ada_id") REFERENCES "public"."projects_ada"("id") ON DELETE no action ON UPDATE no action;