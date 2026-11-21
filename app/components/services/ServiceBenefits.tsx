"use client";

import React from "react";
import { Benefit } from "../../lib/services-types";

interface ServiceBenefitsProps {
  title: string;
  benefits: Benefit[];
  theme?: "light" | "dark";
}

const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({
  title,
  benefits,
  theme = "dark",
}) => {
  const isLight = theme === "light";

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border transition-all hover:shadow-lg"
              style={{
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(224, 161, 26, 0.1)",
                }}
              >
                <span
                  className="material-icons-round text-2xl"
                  style={{ color: "#E0A11A" }}
                >
                  {benefit.icon}
                </span>
              </div>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--text)" }}
              >
                {benefit.title}
              </h3>

              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--textSecondary)" }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
