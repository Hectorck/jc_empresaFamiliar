"use client";

import React from "react";
import { LearningOutcome } from "../../lib/services-types";

interface LearningOutcomesProps {
  title: string;
  description: string;
  outcomes: LearningOutcome[];
  theme?: "light" | "dark";
}

const LearningOutcomes: React.FC<LearningOutcomesProps> = ({
  title,
  description,
  outcomes,
  theme = "dark",
}) => {
  const isLight = theme === "light";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border transition-all hover:shadow-lg"
              style={{
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#E0A11A",
                  }}
                >
                  <span
                    className="material-icons-round text-xl"
                    style={{ color: "#ffffff" }}
                  >
                    star
                  </span>
                </div>

                <div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {outcome.title}
                  </h3>

                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--textSecondary)" }}
                  >
                    {outcome.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
