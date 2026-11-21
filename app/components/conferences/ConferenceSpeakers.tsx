"use client";

import React from "react";
import { Speaker } from "../../lib/services-types";
import SpeakerCard from "../shared/SpeakerCard";

interface ConferenceSpeakersProps {
  title: string;
  description?: string;
  speakers: Speaker[];
  theme?: "light" | "dark";
}

const ConferenceSpeakers: React.FC<ConferenceSpeakersProps> = ({
  title,
  description,
  speakers,
  theme = "dark",
}) => {
  const isLight = theme === "light";

  if (speakers.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 px-4 md:px-8"
      style={{
        background: isLight
          ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
          : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>

        {description && (
          <p
            className="text-lg mb-12 text-center max-w-2xl mx-auto"
            style={{ color: "var(--textSecondary)" }}
          >
            {description}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              name={speaker.name}
              photo={speaker.photo}
              role={speaker.role}
              bio={speaker.bio}
              experience={speaker.experience}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConferenceSpeakers;
