"use client";
import React, { useState, useEffect } from "react";
import type { Service, Conference } from "../../lib/services-types";
import {
  obtenerServicios,
  obtenerConferencias,
  guardarServicio,
  guardarConferencia,
  eliminarContenido,
  generarSlugUnico
} from "../../lib/services-db";
import ServiceFormModal from "./ServiceFormModal";
import ConferenceFormModal from "./ConferenceFormModal";
import SpeakersAdminPanel from "./SpeakersAdminPanel";


export default function AdminInventario() {

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Service | Conference | null>(null);
  const [contentType, setContentType] = useState<"service" | "conference">("service");
  const [servicios, setServicios] = useState<Service[]>([]);
  const [conferencias, setConferencias] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [vista, setVista] = useState<"servicios" | "conferencias" | "conferencistas">("servicios");

  // 📊 Resumen
  const resumen = React.useMemo(() => {
    return {
      servicios: servicios.length,
      conferencias: conferencias.length,
      total: servicios.length + conferencias.length,
    };
  }, [servicios, conferencias]);

  // 🔄 Cargar contenidos
  useEffect(() => {
    async function fetchContenidos() {
      setLoading(true);
      const [servs, confs] = await Promise.all([
        obtenerServicios(),
        obtenerConferencias()
      ]);
      setServicios(servs);
      setConferencias(confs);
      setLoading(false);
    }

    fetchContenidos();
  }, []);

  const contenidosActuales = vista === "servicios" ? servicios : conferencias;

  const contenidosFiltrados = contenidosActuales
    .filter((c) => {
      const texto = search.trim().toLowerCase();
      const titulo = c.title?.toLowerCase() || "";
      const desc = vista === "servicios"
        ? (c as Service).briefDescription?.toLowerCase() || ""
        : (c as Conference).hero.briefDescription?.toLowerCase() || "";
      if (texto && !titulo.includes(texto) && !desc.includes(texto)) return false;
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      <div className="flex-1 w-full py-6 sm:py-15 px-4 pt-4 pb-24">

        {/* NAV ADMIN */}
        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
              vista === "servicios"
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-purple-700 dark:border-purple-500"
            }`}
            onClick={() => setVista("servicios")}
          >
            Servicios
          </button>

          <button
            className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
              vista === "conferencias"
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-500"
            }`}
            onClick={() => setVista("conferencias")}
          >
            Conferencias
          </button>

          <button
            className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
              vista === "conferencistas"
                ? "bg-green-700 text-white border-green-700"
                : "bg-white dark:bg-slate-800 text-green-700 dark:text-green-300 border-green-700 dark:border-green-500"
            }`}
            onClick={() => setVista("conferencistas")}
          >
            Conferencistas
          </button>
        </div>

        {/* ================== VISTA SERVICIOS / CONFERENCIAS / CONFERENCISTAS ================== */}
        {vista === "conferencistas" ? (
          <SpeakersAdminPanel />
        ) : (
          <>
            {/* RESUMEN */}
            <div className="flex gap-8 items-center mb-4 text-base text-slate-700 dark:text-slate-200">
              <div>Servicios: <b>{resumen.servicios}</b></div>
              <div>Conferencias: <b>{resumen.conferencias}</b></div>
              <div>Total: <b>{resumen.total}</b></div>
            </div>

            {/* BARRA DE FILTROS PRINCIPAL */}
            <div className="flex items-center gap-3 mb-4 flex-wrap text-slate-700 dark:text-slate-200">
              <div className="flex-1 min-w-55">
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-500 dark:text-slate-400">search</span>
                  <input
                    type="text"
                    placeholder={`Buscar ${vista === "servicios" ? "servicio" : "conferencia"}...`}
                    className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  className="px-4 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                  onClick={() => {
                    setContentType(vista === "servicios" ? "service" : "conference");
                    setShowForm(true);
                  }}
                >
                  Registrar {vista === "servicios" ? "servicio" : "conferencia"}
                </button>
              </div>
            </div>

            {/* LISTA DE CONTENIDOS */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="max-h-[65vh] overflow-auto">
                {loading ? (
                  <div className="p-6 text-center text-slate-700 dark:text-slate-200">Cargando...</div>
                ) : contenidosFiltrados.length === 0 ? (
                  <div className="p-6 text-center text-slate-700 dark:text-slate-200">
                    No hay {vista === "servicios" ? "servicios" : "conferencias"}
                  </div>
                ) : (
                  <table className="w-full min-w-245 table-fixed">
                    <thead className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600">
                      <tr>
                        <th className="text-left font-semibold px-6 py-4 w-[50%]">
                          {vista === "servicios" ? "Servicio" : "Conferencia"}
                        </th>
                        <th className="text-left font-semibold px-4 py-4 w-[15%]">Estado</th>
                        <th className="text-left font-semibold px-4 py-4 w-[20%]">Fecha actualización</th>
                        <th className="text-left font-semibold px-4 py-4 w-[15%]">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contenidosFiltrados.map((c) => {
                        const thumb = c.coverImage || "/no-image.png";
                        const fecha = c.createdAt ? new Date(c.createdAt).toLocaleString() : "-";
                        const estado = c.status === "published" ? "Publicado" : c.status === "draft" ? "Borrador" : "Oculto";
                        const estadoColor = c.status === "published" ? "text-green-600 dark:text-green-400" : c.status === "draft" ? "text-yellow-600 dark:text-yellow-400" : "text-gray-600 dark:text-gray-400";

                        return (
                          <tr key={c.id} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors align-middle">
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-600">
                                  <img src={thumb} alt={c.title} className="object-cover w-full h-full" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-semibold text-slate-800 dark:text-slate-100 truncate">{c.title}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Slug: {c.slug}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-800 dark:text-slate-200 whitespace-nowrap">
                              <span className={`font-medium ${estadoColor}`}>{estado}</span>
                            </td>
                            <td className="px-4 py-3 text-slate-800 dark:text-slate-200 whitespace-nowrap">{fecha}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 text-xs whitespace-nowrap">
                                <button
                                  className="text-rose-600 dark:text-rose-400 font-medium hover:text-rose-700 dark:hover:text-rose-300"
                                  onClick={() => {
                                    setEditData(c);
                                    setContentType(c.type);
                                    setShowForm(true);
                                  }}
                                >
                                  Editar
                                </button>
                                <span className="text-slate-300 dark:text-slate-600">|</span>
                                <button
                                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                  onClick={async () => {
                                    if (confirm(`¿Eliminar este ${vista === "servicios" ? "servicio" : "conferencia"}?`)) {
                                      await eliminarContenido(c.id);
                                      const [servs, confs] = await Promise.all([
                                        obtenerServicios(),
                                        obtenerConferencias()
                                      ]);
                                      setServicios(servs);
                                      setConferencias(confs);
                                    }
                                  }}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}

        {/* MODAL SERVICIO */}
        <ServiceFormModal
          show={showForm && contentType === "service"}
          initialData={editData as Service | null}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
          onSave={async (data) => {
            if (editData) {
              await guardarServicio(data, editData.id);
            } else {
              await guardarServicio(data);
            }
            const [servs, confs] = await Promise.all([
              obtenerServicios(),
              obtenerConferencias()
            ]);
            setServicios(servs);
            setConferencias(confs);
            setShowForm(false);
            setEditData(null);
          }}
        />

        {/* MODAL CONFERENCIA */}
        <ConferenceFormModal
          show={showForm && contentType === "conference"}
          initialData={editData as Conference | null}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
          onSave={async (data) => {
            if (editData) {
              await guardarConferencia(data, editData.id);
            } else {
              await guardarConferencia(data);
            }
            const [servs, confs] = await Promise.all([
              obtenerServicios(),
              obtenerConferencias()
            ]);
            setServicios(servs);
            setConferencias(confs);
            setShowForm(false);
            setEditData(null);
          }}
        />

      </div>
    </div>
  );
}
