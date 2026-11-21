"use client";

import React, { useState, useEffect } from "react";
import { Service, ServiceFormData, Speaker } from "../../lib/services-types";
import { generarSlugUnico, obtenerSpeakers } from "../../lib/services-db";
import ImageUploadInput from "./ImageUploadInput";

interface ServiceFormModalProps {
  show: boolean;
  initialData?: Service | null;
  onClose: () => void;
  onSave: (data: ServiceFormData) => Promise<void>;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  show,
  initialData,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "details" | "benefits" | "methodology" | "specialist" | "faq" | "cta">("basic");
  const [availableSpeakers, setAvailableSpeakers] = useState<Speaker[]>([]);

  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    slug: "",
    categoryId: "",
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    coverImage: "",
    category: "",
    subtitle: "",
    briefDescription: "",
    whatIsSection: {
      title: "¿En qué consiste este servicio?",
      description: "",
      image: "",
      visible: true,
    },
    targetAudience: {
      title: "¿A quién está dirigido?",
      description: "",
      profiles: [],
      visible: true,
    },
    benefits: {
      title: "Beneficios del servicio",
      benefits: [],
      visible: true,
    },
    includes: {
      title: "¿Qué incluye?",
      description: "",
      items: [],
      visible: true,
    },
    methodology: {
      title: "Metodología de trabajo",
      description: "",
      steps: [],
      visible: true,
    },
    specialist: {
      title: "Especialista responsable",
      specialist: {
        name: "",
        photo: "",
        role: "",
        bio: "",
        speakerId: "",
      },
      visible: false,
    },
    faqs: {
      title: "Preguntas frecuentes",
      faqs: [],
      visible: true,
    },
    cta: {
      title: "¿Listo para comenzar?",
      description: "",
      buttonText: "Solicitar asesoría",
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
        category: "",
        subtitle: "",
        briefDescription: "",
        whatIsSection: {
          title: "¿En qué consiste este servicio?",
          description: "",
          image: "",
          visible: true,
        },
        targetAudience: {
          title: "¿A quién está dirigido?",
          description: "",
          profiles: [],
          visible: true,
        },
        benefits: {
          title: "Beneficios del servicio",
          benefits: [],
          visible: true,
        },
        includes: {
          title: "¿Qué incluye?",
          description: "",
          items: [],
          visible: true,
        },
        methodology: {
          title: "Metodología de trabajo",
          description: "",
          steps: [],
          visible: true,
        },
        specialist: {
          title: "Especialista responsable",
          specialist: {
            speakerId: "",
          },
          visible: false,
        },
        faqs: {
          title: "Preguntas frecuentes",
          faqs: [],
          visible: true,
        },
        cta: {
          title: "¿Listo para comenzar?",
          description: "",
          buttonText: "Solicitar asesoría",
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

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: {
        ...formData.benefits,
        benefits: [
          ...formData.benefits.benefits,
          { icon: "star", title: "", description: "" },
        ],
      },
    });
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: {
        ...formData.benefits,
        benefits: formData.benefits.benefits.filter((_, i) => i !== index),
      },
    });
  };

  const addProfile = () => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        profiles: [...formData.targetAudience.profiles, ""],
      },
    });
  };

  const removeProfile = (index: number) => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        profiles: formData.targetAudience.profiles.filter((_, i) => i !== index),
      },
    });
  };

  const addIncludeItem = () => {
    setFormData({
      ...formData,
      includes: {
        ...formData.includes,
        items: [...formData.includes.items, ""],
      },
    });
  };

  const removeIncludeItem = (index: number) => {
    setFormData({
      ...formData,
      includes: {
        ...formData.includes,
        items: formData.includes.items.filter((_, i) => i !== index),
      },
    });
  };

  const addMethodologyStep = () => {
    const stepNumber = formData.methodology.steps.length + 1;
    setFormData({
      ...formData,
      methodology: {
        ...formData.methodology,
        steps: [
          ...formData.methodology.steps,
          { number: stepNumber, title: "", description: "" },
        ],
      },
    });
  };

  const removeMethodologyStep = (index: number) => {
    setFormData({
      ...formData,
      methodology: {
        ...formData.methodology,
        steps: formData.methodology.steps.filter((_, i) => i !== index),
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
            {initialData ? "Editar Servicio" : "Nuevo Servicio"}
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
            { id: "details", label: "Detalles" },
            { id: "benefits", label: "Beneficios" },
            { id: "methodology", label: "Metodología" },
            { id: "specialist", label: "Especialista" },
            { id: "faq", label: "FAQ" },
            { id: "cta", label: "CTA" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 font-medium text-center whitespace-nowrap min-w-[120px] ${
                activeTab === tab.id
                  ? "bg-purple-700 text-white"
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
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Subtítulo</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción breve *</label>
                <textarea
                  value={formData.briefDescription}
                  onChange={(e) => setFormData({ ...formData, briefDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
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

          {activeTab === "details" && (
            <div className="space-y-6">
              {/* ¿En qué consiste */}
              <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">¿En qué consiste este servicio?</h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.whatIsSection.visible}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatIsSection: { ...formData.whatIsSection, visible: e.target.checked },
                        })
                      }
                    />
                    <span className="text-sm">Visible</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={formData.whatIsSection.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatIsSection: { ...formData.whatIsSection, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={formData.whatIsSection.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatIsSection: { ...formData.whatIsSection, description: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                    />
                  </div>

                  <ImageUploadInput
                    label="Imagen (opcional)"
                    value={formData.whatIsSection.image || ""}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        whatIsSection: { ...formData.whatIsSection, image: value },
                      })
                    }
                  />
                </div>
              </div>

              {/* Público objetivo */}
              <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">¿A quién está dirigido?</h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.targetAudience.visible}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: { ...formData.targetAudience, visible: e.target.checked },
                        })
                      }
                    />
                    <span className="text-sm">Visible</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={formData.targetAudience.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: { ...formData.targetAudience, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={formData.targetAudience.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: { ...formData.targetAudience, description: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Perfiles</label>
                    {formData.targetAudience.profiles.map((profile, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={profile}
                          onChange={(e) => {
                            const newProfiles = [...formData.targetAudience.profiles];
                            newProfiles[index] = e.target.value;
                            setFormData({
                              ...formData,
                              targetAudience: { ...formData.targetAudience, profiles: newProfiles },
                            });
                          }}
                          className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeProfile(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addProfile}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Agregar perfil
                    </button>
                  </div>
                </div>
              </div>

              {/* ¿Qué incluye */}
              <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">¿Qué incluye?</h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includes.visible}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          includes: { ...formData.includes, visible: e.target.checked },
                        })
                      }
                    />
                    <span className="text-sm">Visible</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={formData.includes.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          includes: { ...formData.includes, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={formData.includes.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          includes: { ...formData.includes, description: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Items</label>
                    {formData.includes.items.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newItems = [...formData.includes.items];
                            newItems[index] = e.target.value;
                            setFormData({
                              ...formData,
                              includes: { ...formData.includes, items: newItems },
                            });
                          }}
                          className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeIncludeItem(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addIncludeItem}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Agregar item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Beneficios del servicio</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.benefits.visible}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        benefits: { ...formData.benefits, visible: e.target.checked },
                      })
                    }
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.benefits.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      benefits: { ...formData.benefits, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              {formData.benefits.benefits.map((benefit, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Beneficio {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Icono (Material Icons)</label>
                    <input
                      type="text"
                      value={benefit.icon}
                      onChange={(e) => {
                        const newBenefits = [...formData.benefits.benefits];
                        newBenefits[index] = { ...benefit, icon: e.target.value };
                        setFormData({
                          ...formData,
                          benefits: { ...formData.benefits, benefits: newBenefits },
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                      placeholder="star"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => {
                        const newBenefits = [...formData.benefits.benefits];
                        newBenefits[index] = { ...benefit, title: e.target.value };
                        setFormData({
                          ...formData,
                          benefits: { ...formData.benefits, benefits: newBenefits },
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={benefit.description}
                      onChange={(e) => {
                        const newBenefits = [...formData.benefits.benefits];
                        newBenefits[index] = { ...benefit, description: e.target.value };
                        setFormData({
                          ...formData,
                          benefits: { ...formData.benefits, benefits: newBenefits },
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-20"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addBenefit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Agregar beneficio
              </button>
            </div>
          )}

          {activeTab === "methodology" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Metodología de trabajo</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.methodology.visible}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        methodology: { ...formData.methodology, visible: e.target.checked },
                      })
                    }
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.methodology.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      methodology: { ...formData.methodology, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                <textarea
                  value={formData.methodology.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      methodology: { ...formData.methodology, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              {formData.methodology.steps.map((step, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Paso {step.number}</h4>
                    <button
                      type="button"
                      onClick={() => removeMethodologyStep(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...formData.methodology.steps];
                        newSteps[index] = { ...step, title: e.target.value };
                        setFormData({
                          ...formData,
                          methodology: { ...formData.methodology, steps: newSteps },
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...formData.methodology.steps];
                        newSteps[index] = { ...step, description: e.target.value };
                        setFormData({
                          ...formData,
                          methodology: { ...formData.methodology, steps: newSteps },
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-20"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addMethodologyStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Agregar paso
              </button>
            </div>
          )}

          {activeTab === "specialist" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Especialista responsable</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.specialist?.visible}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialist: { ...formData.specialist, visible: e.target.checked },
                      })
                    }
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.specialist?.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialist: { ...formData.specialist, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Seleccionar Conferencista</label>
                <select
                  value={formData.specialist?.specialist.speakerId || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialist: {
                        ...formData.specialist,
                        specialist: { ...formData.specialist.specialist, speakerId: e.target.value },
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                >
                  <option value="">-- Sin especialista --</option>
                  {availableSpeakers.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.name} - {sp.role}
                    </option>
                  ))}
                </select>
              </div>

              {formData.specialist?.specialist.speakerId && (() => {
                const selectedSpeaker = availableSpeakers.find(s => s.id === formData.specialist?.specialist.speakerId);
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
                  </div>
                );
              })()}

              {availableSpeakers.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
                  No hay conferencistas disponibles. Ve a la sección "Conferencistas" para crear uno primero.
                </div>
              )}
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        faqs: { ...formData.faqs, visible: e.target.checked },
                      })
                    }
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título de sección</label>
                <input
                  type="text"
                  value={formData.faqs.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      faqs: { ...formData.faqs, title: e.target.value },
                    })
                  }
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
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
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
                        setFormData({
                          ...formData,
                          faqs: { ...formData.faqs, faqs: newFAQs },
                        });
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
                        setFormData({
                          ...formData,
                          faqs: { ...formData.faqs, faqs: newFAQs },
                        });
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cta: { ...formData.cta, visible: e.target.checked },
                      })
                    }
                  />
                  <span className="text-sm">Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Título</label>
                <input
                  type="text"
                  value={formData.cta.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Descripción</label>
                <textarea
                  value={formData.cta.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Texto del botón</label>
                <input
                  type="text"
                  value={formData.cta.buttonText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, buttonText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Número de WhatsApp</label>
                <input
                  type="text"
                  value={formData.cta.whatsappNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cta: { ...formData.cta, whatsappNumber: e.target.value },
                    })
                  }
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
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceFormModal;
