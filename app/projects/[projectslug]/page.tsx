import ProjectsListByTheme from "./component/ProjectsListByTheme";

export default async function ProjectByTheme({
  params,
}: {
  params: Promise<{ projectslug: string }>;
}) {
  const { projectslug: projectSlug } = await params;
  return (
    <div>
      Projet par thème : {projectSlug}
      <ProjectsListByTheme theme={projectSlug} />
    </div>
  );
}