"use client";

import React, { useState, useEffect } from "react";
import type { Speaker, SpeakerFormData } from "../../lib/services-types";
import {
  obtenerSpeakers,
  guardarSpeaker,
  eliminarSpeaker,
} from "../../lib/services-db";
import ImageUploadInput from "./ImageUploadInput";

interface SpeakersAdminPanelProps {
  onClose?: () => void;
}

const SpeakersAdminPanel: React.FC<SpeakersAdminPanelProps> = ({ onClose }) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Speaker | null>(null);
  const [search, setSearch] = useState("");

  // Form data
  const [formData, setFormData] = useState<SpeakerFormData>({
    name: "",
    photo: "",
    role: "",
    bio: "",
    experience: "",
    email: "",
    phone: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      website: "",
    },
    status: "active",
  });

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    setLoading(true);
    try {
      const data = await obtenerSpeakers();
      setSpeakers(data);
    } catch (error) {
      console.error("Error loading speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpeakers = speakers.filter((s) => {
    const searchLower = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(searchLower) ||
      s.role.toLowerCase().includes(searchLower) ||
      s.bio.toLowerCase().includes(searchLower)
    );
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editData) {
        await guardarSpeaker(formData, editData.id);
      } else {
        await guardarSpeaker(formData);
      }
      await loadSpeakers();
      setShowModal(false);
      setEditData(null);
      resetForm();
    } catch (error) {
      console.error("Error saving speaker:", error);
      alert("Error al guardar conferencista");
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditData(speaker);
    setFormData({
      name: speaker.name,
      photo: speaker.photo,
      role: speaker.role,
      bio: speaker.bio,
      experience: speaker.experience || "",
      email: speaker.email || "",
      phone: speaker.phone || "",
      socialLinks: speaker.socialLinks || {
        linkedin: "",
        twitter: "",
        website: "",
      },
      status: speaker.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este conferencista?")) {
      try {
        await eliminarSpeaker(id);
        await loadSpeakers();
      } catch (error) {
        console.error("Error deleting speaker:", error);
        alert("Error al eliminar conferencista");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      photo: "",
      role: "",
      bio: "",
      experience: "",
      email: "",
      phone: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        website: "",
      },
      status: "active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Conferencistas</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            Volver
          </button>
        )}
      </div>

      {/* Barra de búsqueda y acción */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-500 dark:text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar conferencista..."
            className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nuevo Conferencista
        </button>
      </div>

      {/* Lista de conferencistas */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="max-h-[65vh] overflow-auto">
          {loading ? (
            <div className="p-6 text-center text-slate-700 dark:text-slate-200">Cargando...</div>
          ) : filteredSpeakers.length === 0 ? (
            <div className="p-6 text-center text-slate-700 dark:text-slate-200">No hay conferencistas</div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="text-left font-semibold px-6 py-4 w-[15%]">Foto</th>
                  <th className="text-left font-semibold px-6 py-4 w-[25%]">Nombre</th>
                  <th className="text-left font-semibold px-4 py-4 w-[20%]">Cargo</th>
                  <th className="text-left font-semibold px-4 py-4 w-[15%]">Estado</th>
                  <th className="text-left font-semibold px-4 py-4 w-[25%]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpeakers.map((speaker) => (
                  <tr
                    key={speaker.id}
                    className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors align-middle"
                  >
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-600">
                        <img
                          src={speaker.photo || "/no-image.png"}
                          alt={speaker.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{speaker.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{speaker.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{speaker.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-medium ${
                          speaker.status === "active"
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {speaker.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-xs whitespace-nowrap">
                        <button
                          className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
                          onClick={() => handleEdit(speaker)}
                        >
                          Editar
                        </button>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <button
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                          onClick={() => handleDelete(speaker.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de edición/creación */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {editData ? "Editar Conferencista" : "Nuevo Conferencista"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <span className="material-icons-round text-slate-600 dark:text-slate-300">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white dark:bg-slate-800">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>

              <ImageUploadInput
                label="Foto"
                value={formData.photo}
                onChange={(value) => setFormData({ ...formData, photo: value })}
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2">Cargo/Rol *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Biografía *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experiencia</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <input
                  type="url"
                  value={formData.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={formData.socialLinks?.website || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, website: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </form>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakersAdminPanel;
