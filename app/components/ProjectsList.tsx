import { db } from "@/db/drizzle";
import { studentProjects, promotions, projectsAda } from "@/db/schema";
import { desc, isNotNull, eq, asc } from "drizzle-orm";
import ProjectCard from "./ProjectCard";

export default async function ProjectsList() {
  const categories = await db
    .select({
      id: projectsAda.id,
      title: projectsAda.title,
      slug: projectsAda.slug,
    })
    .from(projectsAda)
    .orderBy(asc(projectsAda.title));

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
    // .where(isNotNull(studentProjects.published_at))
    .orderBy(desc(studentProjects.published_at));

  const groups = categories.map((cat) => ({
    category: cat,
    projects: projects.filter((p) => p.projectAdaSlug === cat.slug),
  }));


  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-bold mb-4">Projets publiés</h1>

      {groups.map(
        (g) =>
          g.projects.length > 0 && (
            <section key={g.category.slug} id={g.category.slug}>
              <header className="mb-4">
                <h2 className="text-xl font-semibold">{g.category.title}</h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {g.projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          )
      )}

    </main>
  );
}