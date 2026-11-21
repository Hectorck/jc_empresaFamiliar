"use client";

import React from "react";

interface SpeakerCardProps {
  name: string;
  photo: string;
  role: string;
  bio: string;
  experience?: string;
  theme?: "light" | "dark";
  variant?: "default" | "compact";
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  photo,
  role,
  bio,
  experience,
  theme = "dark",
  variant = "default",
}) => {
  const isLight = theme === "light";

  if (variant === "compact") {
    return (
      <div
        className="flex items-center gap-4 p-4 rounded-xl"
        style={{
          borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
          background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
        }}
      >
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-base truncate"
            style={{ color: "var(--text)" }}
          >
            {name}
          </h3>
          <p
            className="text-sm truncate"
            style={{ color: "var(--textSecondary)" }}
          >
            {role}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all hover:shadow-xl"
      style={{
        borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
        background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
      }}
    >
      <div className="aspect-square w-full relative">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: "var(--text)" }}
        >
          {name}
        </h3>

        <p
          className="text-sm font-medium mb-3"
          style={{ color: "#E0A11A" }}
        >
          {role}
        </p>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--textSecondary)" }}
        >
          {bio}
        </p>

        {experience && (
          <div
            className="pt-4 border-t"
            style={{ borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--textSecondary)" }}
            >
              <span className="font-medium" style={{ color: "var(--text)" }}>
                Experiencia:
              </span>{" "}
              {experience}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerCard;
