"use client";

import React from "react";
import Link from "next/link";

interface ServiceHeroProps {
  category: string;
  title: string;
  subtitle: string;
  briefDescription: string;
  coverImage: string;
  theme?: "light" | "dark";
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  category,
  title,
  subtitle,
  briefDescription,
  coverImage,
  theme = "dark",
}) => {
  const isLight = theme === "light";

  return (
    <section
      className="relative min-h-[600px] flex items-center"
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
        <div className="max-w-2xl">
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
            Solicitar asesoría
            <span className="material-icons-round">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
