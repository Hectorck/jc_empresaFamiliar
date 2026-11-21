import Link from "next/link";
import { obtenerConferencias } from "../lib/services-db";
import { Conference } from "../lib/services-types";

export const metadata = {
  title: "Conferencias | Juan Carlos Vargas",
  description: "Participa en nuestras conferencias sobre empresas familiares",
};

export default async function ConferenciasPage() {
  const conferencias = await obtenerConferencias({ status: "published" });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-EC", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <main className="min-h-screen py-20 px-4 md:px-8" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conferencias y Eventos
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--textSecondary)" }}>
            Aprende de expertos en empresas familiares y fortalece el futuro de tu negocio
          </p>
        </div>

        {/* Grid de conferencias */}
        {conferencias.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conferencias.map((conferencia) => (
              <Link
                key={conferencia.id}
                href={`/conferencias/${conferencia.slug}`}
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
                      src={conferencia.coverImage}
                      alt={conferencia.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Badge de fecha */}
                    <div className="absolute top-4 left-4">
                      <div
                        className="px-3 py-2 rounded-lg text-center"
                        style={{
                          background: "#E0A11A",
                          color: "#ffffff",
                        }}
                      >
                        <p className="text-xs font-medium uppercase">Fecha</p>
                        <p className="text-sm font-bold">{formatDate(conferencia.hero.date)}</p>
                      </div>
                    </div>
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
                      {conferencia.hero.category}
                    </span>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#E0A11A] transition-colors">
                      {conferencia.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--textSecondary)" }}
                    >
                      {conferencia.hero.briefDescription}
                    </p>

                    {/* Info del evento */}
                    <div className="flex items-center gap-4 text-sm mb-4" style={{ color: "var(--textSecondary)" }}>
                      <div className="flex items-center gap-1">
                        <span className="material-icons-round text-base">schedule</span>
                        <span>{formatTime(conferencia.hero.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-icons-round text-base">location_on</span>
                        <span className="capitalize">{conferencia.hero.modality}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#E0A11A" }}>
                      <span>Ver detalles</span>
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
              No hay conferencias programadas en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
