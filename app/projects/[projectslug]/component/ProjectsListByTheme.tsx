"use server"
import { db } from "@/db/drizzle";
import { studentProjects, promotions, projectsAda } from "@/db/schema";
import { desc, isNotNull, eq } from "drizzle-orm";
import ProjectCard from "@/app/components/ProjectCard";


export default async function ProjectsListByTheme({theme}: { theme: string}) {
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
      projectAdaSlug: projectsAda.slug
    })
    .from(studentProjects)
    .leftJoin(promotions, eq(promotions.id, studentProjects.promotion_id))
    .leftJoin(projectsAda, eq(projectsAda.id, studentProjects.project_ada_id))
    // .where(isNotNull(studentProjects.published_at))
    .where(eq(projectsAda.slug, theme))
    .orderBy(desc(studentProjects.published_at));

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projets publiés</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
}
