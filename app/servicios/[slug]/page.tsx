import { notFound } from "next/navigation";
import { obtenerContenidoPorSlug, obtenerSpeakerPorId } from "../../lib/services-db";
import { Service, Speaker } from "../../lib/services-types";
import ServiceHero from "../../components/services/ServiceHero";
import ServiceBenefits from "../../components/services/ServiceBenefits";
import ServiceIncludes from "../../components/services/ServiceIncludes";
import ServiceMethodology from "../../components/services/ServiceMethodology";
import SpeakerCard from "../../components/shared/SpeakerCard";
import FAQSection from "../../components/shared/FAQSection";
import WhatsAppCTA from "../../components/shared/WhatsAppCTA";
import { themeManager } from "../../components/themeManager";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await obtenerContenidoPorSlug(slug);

  if (!service || service.type !== "service") {
    return {
      title: "Servicio no encontrado",
    };
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.briefDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = await obtenerContenidoPorSlug(slug);

  if (!content || content.type !== "service") {
    notFound();
  }

  const service = content as Service;
  const theme = "dark"; // Por defecto, puedes hacer esto dinámico

  // Cargar datos del especialista si existe speakerId
  let specialistData: Speaker | null = null;
  if (service.specialist?.visible && service.specialist?.specialist?.speakerId) {
    specialistData = await obtenerSpeakerPorId(service.specialist.specialist.speakerId);
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Hero */}
      <ServiceHero
        category={service.category}
        title={service.title}
        subtitle={service.subtitle}
        briefDescription={service.briefDescription}
        coverImage={service.coverImage}
        theme={theme}
      />

      {/* ¿En qué consiste este servicio? */}
      {service.whatIsSection.visible && (
        <section className="py-16 px-4 md:px-8" style={{ background: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ color: "var(--text)" }}
                >
                  {service.whatIsSection.title}
                </h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--textSecondary)" }}
                >
                  {service.whatIsSection.description}
                </p>
              </div>
              {service.whatIsSection.image && (
                <div>
                  <img
                    src={service.whatIsSection.image}
                    alt={service.whatIsSection.title}
                    className="w-full rounded-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ¿A quién está dirigido? */}
      {service.targetAudience.visible && (
        <section
          className="py-16 px-4 md:px-8"
          style={{
            background: theme === "light"
              ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ color: "var(--text)" }}
            >
              {service.targetAudience.title}
            </h2>
            <p
              className="text-lg mb-8 text-center"
              style={{ color: "var(--textSecondary)" }}
            >
              {service.targetAudience.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.targetAudience.profiles.map((profile, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border"
                  style={{
                    borderColor: theme === "light" ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                    background: theme === "light" ? "#ffffff" : "rgba(255,255,255,0.03)",
                  }}
                >
                  <p
                    className="text-base font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {profile}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Beneficios */}
      {service.benefits.visible && (
        <ServiceBenefits
          title={service.benefits.title}
          benefits={service.benefits.benefits}
          theme={theme}
        />
      )}

      {/* ¿Qué incluye? */}
      {service.includes.visible && (
        <ServiceIncludes
          title={service.includes.title}
          description={service.includes.description}
          items={service.includes.items}
          theme={theme}
        />
      )}

      {/* Metodología */}
      {service.methodology.visible && (
        <ServiceMethodology
          title={service.methodology.title}
          description={service.methodology.description}
          steps={service.methodology.steps}
          theme={theme}
        />
      )}

      {/* Especialista responsable */}
      {service.specialist?.visible && specialistData && (
        <section className="py-16 px-4 md:px-8" style={{ background: "var(--bg)" }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              style={{ color: "var(--text)" }}
            >
              {service.specialist.title}
            </h2>
            <div className="flex justify-center">
              <SpeakerCard
                name={specialistData.name}
                photo={specialistData.photo}
                role={specialistData.role}
                bio={specialistData.bio}
                theme={theme}
              />
            </div>
          </div>
        </section>
      )}

      {/* Preguntas frecuentes */}
      {service.faqs.visible && (
        <FAQSection
          title={service.faqs.title}
          faqs={service.faqs.faqs}
          theme={theme}
        />
      )}

      {/* CTA */}
      {service.cta.visible && (
        <div id="contact">
          <WhatsAppCTA
            title={service.cta.title}
            description={service.cta.description}
            buttonText={service.cta.buttonText}
            whatsappNumber={service.cta.whatsappNumber}
            theme={theme}
          />
        </div>
      )}
    </main>
  );
}
