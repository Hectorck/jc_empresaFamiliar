"use client";

import React, { useState, useEffect } from "react";
import { Conference, ConferenceFormData, Speaker } from "../../lib/services-types";
import { generarSlugUnico, obtenerSpeakers } from "../../lib/services-db";
import ImageUploadInput from "./ImageUploadInput";

interface ConferenceFormModalProps {
  show: boolean;
  initialData?: Conference | null;
  onClose: () => void;
  onSave: (data: ConferenceFormData) => Promise<void>;
}

const ConferenceFormModal: React.FC<ConferenceFormModalProps> = ({
  show,
  initialData,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "hero" | "topics" | "speakers" | "eventInfo" | "learning" | "faq" | "cta">("basic");
  const [availableSpeakers, setAvailableSpeakers] = useState<Speaker[]>([]);

  const [formData, setFormData] = useState<ConferenceFormData>({
    title: "",
    slug: "",
    categoryId: "",
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    coverImage: "",
    hero: {
      category: "",
      subtitle: "",
      briefDescription: "",
      date: "",
      startTime: "",
      endTime: "",
      modality: "presencial",
      location: "",
    },
    description: {
      title: "Sobre la conferencia",
      description: "",
      image: "",
      visible: true,
    },
    topics: {
      title: "Temáticas que se abordarán",
      description: "",
      topics: [],
      visible: true,
    },
    speakers: {
      title: "Nuestros conferencistas",
      description: "",
      speakers: [],
      visible: true,
    },
    eventInfo: {
      date: "",
      startTime: "",
      endTime: "",
      duration: "",
      modality: "presencial",
      location: "",
      capacity: undefined,
      targetAudience: "",
      price: "",
      additionalInfo: "",
      visible: true,
    },
    learningOutcomes: {
      title: "¿Qué aprenderán los participantes?",
      description: "",
      outcomes: [],
      visible: true,
    },
    faqs: {
      title: "Preguntas frecuentes",
      faqs: [],
      visible: true,
    },
    cta: {
      title: "¿Listo para participar?",
      description: "",
      buttonText: "Solicitar información",
      whatsappNumber: "593995359762",
      visible: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData as any);
    } else {
      setFormData({
        title: "",
        slug: "",
        categoryId: "",
        status: "draft",
        featured: false,
        metaTitle: "",
        metaDescription: "",
        coverImage: "",
        hero: {
          category: "",
          subtitle: "",
          briefDescription: "",
          date: "",
          startTime: "",
          endTime: "",
          modality: "presencial",
          location: "",
        },
        description: {
          title: "Sobre la conferencia",
          description: "",
          image: "",
          visible: true,
        },
        topics: {
          title: "Temáticas que se abordarán",
          description: "",
          topics: [],
          visible: true,
        },
        speakers: {
          title: "Nuestros conferencistas",
          description: "",
          speakers: [],
          visible: true,
        },
        eventInfo: {
          date: "",
          startTime: "",
          endTime: "",
          duration: "",
          modality: "presencial",
          location: "",
          capacity: undefined,
          targetAudience: "",
          price: "",
          additionalInfo: "",
          visible: true,
        },
        learningOutcomes: {
          title: "¿Qué aprenderán los participantes?",
          description: "",
          outcomes: [],
          visible: true,
        },
        faqs: {
          title: "Preguntas frecuentes",
          faqs: [],
          visible: true,
        },
        cta: {
          title: "¿Listo para participar?",
          description: "",
          buttonText: "Solicitar información",
          whatsappNumber: "593995359762",
          visible: true,
        },
      });
    }

    // Cargar conferencistas disponibles
    loadSpeakers();
  }, [initialData, show]);

  const loadSpeakers = async () => {
    try {
      const speakers = await obtenerSpeakers({ status: "active" });
      setAvailableSpeakers(speakers);
    } catch (error) {
      console.error("Error loading speakers:", error);
    }
  };

  const handleTitleChange = async (value: string) => {
    setFormData({ ...formData, title: value });
    if (!initialData) {
      const slug = await generarSlugUnico(value);
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Asegurar que el slug siempre esté definido
      let dataToSave = { ...formData };
      if (!dataToSave.slug || dataToSave.slug.trim() === "") {
        const slug = await generarSlugUnico(dataToSave.title);
        dataToSave = { ...dataToSave, slug };
      }
      await onSave(dataToSave);
    } finally {
      setLoading(false);
    }
  };

  const addTopic = () => {
    setFormData({
      ...formData,
      topics: {
        ...formData.topics,
        topics: [...formData.topics.topics, { title: "", description: "" }],
      },
    });
  };

  const removeTopic = (index: number) => {
    setFormData({
      ...formData,
      topics: {
        ...formData.topics,
        topics: formData.topics.topics.filter((_, i) => i !== index),
      },
    });
  };

  const addSpeaker = () => {
    setFormData({
      ...formData,
      speakers: {
        ...formData.speakers,
        speakers: [
          ...formData.speakers.speakers,
          { speakerId: "" },
        ],
      },
    });
  };

  const removeSpeaker = (index: number) => {
    setFormData({
      ...formData,
      speakers: {
        ...formData.speakers,
        speakers: formData.speakers.speakers.filter((_, i) => i !== index),
      },
    });
  };

  const handleSpeakerChange = (index: number, speakerId: string) => {
    const newSpeakers = [...formData.speakers.speakers];
    newSpeakers[index] = { speakerId };
    setFormData({ ...formData, speakers: { ...formData.speakers, speakers: newSpeakers } });
  };

  const addLearningOutcome = () => {
    setFormData({
      ...formData,
      learningOutcomes: {
        ...formData.learningOutcomes,
        outcomes: [...formData.learningOutcomes.outcomes, { title: "", description: "" }],
      },
    });
  };

  const removeLearningOutcome = (index: number) => {
    setFormData({
      ...formData,
      learningOutcomes: {
        ...formData.learningOutcomes,
        outcomes: formData.learningOutcomes.outcomes.filter((_, i) => i !== index),
      },
    });
  };

  const addFAQ = () => {
    setFormData({
      ...formData,
      faqs: {
        ...formData.faqs,
        faqs: [...formData.faqs.faqs, { question: "", answer: "" }],
      },
    });
  };

  const removeFAQ = (index: number) => {
    setFormData({
      ...formData,
      faqs: {
        ...formData.faqs,
        faqs: formData.faqs.faqs.filter((_, i) => i !== index),
      },
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {initialData ? "Editar Conferencia" : "Nueva Conferencia"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-300">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          {[
            { id: "basic", label: "Básico" },
            { id: "hero", label: "Hero" },
            { id: "topics", label: "Temáticas" },
            { id: "speakers", label: "Conferencistas" },
            { id: "eventInfo", label: "Info Evento" },
            { id: "learning", label: "Aprendizajes" },
            { id: "faq", label: "FAQ" },
            { id: "cta", label: "CTA" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 font-medium text-center whitespace-nowrap min-w-[120px] ${
                activeTab === tab.id
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-800">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Categoría *</label>
                <input
                  type="text"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>

              <ImageUploadInput
                label="Imagen de portada"
                value={formData.coverImage}
                onChange={(value) => setFormData({ ...formData, coverImage: value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                    <option value="hidden">Oculto</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Destacado</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Meta Title (SEO)</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Meta Description (SEO)</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Categoría</label>
                <input
                  type="text"
                  value={formData.hero.category}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, category: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Subtítulo</label>
                <input
                  type="text"
                  value={formData.hero.subtitle}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción breve</label>
                <textarea
                  value={formData.hero.briefDescription}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, briefDescription: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Fecha *</label>
                  <input
                    type="date"
                    value={formData.hero.date}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, date: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hora inicio *</label>
                  <input
                    type="time"
                    value={formData.hero.startTime}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, startTime: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hora fin</label>
                  <input
                    type="time"
                    value={formData.hero.endTime}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, endTime: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Modalidad *</label>
                  <select
                    value={formData.hero.modality}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, modality: e.target.value as any } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    required
                  >
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                    <option value="híbrido">Híbrido</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Ubicación *</label>
                <input
                  type="text"
                  value={formData.hero.location}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, location: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Temáticas</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.topics.visible}
                    onChange={(e) => setFormData({ ...formData, topics: { ...formData.topics, visible: e.target.checked } })}
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.topics.title}
                  onChange={(e) => setFormData({ ...formData, topics: { ...formData.topics, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                <textarea
                  value={formData.topics.description}
                  onChange={(e) => setFormData({ ...formData, topics: { ...formData.topics, description: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              {formData.topics.topics.map((topic, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Temática {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={topic.title}
                      onChange={(e) => {
                        const newTopics = [...formData.topics.topics];
                        newTopics[index] = { ...topic, title: e.target.value };
                        setFormData({ ...formData, topics: { ...formData.topics, topics: newTopics } });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={topic.description}
                      onChange={(e) => {
                        const newTopics = [...formData.topics.topics];
                        newTopics[index] = { ...topic, description: e.target.value };
                        setFormData({ ...formData, topics: { ...formData.topics, topics: newTopics } });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-20"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTopic}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Agregar temática
              </button>
            </div>
          )}

          {activeTab === "speakers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Conferencistas</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.speakers.visible}
                    onChange={(e) => setFormData({ ...formData, speakers: { ...formData.speakers, visible: e.target.checked } })}
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.speakers.title}
                  onChange={(e) => setFormData({ ...formData, speakers: { ...formData.speakers, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                <textarea
                  value={formData.speakers.description}
                  onChange={(e) => setFormData({ ...formData, speakers: { ...formData.speakers, description: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              {formData.speakers.speakers.map((speaker, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Conferencista {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeSpeaker(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Seleccionar Conferencista *</label>
                    <select
                      value={speaker.speakerId}
                      onChange={(e) => handleSpeakerChange(index, e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                      required
                    >
                      <option value="">-- Seleccionar conferencista --</option>
                      {availableSpeakers.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.name} - {sp.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {speaker.speakerId && (() => {
                    const selectedSpeaker = availableSpeakers.find(s => s.id === speaker.speakerId);
                    if (!selectedSpeaker) return null;
                    return (
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={selectedSpeaker.photo || "/no-image.png"}
                              alt={selectedSpeaker.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-semibold">{selectedSpeaker.name}</div>
                            <div className="text-sm text-gray-600">{selectedSpeaker.role}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Biografía:</strong> {selectedSpeaker.bio}
                        </div>
                        {selectedSpeaker.experience && (
                          <div className="text-sm text-gray-700">
                            <strong>Experiencia:</strong> {selectedSpeaker.experience}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ))}

              <button
                type="button"
                onClick={addSpeaker}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Agregar conferencista
              </button>

              {availableSpeakers.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
                  No hay conferencistas disponibles. Ve a la sección "Conferencistas" para crear uno primero.
                </div>
              )}
            </div>
          )}

          {activeTab === "eventInfo" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Información del evento</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.eventInfo.visible}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, visible: e.target.checked } })}
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Fecha</label>
                  <input
                    type="date"
                    value={formData.eventInfo.date}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, date: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hora inicio</label>
                  <input
                    type="time"
                    value={formData.eventInfo.startTime}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, startTime: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hora fin</label>
                  <input
                    type="time"
                    value={formData.eventInfo.endTime}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, endTime: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Duración</label>
                  <input
                    type="text"
                    value={formData.eventInfo.duration}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, duration: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    placeholder="2 horas"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Modalidad</label>
                  <select
                    value={formData.eventInfo.modality}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, modality: e.target.value as any } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  >
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                    <option value="híbrido">Híbrido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Ubicación</label>
                  <input
                    type="text"
                    value={formData.eventInfo.location}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, location: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Capacidad</label>
                  <input
                    type="number"
                    value={formData.eventInfo.capacity}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, capacity: e.target.value ? parseInt(e.target.value) : undefined } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Precio</label>
                  <input
                    type="text"
                    value={formData.eventInfo.price}
                    onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, price: e.target.value } })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    placeholder="$50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Público objetivo</label>
                <input
                  type="text"
                  value={formData.eventInfo.targetAudience}
                  onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, targetAudience: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Información adicional</label>
                <textarea
                  value={formData.eventInfo.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, eventInfo: { ...formData.eventInfo, additionalInfo: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>
            </div>
          )}

          {activeTab === "learning" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Aprendizajes esperados</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.learningOutcomes.visible}
                    onChange={(e) => setFormData({ ...formData, learningOutcomes: { ...formData.learningOutcomes, visible: e.target.checked } })}
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.learningOutcomes.title}
                  onChange={(e) => setFormData({ ...formData, learningOutcomes: { ...formData.learningOutcomes, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                <textarea
                  value={formData.learningOutcomes.description}
                  onChange={(e) => setFormData({ ...formData, learningOutcomes: { ...formData.learningOutcomes, description: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              {formData.learningOutcomes.outcomes.map((outcome, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Aprendizaje {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeLearningOutcome(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={outcome.title}
                      onChange={(e) => {
                        const newOutcomes = [...formData.learningOutcomes.outcomes];
                        newOutcomes[index] = { ...outcome, title: e.target.value };
                        setFormData({ ...formData, learningOutcomes: { ...formData.learningOutcomes, outcomes: newOutcomes } });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={outcome.description}
                      onChange={(e) => {
                        const newOutcomes = [...formData.learningOutcomes.outcomes];
                        newOutcomes[index] = { ...outcome, description: e.target.value };
                        setFormData({ ...formData, learningOutcomes: { ...formData.learningOutcomes, outcomes: newOutcomes } });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-20"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addLearningOutcome}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Agregar aprendizaje
              </button>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Preguntas frecuentes</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.faqs.visible}
                    onChange={(e) => setFormData({ ...formData, faqs: { ...formData.faqs, visible: e.target.checked } })}
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.faqs.title}
                  onChange={(e) => setFormData({ ...formData, faqs: { ...formData.faqs, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              {formData.faqs.faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">FAQ {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeFAQ(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Pregunta</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const newFAQs = [...formData.faqs.faqs];
                        newFAQs[index] = { ...faq, question: e.target.value };
                        setFormData({ ...formData, faqs: { ...formData.faqs, faqs: newFAQs } });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Respuesta</label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => {
                        const newFAQs = [...formData.faqs.faqs];
                        newFAQs[index] = { ...faq, answer: e.target.value };
                        setFormData({ ...formData, faqs: { ...formData.faqs, faqs: newFAQs } });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-20"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addFAQ}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Agregar FAQ
              </button>
            </div>
          )}

          {activeTab === "cta" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">CTA Final</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.cta.visible}
                    onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, visible: e.target.checked } })}
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                <input
                  type="text"
                  value={formData.cta.title}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                <textarea
                  value={formData.cta.description}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, description: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Texto del botón</label>
                <input
                  type="text"
                  value={formData.cta.buttonText}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, buttonText: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Número de WhatsApp</label>
                <input
                  type="text"
                  value={formData.cta.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, whatsappNumber: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  placeholder="593995359762"
                />
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConferenceFormModal;
