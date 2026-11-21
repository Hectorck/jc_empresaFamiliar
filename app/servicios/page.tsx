import Link from "next/link";
import { obtenerServicios } from "../lib/services-db";
import { Service } from "../lib/services-types";

export const metadata = {
  title: "Servicios | Juan Carlos Vargas",
  description: "Descubre nuestros servicios de asesoría para empresas familiares",
};

export default async function ServiciosPage() {
  const servicios = await obtenerServicios({ status: "published" });

  return (
    <main className="min-h-screen py-20 px-4 md:px-8" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--textSecondary)" }}>
            Soluciones integrales para empresas familiares que buscan perdurar y crecer
          </p>
        </div>

        {/* Grid de servicios */}
        {servicios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <Link
                key={servicio.id}
                href={`/servicios/${servicio.slug}`}
                className="group"
              >
                <div
                  className="rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:scale-105"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {/* Imagen */}
                  <div className="aspect-video w-full relative overflow-hidden">
                    <img
                      src={servicio.coverImage}
                      alt={servicio.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{
                        background: "rgba(224, 161, 26, 0.1)",
                        color: "#E0A11A",
                      }}
                    >
                      {servicio.category}
                    </span>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#E0A11A] transition-colors">
                      {servicio.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--textSecondary)" }}
                    >
                      {servicio.briefDescription}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#E0A11A" }}>
                      <span>Ver más</span>
                      <span className="material-icons-round text-base">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--textSecondary)" }}>
              No hay servicios publicados en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
