"use client";

import React from "react";
import Link from "next/link";
import { ConferenceHero as ConferenceHeroType } from "../../lib/services-types";

interface ConferenceHeroProps extends ConferenceHeroType {
  title: string;
  coverImage: string;
  theme?: "light" | "dark";
}

const ConferenceHero: React.FC<ConferenceHeroProps> = ({
  category,
  title,
  subtitle,
  briefDescription,
  coverImage,
  date,
  startTime,
  endTime,
  modality,
  location,
  theme = "dark",
}) => {
  const isLight = theme === "light";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-EC", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
    <section
      className="relative min-h-[700px] flex items-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 100%)"
              : "linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.3) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Category badge */}
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{
                background: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                color: "#E0A11A",
              }}
            >
              {category}
            </span>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl mb-6 font-medium"
              style={{ color: "#E0A11A" }}
            >
              {subtitle}
            </p>

            {/* Brief description */}
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "var(--textSecondary)" }}
            >
              {briefDescription}
            </p>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{
                background: "#E0A11A",
                color: "#ffffff",
              }}
            >
              Solicitar información
              <span className="material-icons-round">arrow_forward</span>
            </Link>
          </div>

          {/* Right content - Event info card */}
          <div>
            <div
              className="p-8 rounded-2xl border"
              style={{
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.05)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--text)" }}
              >
                Información del evento
              </h3>

              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-start gap-4">
                  <span
                    className="material-icons-round text-2xl flex-shrink-0"
                    style={{ color: "#E0A11A" }}
                  >
                    calendar_today
                  </span>
                  <div>
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "var(--textSecondary)" }}
                    >
                      Fecha
                    </p>
                    <p className="text-base font-semibold" style={{ color: "var(--text)" }}>
                      {formatDate(date)}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <span
                    className="material-icons-round text-2xl flex-shrink-0"
                    style={{ color: "#E0A11A" }}
                  >
                    schedule
                  </span>
                  <div>
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "var(--textSecondary)" }}
                    >
                      Horario
                    </p>
                    <p className="text-base font-semibold" style={{ color: "var(--text)" }}>
                      {formatTime(startTime)}
                      {endTime && ` - ${formatTime(endTime)}`}
                    </p>
                  </div>
                </div>

                {/* Modality */}
                <div className="flex items-start gap-4">
                  <span
                    className="material-icons-round text-2xl flex-shrink-0"
                    style={{ color: "#E0A11A" }}
                  >
                    location_on
                  </span>
                  <div>
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "var(--textSecondary)" }}
                    >
                      Modalidad
                    </p>
                    <p className="text-base font-semibold capitalize" style={{ color: "var(--text)" }}>
                      {modality}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <span
                    className="material-icons-round text-2xl flex-shrink-0"
                    style={{ color: "#E0A11A" }}
                  >
                    place
                  </span>
                  <div>
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "var(--textSecondary)" }}
                    >
                      Ubicación
                    </p>
                    <p className="text-base font-semibold" style={{ color: "var(--text)" }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceHero;
