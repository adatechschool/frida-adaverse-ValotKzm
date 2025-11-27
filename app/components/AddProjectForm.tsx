"use client";

type Promotion = { id: number, name: string };
type ProjectAda = { id: number, title: string, slug: string };

export default function AddProjectForm({
  promotions,
  projects,
  action,
  onCancel,
}: {
  promotions: Promotion[];
  projects: ProjectAda[];
  action: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <form action={action} method="post" className="max-w-3xl mx-auto p-4 bg-neutral-600 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Soumettre un projet</h2>

      <label className="block mb-3">
        <span className="text-sm font-medium">Titre *</span>
        <input name="title" className="mt-1 block w-full border rounded px-3 py-2" required />
      </label>

      <label className="block mb-3">
        <span className="text-sm font-medium">URL GitHub *</span>
        <input
          name="github_url"
          type="url"
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm font-medium">URL Démo</span>
        <input name="demo_url" className="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <label className="block mb-3">
        <span className="text-sm font-medium">Thumbnail URL</span>
        <input name="thumbnail_url" className="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium">Promotion *</span>
          <select name="promotion_id" className="mt-1 block w-full border rounded px-3 py-2" required>
            <option value="">Sélectionner une promotion</option>
            {promotions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Projet (catégorie) *</span>
          <select name="project_ada_id" className="mt-1 block w-full border rounded px-3 py-2" required>
            <option value="">Sélectionner la catégorie du projet</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-violet-700 text-white rounded">
          Soumettre
        </button>

        <button type="button" className="px-3 py-2 border rounded" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}