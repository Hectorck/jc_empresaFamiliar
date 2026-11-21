"use client";

import React from "react";

interface ServiceIncludesProps {
  title: string;
  description: string;
  items: string[];
  theme?: "light" | "dark";
}

const ServiceIncludes: React.FC<ServiceIncludesProps> = ({
  title,
  description,
  items,
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
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>

        {description && (
          <p
            className="text-lg mb-8 text-center max-w-2xl mx-auto"
            style={{ color: "var(--textSecondary)" }}
          >
            {description}
          </p>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl"
              style={{
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "#E0A11A",
                }}
              >
                <span
                  className="material-icons-round text-base"
                  style={{ color: "#ffffff" }}
                >
                  check
                </span>
              </div>

              <p
                className="text-base leading-relaxed pt-1"
                style={{ color: "var(--text)" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIncludes;
