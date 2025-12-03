import { db } from "@/db/drizzle";
import { projectsAda, studentProjects } from "@/db/schema";
import { eq } from "drizzle-orm";

export type AddProjectResult =
  | { success: true; slug: string; projectAdaSlug: string }
  | { success: false; error: string };

export type AddProjectFn = (formData: FormData) => Promise<AddProjectResult>;

export default async function addProject(
  formData: FormData
): Promise<AddProjectResult> {
  "use server";
  try {
    const title = String(formData.get("title") ?? "").trim();
    const github_url = String(formData.get("github_url") ?? "").trim();
    const demo_url = (String(formData.get("demo_url") ?? "").trim() || null) as
      | string
      | null;
    const thumbnail_url = (String(formData.get("thumbnail_url") ?? "").trim() ||
      null) as string | null;
    const promotion_id = Number(formData.get("promotion_id"));
    const project_ada_id = Number(formData.get("project_ada_id"));

    if (!title || !github_url || !promotion_id || !project_ada_id) {
      return { success: false, error: "Champs obligatoires manquants" };
    }

    const slugify = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    let baseSlug = slugify(title);
    let slug = baseSlug;
    let idx = 1;

    let exists = await db
      .select({ id: studentProjects.id })
      .from(studentProjects)
      .where(eq(studentProjects.slug, slug));

    while (exists.length > 0) {
      slug = `${baseSlug}-${idx++}`;
      exists = await db
        .select({ id: studentProjects.id })
        .from(studentProjects)
        .where(eq(studentProjects.slug, slug));
    }

    await db.insert(studentProjects).values({
      title,
      slug,
      github_url,
      demo_url,
      thumbnail_url,
      promotion_id,
      project_ada_id,
    });

    const projectAdaRow = await db
      .select({ slug: projectsAda.slug })
      .from(projectsAda)
      .where(eq(projectsAda.id, project_ada_id));

    const projectAdaSlug = projectAdaRow?.[0]?.slug ?? "";

    return { success: true, slug, projectAdaSlug };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Erreur serveur" };
  }
}
