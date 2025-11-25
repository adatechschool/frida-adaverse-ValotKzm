import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";


export const projectsAda = pgTable("projects_ada", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
});

export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  start_date: timestamp("start_date").notNull(),
});

export const studentProjects = pgTable("student_projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  github_url: text("github_url").notNull(),
  demo_url: text("demo_url"),
  thumbnail_url: text("thumbnail_url").default(""),
  created_at: timestamp("created_at").defaultNow().notNull(),
  published_at: timestamp("published_at").default(sql`null`),
  promotion_id: integer("promotion_id").references(() => promotions.id).notNull(),
  project_ada_id: integer("project_ada_id").references(() => projectsAda.id).notNull(),
});
