import ProjectCardDetail from "./ProjectCardDetail";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectslug: string, titleslug: string }>;
}) {
  const { projectslug: projectSlug, titleslug: titleSlug } = await params;
  return (
    <div>
      Projet par thème : {projectSlug}
      <ProjectCardDetail theme={projectSlug} title={titleSlug} />
    </div>
  );
}