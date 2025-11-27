"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddProjectForm from "./AddProjectForm";

type Theme = { title: string; slug: string; id: number };
type Promotion = { id: number; name: string };
type Result = { success: true; slug: string; projectAdaSlug: string } | { success: false; error: string };

export default function NavBar({
  themes,
  promotions,
  addProject,
}: {
  themes: Theme[];
  promotions: Promotion[];
  addProject: (formData: FormData) => Promise<Result>;
}) {
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!selected) return;
    router.push(`/projects/${selected}`);
  }

  function handleSuccess(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <nav className="w-full bg-neutral-600 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-700 text-white rounded flex items-center justify-center font-bold">AD</div>
            <span className="text-lg font-semibold">Adaverse</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <select aria-label="Choisir une catégorie" value={selected} onChange={(e) => setSelected(e.target.value)} className="rounded border px-3 py-2">
            <option value="">Choisir une catégorie</option>
            {themes.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>

          <button type="submit" className="px-4 py-2 bg-violet-700 text-white rounded hover:opacity-90 disabled:opacity-60" disabled={!selected}>
            Rechercher
          </button>

          <button type="button" className="px-4 py-2 bg-white text-black rounded hover:opacity-90" onClick={() => setOpen(true)}>
            Soumettre projet
          </button>
        </form>
      </div>

      {/* Toast message */}
      {toast && <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow">{toast}</div>}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-violet-500/50 rounded-lg shadow-lg max-w-3xl w-full p-4 relative">
            <button className="absolute top-5 right-5 text-white" onClick={() => setOpen(false)} aria-label="Fermer">
              ✕
            </button>
            <AddProjectForm
              promotions={promotions}
              projects={themes}
              action={addProject}
              onCancel={() => setOpen(false)}
              onSuccess={(msg) => {
                setOpen(false);
                handleSuccess(msg);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
}