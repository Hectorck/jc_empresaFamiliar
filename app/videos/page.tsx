"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VideosPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de blogs unificada
    router.replace("/blogs");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <p>Redirigiendo a Artículos y Recursos...</p>
    </div>
  );
}
