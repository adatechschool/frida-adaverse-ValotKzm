"use server";
import { db } from "@/db/drizzle";
import { projectsAda, promotions, studentProjects } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export default async function ProjectCardDetail({
  theme,
  title,
}: {
  theme: string;
  title: string;
}) {
  const project = await db
    .select({
      id: studentProjects.id,
      title: studentProjects.title,
      slug: studentProjects.slug,
      github_url: studentProjects.github_url,
      demo_url: studentProjects.demo_url,
      thumbnail_url: studentProjects.thumbnail_url,
      published_at: studentProjects.published_at,
      promotionName: promotions.name,
      projectAdaTitle: projectsAda.title,
      projectAdaSlug: projectsAda.slug,
    })
    .from(studentProjects)
    .leftJoin(promotions, eq(promotions.id, studentProjects.promotion_id))
    .leftJoin(projectsAda, eq(projectsAda.id, studentProjects.project_ada_id))
    .where(and(eq(projectsAda.slug, theme), eq(studentProjects.slug, title)))
    .orderBy(desc(studentProjects.published_at));

  const p = project[0];

  if (!p) {
    return (
      <div className="p-6">
        <p>Ce projet n'existe pas</p>
      </div>
    );
  }

  return (
    <article className="p-6 max-w-4xl mx-auto">
      <header className="mb-4 flex justify-center">
        <h1 className="text-3xl font-bold mb-1">{p.title}</h1>
      </header>
      {p.thumbnail_url ? (
        <img
          src={p.thumbnail_url}
          alt={p.title ?? "Thumbnail du projet"}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500">Pas d'image</span>
        </div>
      )}

      <header className="mb-4">
        <div className="text-sm text-gray-600">
          {p.projectAdaTitle && (
            <span className="mr-3">Catégorie : {p.projectAdaTitle}</span>
          )}
          {p.promotionName && <span>Promotion : {p.promotionName}</span>}
        </div>
      </header>

      <div className="flex gap-3 mb-6 justify-center">
        {p.github_url && (
          <a
            href={p.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-violet-950 text-white rounded hover:opacity-90"
          >
            Voir le repo
          </a>
        )}

        {p.demo_url && (
          <a
            href={p.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-lime-600 text-white rounded hover:opacity-90"
          >
            Voir la démo
          </a>
        )}
      </div>

      {p.published_at && (
        <div className="text-sm text-gray-500 mb-6">
          Publié le {new Date(p.published_at).toLocaleDateString("fr-FR")}
        </div>
      )}
    </article>
  );
}
