"use client";

import React, { useEffect, useRef, useState } from "react";
import { themeManager } from "../../components/themeManager";

interface Challenge {
  id?: string;
  title?: string;
  description?: string;
  icon?: string;
}

interface ChallengesSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  challenges?: Challenge[];
  closingText?: string;
  closingTextMobileFontSize?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  textAlign?: string;
  borderRadius?: string;
  styles?: any;
  fieldStyles?: Record<string, any>;
  theme?: "light" | "dark";
}

/* ---------- Helpers ---------- */

const toPx = (v: any, fallback = "0px") => {
  if (v === undefined || v === null || v === "") return fallback;
  return /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v);
};

const num = (v: any, fallback: number) => {
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
};

/* Aparece suavemente al entrar en pantalla (respeta reduced-motion) */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const IconQuote = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.5 6C6.5 6 4 8.5 4 11.5V18h6.5v-6.5H7c0-1.4 1.1-2.5 2.5-2.5V6zm9 0c-3 0-5.5 2.5-5.5 5.5V18h6.5v-6.5H16c0-1.4 1.1-2.5 2.5-2.5V6z" />
  </svg>
);

/* ---------- Componente ---------- */

const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  title = "Desafíos de las empresas familiares",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  challenges = [],
  closingText = "Cada empresa familiar tiene desafíos únicos. Estamos aquí para ayudarte a enfrentarlos.",
  closingTextMobileFontSize = "16",
  backgroundColor = "",
  textColor = "",
  paddingTop = "80",
  paddingBottom = "80",
  textAlign = "center",
  borderRadius = "0",
  styles = {},
  fieldStyles = {},
}) => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const checkTheme = () => setCurrentTheme(themeManager.getTheme());
    checkTheme();
    const handler = () => checkTheme();
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  const isLight = currentTheme === "light";

  const accent = styles?.accentColor || styles?.buttonBackgroundColor || (isLight ? "#3b82f6" : "#60a5fa");
  const textCol = styles?.textColor || textColor || "var(--text)";
  const pt = toPx(styles?.paddingTop || paddingTop, "80px");
  const pb = toPx(styles?.paddingBottom || paddingBottom, "80px");

  const sectionStyle: React.CSSProperties = {
    backgroundColor: styles?.backgroundColor || backgroundColor || "var(--bg)",
    color: textCol,
    // En móvil el padding se reduce automáticamente
    paddingTop: `clamp(48px, 12vw, ${pt})`,
    paddingBottom: `clamp(48px, 12vw, ${pb})`,
    borderRadius: toPx(styles?.borderRadius || borderRadius),
  };

  const cardBg = isLight ? "#ffffff" : "rgba(255,255,255,0.05)";
  const cardBorder = isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.1)";
  const accentSoft = `color-mix(in srgb, ${accent} 16%, transparent)`;
  const accentBorder = `color-mix(in srgb, ${accent} 35%, transparent)`;

  const challengeIcons = [
    "groups",
    "schedule",
    "account_balance",
    "trending_down",
    "warning",
    "crisis_alert",
    "psychology",
    "support_agent",
  ];

  const titleMobile = num(titleMobileFontSize, 32);
  const isOdd = challenges.length % 2 === 1;

  return (
    <section style={sectionStyle} className="w-full overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ---------- Encabezado ---------- */}
        {(title || subtitle) && (
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
            {title && (
              <h2
                style={{
                  fontSize:
                    fieldStyles?.title?.fontSize ||
                    `clamp(${titleMobile}px, 4vw + 14px, ${Math.max(48, titleMobile)}px)`,
                  fontWeight: fieldStyles?.title?.fontWeight || 800,
                  color: fieldStyles?.title?.color || textCol,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </h2>
            )}
            <span
              className="mx-auto mt-4 block h-1 w-12 rounded-full sm:mt-5 sm:w-16"
              style={{ backgroundColor: accent }}
            />
            {subtitle && (
              <p
                className="mt-5 sm:mt-6"
                style={{
                  fontSize:
                    fieldStyles?.subtitle?.fontSize ||
                    `clamp(16px, 3.6vw, ${num(subtitleMobileFontSize, 20)}px)`,
                  lineHeight: 1.65,
                  color: fieldStyles?.subtitle?.color || textCol,
                  opacity: isLight ? 0.78 : 0.7,
                }}
              >
                {subtitle}
              </p>
            )}
          </Reveal>
        )}

        {/* ---------- Desafíos ---------- */}
        {challenges.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
            {challenges.map((challenge, index) => {
              const icon = challenge.icon || challengeIcons[index % challengeIcons.length];
              const isLastOdd = isOdd && index === challenges.length - 1;
              const number = String(index + 1).padStart(2, "0");

              return (
                <Reveal
                  key={challenge.id || index}
                  delay={Math.min(index, 4) * 70}
                  className={isLastOdd ? "md:col-span-2" : ""}
                >
                  <article
                    className={`group relative h-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 active:scale-[0.99] sm:p-6 md:hover:-translate-y-1 md:hover:shadow-xl lg:p-7 ${
                      isLastOdd ? "md:mx-auto md:max-w-[calc(50%-0.625rem)] lg:max-w-[calc(50%-0.75rem)]" : ""
                    }`}
                    style={{
                      backgroundColor: cardBg,
                      border: cardBorder,
                      boxShadow: isLight ? "0 8px 24px -16px rgba(15,23,42,0.25)" : "none",
                    }}
                  >
                    {/* Número decorativo de fondo */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 select-none font-extrabold leading-none"
                      style={{
                        fontSize: "clamp(72px, 22vw, 104px)",
                        color: accent,
                        opacity: isLight ? 0.07 : 0.1,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {number}
                    </span>

                    {/* Línea de acento superior */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-[3px] w-12 rounded-br-full transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: accent }}
                    />

                    <div className="relative flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl"
                        style={{ backgroundColor: accentSoft, color: accent }}
                      >
                        <span
                          className="material-icons-round"
                          style={{ fontSize: "clamp(24px, 6vw, 28px)" }}
                        >
                          {icon}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 pr-6">
                        <h3
                          className="leading-snug"
                          style={{
                            fontSize: "clamp(17px, 4.4vw, 20px)",
                            fontWeight: 700,
                            color: textCol,
                          }}
                        >
                          {challenge.title}
                        </h3>
                        <p
                          className="mt-2"
                          style={{
                            fontSize: "clamp(14px, 3.7vw, 16px)",
                            lineHeight: 1.65,
                            color: textCol,
                            opacity: isLight ? 0.78 : 0.7,
                          }}
                        >
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* ---------- Cierre ---------- */}
        {closingText && (
          <Reveal className="mt-10 sm:mt-14 lg:mt-16">
            <div
              className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-6 text-center sm:p-8 lg:p-10"
              style={{
                background: `linear-gradient(135deg, ${accentSoft} 0%, transparent 100%)`,
                border: `1px solid ${accentBorder}`,
              }}
            >
              <div
                className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: accent, color: "#ffffff" }}
              >
                <IconQuote />
              </div>
              <p
                style={{
                  fontSize:
                    fieldStyles?.closingText?.fontSize ||
                    `clamp(16px, 4.2vw, ${Math.max(20, num(closingTextMobileFontSize, 16) + 4)}px)`,
                  lineHeight: 1.65,
                  fontWeight: fieldStyles?.closingText?.fontWeight || 600,
                  color: fieldStyles?.closingText?.color || textCol,
                }}
              >
                {closingText}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default ChallengesSection;