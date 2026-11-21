"use client";

import React from "react";
import { Topic } from "../../lib/services-types";

interface ConferenceTopicsProps {
  title: string;
  description: string;
  topics: Topic[];
  theme?: "light" | "dark";
}

const ConferenceTopics: React.FC<ConferenceTopicsProps> = ({
  title,
  description,
  topics,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
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
                    background: "rgba(224, 161, 26, 0.1)",
                  }}
                >
                  <span
                    className="material-icons-round text-xl"
                    style={{ color: "#E0A11A" }}
                  >
                    check_circle
                  </span>
                </div>

                <div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--textSecondary)" }}
                  >
                    {topic.description}
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

export default ConferenceTopics;
