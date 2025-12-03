import ProjectCardDetail from "./component/ProjectCardDetail";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectslug: string; titleslug: string }>;
}) {
  const { projectslug: projectSlug, titleslug: titleSlug } = await params;
  return (
    <div>
      <ProjectCardDetail theme={projectSlug} title={titleSlug} />
    </div>
  );
}
