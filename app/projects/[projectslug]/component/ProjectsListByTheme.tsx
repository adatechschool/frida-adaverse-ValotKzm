"use server";
import { db } from "@/db/drizzle";
import { studentProjects, promotions, projectsAda } from "@/db/schema";
import { desc, isNotNull, eq, and } from "drizzle-orm";
import ProjectCard from "@/app/components/ProjectCard";

export default async function ProjectsListByTheme({
  theme,
}: {
  theme: string;
}) {
  const projects = await db
    .select({
      id: studentProjects.id,
      title: studentProjects.title,
      slug: studentProjects.slug,
      github_url: studentProjects.github_url,
      demo_url: studentProjects.demo_url,
      thumbnail_url: studentProjects.thumbnail_url,
      published_at: studentProjects.published_at,
      promotion: promotions.name,
      projectAda: projectsAda.title,
      projectAdaSlug: projectsAda.slug,
    })
    .from(studentProjects)
    .leftJoin(promotions, eq(promotions.id, studentProjects.promotion_id))
    .leftJoin(projectsAda, eq(projectsAda.id, studentProjects.project_ada_id))
    .where(
      and(eq(projectsAda.slug, theme), isNotNull(studentProjects.published_at))
    )
    .orderBy(desc(studentProjects.published_at));

  const p = projects[0];

  if (!p) {
    return (
      <div className="p-6 space-y-10">
        <p>Aucun Projets pour ce thème</p>
      </div>
    );
  }
  return (
    <main className="p-6 space-y-10">
      <header className="text-2xl font-bold mb-4">
        <h2>Projets publiés pour {projects[0].projectAda}</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
}
