"use client";

import React from "react";
import { MethodologyStep } from "../../lib/services-types";

interface ServiceMethodologyProps {
  title: string;
  description: string;
  steps: MethodologyStep[];
  theme?: "light" | "dark";
}

const ServiceMethodology: React.FC<ServiceMethodologyProps> = ({
  title,
  description,
  steps,
  theme = "dark",
}) => {
  const isLight = theme === "light";

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "var(--bg)" }}>
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

        <div className="relative">
          {/* Connection line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
            }}
          />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Step number */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 hidden md:flex"
                  style={{
                    background: "#E0A11A",
                    color: "#ffffff",
                  }}
                >
                  <span className="text-2xl font-bold">{step.number}</span>
                </div>

                {/* Mobile step number */}
                <div className="md:hidden w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#E0A11A",
                    color: "#ffffff",
                  }}
                >
                  <span className="text-xl font-bold">{step.number}</span>
                </div>

                {/* Content */}
                <div
                  className="flex-1 p-6 rounded-2xl border md:ml-20"
                  style={{
                    borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                    background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--textSecondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMethodology;
