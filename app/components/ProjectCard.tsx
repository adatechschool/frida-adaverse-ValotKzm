import Link from "next/link";

export default function ProjectCard({ project }: any) {
//   const thumbnail =
//     project.thumbnail_url && project.thumbnail_url.length > 0
//       ? project.thumbnail_url
//       : "/images/default-thumb.png";

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="border rounded p-4 hover:bg-gray-50 transition">
        {/* <img
          src={thumbnail}
          className="w-full h-40 object-cover rounded mb-3"
          alt={project.title}
        /> */}
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <p className="text-sm text-gray-600">
          {project.projectAda} – {project.promotion}
        </p>
        <p className="text-xs text-gray-500">
          Publié le {project.published_at?.toLocaleDateString("fr-FR")}
        </p>
      </div>
    </Link>
  );
}