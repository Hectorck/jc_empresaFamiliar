"use client";

import React, { useEffect, useRef, useState } from "react";
import { themeManager } from "../../components/themeManager";

interface Collaborator {
  id?: string;
  name?: string;
  role?: string;
  photo?: string;
}

interface AboutUsSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  organizationName?: string;
  organizationNameMobileFontSize?: string;
  history?: string;
  historyMobileFontSize?: string;
  experience?: string;
  experienceMobileFontSize?: string;
  philosophy?: string;
  philosophyMobileFontSize?: string;
  teamPhoto?: string;
  advisorName?: string;
  advisorNameMobileFontSize?: string;
  advisorBio?: string;
  advisorBioMobileFontSize?: string;
  advisorPhoto?: string;
  collaborators?: Collaborator[];
  collaboratorsMobileFontSize?: string;
  buttonText?: string;
  buttonTextMobileFontSize?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  textAlign?: string;
  borderRadius?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  buttonBorderWidth?: string;
  buttonBorderRadius?: string;
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

const initials = (name?: string) =>
  (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

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

const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 13h20" />
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- Componente ---------- */

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  title = "Quiénes somos",
  titleMobileFontSize = "32",
  organizationName = "",
  organizationNameMobileFontSize = "20",
  history = "",
  historyMobileFontSize = "16",
  experience = "",
  experienceMobileFontSize = "16",
  philosophy = "",
  philosophyMobileFontSize = "16",
  teamPhoto = "",
  advisorName = "",
  advisorNameMobileFontSize = "18",
  advisorBio = "",
  advisorBioMobileFontSize = "16",
  advisorPhoto = "",
  collaborators = [],
  collaboratorsMobileFontSize = "16",
  buttonText = "Conoce más sobre nosotros",
  buttonTextMobileFontSize = "16",
  buttonLink = "#contact",
  backgroundColor = "",
  textColor = "",
  paddingTop = "80",
  paddingBottom = "80",
  textAlign = "center",
  borderRadius = "0",
  buttonBackgroundColor = "",
  buttonTextColor = "",
  buttonBorderColor = "",
  buttonBorderWidth = "0",
  buttonBorderRadius = "8",
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
  const collaboratorsArray: Collaborator[] = Array.isArray(collaborators) ? collaborators : [];

  const accent = styles?.buttonBackgroundColor || buttonBackgroundColor || "#3b82f6";
  const textCol = styles?.textColor || textColor || "var(--text)";

  const pt = toPx(styles?.paddingTop || paddingTop, "80px");
  const pb = toPx(styles?.paddingBottom || paddingBottom, "80px");

  const sectionStyle: React.CSSProperties = {
    backgroundColor: styles?.backgroundColor || backgroundColor || "var(--bg)",
    color: textCol,
    // En móvil se reduce el padding automáticamente
    paddingTop: `clamp(48px, 12vw, ${pt})`,
    paddingBottom: `clamp(48px, 12vw, ${pb})`,
    borderRadius: toPx(styles?.borderRadius || borderRadius),
  };

  const cardBg = isLight ? "rgba(15,23,42,0.035)" : "rgba(255,255,255,0.05)";
  const cardBorder = isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.1)";
  const accentSoft = `color-mix(in srgb, ${accent} 16%, transparent)`;

  const bw = num(styles?.buttonBorderWidth ?? buttonBorderWidth, 0);
  const buttonStyle: React.CSSProperties = {
    backgroundColor: accent,
    color: styles?.buttonTextColor || buttonTextColor || "#ffffff",
    borderRadius: toPx(styles?.buttonBorderRadius || buttonBorderRadius, "8px"),
    border: bw > 0 ? `${bw}px solid ${styles?.buttonBorderColor || buttonBorderColor || accent}` : "none",
    fontSize:
      fieldStyles?.buttonText?.fontSize ||
      `clamp(15px, 4vw, ${num(buttonTextMobileFontSize, 16)}px)`,
    fontWeight: fieldStyles?.buttonText?.fontWeight || 600,
    boxShadow: `0 10px 20px -10px ${accent}`,
  };

  const fs = (key: string, mobile: string, min: number, fallbackMax = 16) =>
    fieldStyles?.[key]?.fontSize || `clamp(${min}px, 4vw, ${num(mobile, fallbackMax)}px)`;

  const hasPhoto = !!teamPhoto;
  const hasAdvisor = !!(advisorName || advisorPhoto || advisorBio);
  const hasLeft = hasPhoto || hasAdvisor;

  const titleMobile = num(titleMobileFontSize, 32);

  return (
    <section style={sectionStyle} className="w-full overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ---------- Encabezado ---------- */}
        {title && (
          <Reveal className="mb-4 text-center sm:mb-4 lg:mb-3">
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
            <span
              className="mx-auto mt-4 block h-1 w-12 rounded-full sm:mt-5 sm:w-16"
              style={{ backgroundColor: accent }}
            />
          </Reveal>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
          {/* ---------- Columna visual ---------- */}
          {hasLeft && (
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  {hasPhoto && (
                    <div className="relative">
                      <div
                        className="relative overflow-hidden rounded-3xl"
                        style={{ boxShadow: "0 25px 60px -25px rgba(0,0,0,0.45)" }}
                      >
                        <img
                          src={teamPhoto}
                          alt="Equipo"
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
                        />
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 45%)",
                          }}
                        />
                      </div>
                      {/* Marco decorativo (solo escritorio) */}
                      <span
                        className="pointer-events-none absolute -bottom-3 -right-3 -z-10 hidden h-full w-full rounded-3xl lg:block"
                        style={{ border: `2px solid ${accent}`, opacity: 0.35 }}
                      />
                    </div>
                  )}

                  {/* Tarjeta del asesor (se superpone a la foto en móvil) */}
                  {hasAdvisor && (
                    <div
                      className={`relative z-10 flex items-center gap-4 rounded-2xl p-4 backdrop-blur-md sm:p-5 ${
                        hasPhoto ? "-mt-10 mx-3 sm:mx-6" : ""
                      }`}
                      style={{
                        backgroundColor: isLight ? "rgba(255,255,255,0.92)" : "rgba(20,20,25,0.82)",
                        border: cardBorder,
                        boxShadow: "0 18px 40px -18px rgba(0,0,0,0.4)",
                      }}
                    >
                      {advisorPhoto ? (
                        <img
                          src={advisorPhoto}
                          alt={advisorName || "Asesor"}
                          loading="lazy"
                          className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
                          style={{ boxShadow: `0 0 0 3px ${accent}` }}
                        />
                      ) : (
                        <div
                          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold sm:h-20 sm:w-20"
                          style={{ backgroundColor: accentSoft, color: accent }}
                        >
                          {initials(advisorName)}
                        </div>
                      )}
                      <div className="min-w-0 text-left">
                        <p
                          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                          style={{ color: accent }}
                        >
                          Asesor principal
                        </p>
                        {advisorName && (
                          <p
                            className="mt-0.5 leading-tight"
                            style={{
                              fontSize: fs("advisorName", advisorNameMobileFontSize, 16, 18),
                              fontWeight: fieldStyles?.advisorName?.fontWeight || 700,
                              color: fieldStyles?.advisorName?.color || textCol,
                            }}
                          >
                            {advisorName}
                          </p>
                        )}
                        {advisorBio && (
                          <p
                            className="mt-1.5 leading-relaxed"
                            style={{
                              fontSize: fs("advisorBio", advisorBioMobileFontSize, 13, 14),
                              color: fieldStyles?.advisorBio?.color || textCol,
                              opacity: 0.75,
                            }}
                          >
                            {advisorBio}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          )}

          {/* ---------- Columna de contenido ---------- */}
          <div className={`space-y-8 sm:space-y-10 ${hasLeft ? "lg:col-span-7" : "lg:col-span-12"}`}>
            {/* Organización + historia */}
            {(organizationName || history) && (
              <Reveal className="text-left">
                {organizationName && (
                  <h3
                    className="leading-tight"
                    style={{
                      fontSize:
                        fieldStyles?.organizationName?.fontSize ||
                        `clamp(${num(organizationNameMobileFontSize, 20) + 4}px, 3.5vw + 10px, 34px)`,
                      fontWeight: fieldStyles?.organizationName?.fontWeight || 700,
                      color: fieldStyles?.organizationName?.color || textCol,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {organizationName}
                  </h3>
                )}
                {history && (
                  <p
                    className={`${organizationName ? "mt-4" : ""} border-l-[3px] pl-4 sm:pl-5`}
                    style={{
                      borderColor: accent,
                      fontSize: fs("history", historyMobileFontSize, 15, 17),
                      lineHeight: fieldStyles?.history?.lineHeight || 1.75,
                      color: fieldStyles?.history?.color || textCol,
                      opacity: isLight ? 0.88 : 0.82,
                    }}
                  >
                    {history}
                  </p>
                )}
              </Reveal>
            )}

            {/* Experiencia + Filosofía */}
            {(experience || philosophy) && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {experience && (
                  <Reveal delay={60}>
                    <div
                      className="h-full rounded-2xl p-5 text-left sm:p-6"
                      style={{ backgroundColor: cardBg, border: cardBorder }}
                    >
                      <div
                        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: accentSoft, color: accent }}
                      >
                        <IconBriefcase />
                      </div>
                      <h4
                        style={{
                          fontSize: "clamp(16px, 4vw, 18px)",
                          fontWeight: fieldStyles?.experience?.fontWeight || 700,
                          color: fieldStyles?.experience?.color || textCol,
                        }}
                      >
                        Nuestra experiencia
                      </h4>
                      <p
                        className="mt-2"
                        style={{
                          fontSize: fs("experience", experienceMobileFontSize, 14, 15),
                          lineHeight: fieldStyles?.experience?.lineHeight || 1.7,
                          color: fieldStyles?.experience?.color || textCol,
                          opacity: isLight ? 0.82 : 0.75,
                        }}
                      >
                        {experience}
                      </p>
                    </div>
                  </Reveal>
                )}

                {philosophy && (
                  <Reveal delay={140}>
                    <div
                      className="h-full rounded-2xl p-5 text-left sm:p-6"
                      style={{ backgroundColor: cardBg, border: cardBorder }}
                    >
                      <div
                        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: accentSoft, color: accent }}
                      >
                        <IconHeart />
                      </div>
                      <h4
                        style={{
                          fontSize: "clamp(16px, 4vw, 18px)",
                          fontWeight: fieldStyles?.philosophy?.fontWeight || 700,
                          color: fieldStyles?.philosophy?.color || textCol,
                        }}
                      >
                        Nuestra filosofía
                      </h4>
                      <p
                        className="mt-2"
                        style={{
                          fontSize: fs("philosophy", philosophyMobileFontSize, 14, 15),
                          lineHeight: fieldStyles?.philosophy?.lineHeight || 1.7,
                          color: fieldStyles?.philosophy?.color || textCol,
                          opacity: isLight ? 0.82 : 0.75,
                        }}
                      >
                        {philosophy}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            )}

            {/* Equipo: carrusel con snap en móvil, grid en pantallas grandes */}
            {collaboratorsArray.length > 0 && (
              <Reveal className="text-left">
                <div className="mb-4 flex items-end justify-between">
                  <h4
                    style={{
                      fontSize: "clamp(17px, 4.2vw, 20px)",
                      fontWeight: 700,
                      color: textCol,
                    }}
                  >
                    Nuestro equipo
                  </h4>
                  {collaboratorsArray.length > 1 && (
                    <span className="text-xs opacity-50 sm:hidden">Desliza →</span>
                  )}
                </div>

                <div
                  className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {collaboratorsArray.map((collab, index) => (
                    <div
                      key={collab.id || index}
                      className="flex w-[62%] shrink-0 snap-start flex-col items-center rounded-2xl p-5 text-center transition-transform duration-300 active:scale-[0.98] sm:w-auto sm:hover:-translate-y-1"
                      style={{ backgroundColor: cardBg, border: cardBorder }}
                    >
                      {collab.photo ? (
                        <img
                          src={collab.photo}
                          alt={collab.name || "Colaborador"}
                          loading="lazy"
                          className="h-20 w-20 rounded-full object-cover"
                          style={{ boxShadow: `0 0 0 3px ${accentSoft}, 0 0 0 5px ${accent}` }}
                        />
                      ) : (
                        <div
                          className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold"
                          style={{ backgroundColor: accentSoft, color: accent }}
                        >
                          {initials(collab.name)}
                        </div>
                      )}
                      <p
                        className="mt-4 leading-tight"
                        style={{
                          fontSize: `clamp(15px, 3.8vw, ${num(collaboratorsMobileFontSize, 16)}px)`,
                          fontWeight: 700,
                          color: textCol,
                        }}
                      >
                        {collab.name}
                      </p>
                      {collab.role && (
                        <p
                          className="mt-1"
                          style={{
                            fontSize: "clamp(12px, 3.2vw, 13px)",
                            color: textCol,
                            opacity: 0.6,
                          }}
                        >
                          {collab.role}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* CTA */}
            {buttonText && (
              <Reveal>
                <div className="flex justify-center lg:justify-start">
                  <a
                    href={buttonLink}
                    className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-7 py-3.5 transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                    style={buttonStyle}
                  >
                    {buttonText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <IconArrow />
                    </span>
                  </a>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
