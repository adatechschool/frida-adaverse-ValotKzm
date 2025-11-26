import { db } from "@/db/drizzle"
import { projectsAda, promotions, studentProjects } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"

export default async function ProjectCardDetail({theme, title}: { theme: string, title: string}) {
  const project = await db
  .select()
  .from(studentProjects)
  .leftJoin(promotions, eq(promotions.id, studentProjects.promotion_id))
  .leftJoin(projectsAda,eq(projectsAda.id, studentProjects.project_ada_id))
  .where(and(
    eq(projectsAda.slug,theme),
    eq(studentProjects.slug, title)
  ))
  .orderBy(desc(studentProjects.published_at))

  if (project[0] === undefined) {
    console.log("le projet existe pas")
    return (
        <div>Ce projet n'existe pas</div>
    )
  }
  if (project[0]) {
    console.log("hello")
    return (
        <div>{project[0].student_projects.title} avec <a href={project[0].student_projects.github_url}>ce github</a></div>
    )
  }
//   const data = project[0]

//   console.log(project[0].student_projects.title)
  return (
    <div>
        {/* {data.student_projects.title} */}
    </div>
  )
}