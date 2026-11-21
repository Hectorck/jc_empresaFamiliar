"use client";

import React, { useState } from "react";
import { FAQ } from "../../lib/services-types";

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
  theme?: "light" | "dark";
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, faqs, theme = "dark" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isLight = theme === "light";

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border overflow-hidden transition-all"
              style={{
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span
                  className="text-lg font-medium pr-4"
                  style={{ color: "var(--text)" }}
                >
                  {faq.question}
                </span>
                <span
                  className="material-icons-round transition-transform duration-200 flex-shrink-0"
                  style={{
                    color: "var(--textSecondary)",
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </button>

              {openIndex === index && (
                <div
                  className="px-6 pb-5 pt-0 border-t"
                  style={{
                    borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--textSecondary)" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
