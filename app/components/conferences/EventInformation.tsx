"use client";

import React from "react";
import { EventInformation as EventInfoType } from "../../lib/services-types";

interface EventInformationProps extends EventInfoType {
  theme?: "light" | "dark";
}

const EventInformation: React.FC<EventInformationProps> = ({
  date,
  startTime,
  endTime,
  duration,
  modality,
  location,
  capacity,
  targetAudience,
  price,
  additionalInfo,
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

  const infoItems = [
    {
      icon: "calendar_today",
      label: "Fecha",
      value: formatDate(date),
    },
    {
      icon: "schedule",
      label: "Horario",
      value: `${formatTime(startTime)}${endTime ? ` - ${formatTime(endTime)}` : ""}`,
    },
    {
      icon: "timer",
      label: "Duración",
      value: duration,
    },
    {
      icon: "location_on",
      label: "Modalidad",
      value: modality.charAt(0).toUpperCase() + modality.slice(1),
    },
    {
      icon: "place",
      label: "Ubicación",
      value: location,
    },
    ...(capacity
      ? [
          {
            icon: "groups",
            label: "Capacidad",
            value: `${capacity} participantes`,
          },
        ]
      : []),
    {
      icon: "person",
      label: "Público objetivo",
      value: targetAudience,
    },
    ...(price
      ? [
          {
            icon: "payments",
            label: "Inversión",
            value: price,
          },
        ]
      : []),
  ];

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: "var(--text)" }}
        >
          Información del evento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border"
              style={{
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(224, 161, 26, 0.1)",
                  }}
                >
                  <span
                    className="material-icons-round text-2xl"
                    style={{ color: "#E0A11A" }}
                  >
                    {item.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: "var(--textSecondary)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {additionalInfo && (
          <div
            className="mt-8 p-6 rounded-2xl border"
            style={{
              borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
              background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
            }}
          >
            <div className="flex items-start gap-4">
              <span
                className="material-icons-round text-2xl flex-shrink-0"
                style={{ color: "#E0A11A" }}
              >
                info
              </span>
              <div>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "var(--textSecondary)" }}
                >
                  Información adicional
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {additionalInfo}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventInformation;
