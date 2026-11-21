import { notFound } from "next/navigation";
import { obtenerContenidoPorSlug, obtenerSpeakerPorId } from "../../lib/services-db";
import { Conference, Speaker } from "../../lib/services-types";
import ConferenceHero from "../../components/conferences/ConferenceHero";
import ConferenceTopics from "../../components/conferences/ConferenceTopics";
import ConferenceSpeakers from "../../components/conferences/ConferenceSpeakers";
import EventInformation from "../../components/conferences/EventInformation";
import LearningOutcomes from "../../components/conferences/LearningOutcomes";
import FAQSection from "../../components/shared/FAQSection";
import WhatsAppCTA from "../../components/shared/WhatsAppCTA";

interface ConferencePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ConferencePageProps) {
  const { slug } = await params;
  const conference = await obtenerContenidoPorSlug(slug);

  if (!conference || conference.type !== "conference") {
    return {
      title: "Conferencia no encontrada",
    };
  }

  return {
    title: conference.metaTitle || conference.title,
    description: conference.metaDescription || conference.hero.briefDescription,
  };
}

export default async function ConferencePage({ params }: ConferencePageProps) {
  const { slug } = await params;
  const content = await obtenerContenidoPorSlug(slug);

  if (!content || content.type !== "conference") {
    notFound();
  }

  const conference = content as Conference;
  const theme = "dark"; // Por defecto, puedes hacer esto dinámico

  // Cargar datos completos de los conferencistas desde el servidor
  const speakersData: Speaker[] = [];
  if (conference.speakers.visible && conference.speakers.speakers.length > 0) {
    for (const speaker of conference.speakers.speakers) {
      if (speaker.speakerId) {
        const speakerData = await obtenerSpeakerPorId(speaker.speakerId);
        if (speakerData) {
          speakersData.push(speakerData);
        }
      }
    }
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Hero */}
      <ConferenceHero
        category={conference.hero.category}
        title={conference.title}
        subtitle={conference.hero.subtitle}
        briefDescription={conference.hero.briefDescription}
        coverImage={conference.coverImage}
        date={conference.hero.date}
        startTime={conference.hero.startTime}
        endTime={conference.hero.endTime}
        modality={conference.hero.modality}
        location={conference.hero.location}
        theme={theme}
      />

      {/* Temáticas */}
      {conference.topics.visible && (
        <ConferenceTopics
          title={conference.topics.title}
          description={conference.topics.description}
          topics={conference.topics.topics}
          theme={theme}
        />
      )}

      {/* Conferencistas */}
      {conference.speakers.visible && speakersData.length > 0 && (
        <ConferenceSpeakers
          title={conference.speakers.title}
          description={conference.speakers.description}
          speakers={speakersData}
          theme={theme}
        />
      )}

      {/* Información del evento */}
      {conference.eventInfo.visible && (
        <EventInformation
          date={conference.eventInfo.date}
          startTime={conference.eventInfo.startTime}
          endTime={conference.eventInfo.endTime}
          duration={conference.eventInfo.duration}
          modality={conference.eventInfo.modality}
          location={conference.eventInfo.location}
          capacity={conference.eventInfo.capacity}
          targetAudience={conference.eventInfo.targetAudience}
          price={conference.eventInfo.price}
          additionalInfo={conference.eventInfo.additionalInfo}
          theme={theme}
        />
      )}

      {/* ¿Qué aprenderán? */}
      {conference.learningOutcomes.visible && (
        <LearningOutcomes
          title={conference.learningOutcomes.title}
          description={conference.learningOutcomes.description}
          outcomes={conference.learningOutcomes.outcomes}
          theme={theme}
        />
      )}

      {/* Preguntas frecuentes */}
      {conference.faqs.visible && (
        <FAQSection
          title={conference.faqs.title}
          faqs={conference.faqs.faqs}
          theme={theme}
        />
      )}

      {/* CTA */}
      {conference.cta.visible && (
        <div id="contact">
          <WhatsAppCTA
            title={conference.cta.title}
            description={conference.cta.description}
            buttonText={conference.cta.buttonText}
            whatsappNumber={conference.cta.whatsappNumber}
            theme={theme}
          />
        </div>
      )}
    </main>
  );
}
