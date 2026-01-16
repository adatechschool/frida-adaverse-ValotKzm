"use client";
import React, { useState } from "react";

type Promotion = { id: number; name: string };
type ProjectAda = { id: number; title: string; slug: string };
type Result =
  | { success: true; slug: string; projectAdaSlug: string }
  | { success: false; error: string };

export default function AddProjectForm({
  promotions,
  projects,
  action,
  onCancel,
  onSuccess,
}: {
  promotions: Promotion[];
  projects: ProjectAda[];
  action: (formData: FormData) => Promise<Result>;
  onCancel: () => void;
  onSuccess: (message: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      const result = await action(fd);
      if (!result.success) {
        setError(result.error ?? "Erreur");
        setLoading(false);
        return;
      }
      onSuccess("Projet soumis avec succès !");
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 bg-neutral-600 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Soumettre un projet</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <label className="block mb-3">
        <span className="text-sm font-medium">Titre *</span>
        <input
          name="title"
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
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
        <input
          name="demo_url"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm font-medium">Thumbnail URL</span>
        <input
          name="thumbnail_url"
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium">Promotion *</span>
          <select
            name="promotion_id"
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          >
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
          <select
            name="project_ada_id"
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          >
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
        <button
          disabled={loading}
          type="submit"
          className="px-4 py-2 bg-violet-700 text-white rounded"
        >
          {loading ? "Envoi..." : "Soumettre"}
        </button>

        <button
          type="button"
          className="px-3 py-2 border rounded"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
