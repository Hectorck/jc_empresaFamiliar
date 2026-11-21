"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { themeManager } from "../../components/themeManager";
import { obtenerSpeakers } from "../../lib/services-db";
import type { Speaker } from "../../lib/services-types";

interface FeaturedSpeakersSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  maxSpeakers?: number;
  teamButtonText?: string;
  teamButtonLink?: string;
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
  style?: React.CSSProperties;
}> = ({ children, delay = 0, className = "", style }) => {
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
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/*
  Cada card ocupa mínimo 150px y crece hasta 260px.
  - Móvil (~350px útiles): caben 2 por fila.
  - Escritorio: hasta 4 por fila, siempre centradas si son menos.
  No depende de breakpoints de Tailwind.
*/
const cardWrapStyle: React.CSSProperties = {
  flex: "1 1 150px",
  minWidth: 150,
  maxWidth: 260,
  display: "flex",
};

const AVATAR = "clamp(96px, 28vw, 124px)";

/* ---------- Componente ---------- */

const FeaturedSpeakersSection: React.FC<FeaturedSpeakersSectionProps> = ({
  title = "Nuestro equipo de especialistas",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  maxSpeakers = 4,
  teamButtonText = "Conoce a nuestro equipo",
  teamButtonLink = "/contacto",
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
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTheme = () => setCurrentTheme(themeManager.getTheme());
    checkTheme();
    const handler = () => checkTheme();
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  useEffect(() => {
    async function loadSpeakers() {
      setLoading(true);
      try {
        const data = await obtenerSpeakers({ status: "active" });
        setSpeakers(data.slice(0, maxSpeakers));
      } catch (error) {
        console.error("Error loading speakers:", error);
        setSpeakers([]);
      } finally {
        setLoading(false);
      }
    }
    loadSpeakers();
  }, [maxSpeakers]);

  const isLight = currentTheme === "light";

  const accent = styles?.accentColor || styles?.buttonBackgroundColor || buttonBackgroundColor || "#3b82f6";
  const textCol = styles?.textColor || textColor || "var(--text)";
  const pt = toPx(styles?.paddingTop || paddingTop, "80px");
  const pb = toPx(styles?.paddingBottom || paddingBottom, "80px");

  const sectionStyle: React.CSSProperties = {
    backgroundColor: styles?.backgroundColor || backgroundColor || "var(--bg)",
    color: textCol,
    paddingTop: `clamp(48px, 12vw, ${pt})`,
    paddingBottom: `clamp(48px, 12vw, ${pb})`,
    borderRadius: toPx(styles?.borderRadius || borderRadius),
  };

  const cardBg = isLight ? "#ffffff" : "rgba(255,255,255,0.05)";
  const cardSolid = isLight ? "#ffffff" : "#0f172a";
  const cardBorder = isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.1)";
  const accentSoft = `color-mix(in srgb, ${accent} 16%, transparent)`;
  const accentBorder = `color-mix(in srgb, ${accent} 35%, transparent)`;
  const skeletonA = isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)";
  const skeletonB = isLight ? "#eef2f7" : "rgba(255,255,255,0.05)";

  const bw = num(styles?.buttonBorderWidth ?? buttonBorderWidth, 0);
  const buttonStyle: React.CSSProperties = {
    backgroundColor: accent,
    color: styles?.buttonTextColor || buttonTextColor || "#ffffff",
    borderRadius: toPx(styles?.buttonBorderRadius || buttonBorderRadius, "8px"),
    border: bw > 0 ? `${bw}px solid ${styles?.buttonBorderColor || buttonBorderColor || accent}` : "none",
    fontSize: "clamp(15px, 4vw, 16px)",
    fontWeight: 600,
    boxShadow: `0 10px 30px -10px ${accent}`,
  };

  const titleMobile = num(titleMobileFontSize, 32);

  /* Avatar: anillo con borde real (no box-shadow) para que nunca se recorte */
  const avatarRing: React.CSSProperties = {
    position: "relative",
    width: AVATAR,
    height: AVATAR,
    borderRadius: "50%",
    boxSizing: "border-box",
    border: `3px solid ${accent}`,
    padding: 3,
    backgroundColor: cardSolid,
    flexShrink: 0,
  };

  /* ---------- Encabezado ---------- */
  const header = (title || subtitle) && (
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
  );

  /* ---------- Carga: skeletons ---------- */
  if (loading) {
    return (
      <section style={sectionStyle} className="w-full overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          {header}
          <div
            aria-busy="true"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}
          >
            {Array.from({ length: Math.min(Math.max(maxSpeakers || 4, 1), 4) }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  ...cardWrapStyle,
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "40px 16px 24px",
                  borderRadius: 24,
                  backgroundColor: cardBg,
                  border: cardBorder,
                }}
              >
                <div style={{ width: AVATAR, height: AVATAR, borderRadius: "50%", backgroundColor: skeletonA }} />
                <div style={{ marginTop: 20, height: 16, width: "75%", borderRadius: 999, backgroundColor: skeletonA }} />
                <div style={{ marginTop: 12, height: 12, width: "50%", borderRadius: 999, backgroundColor: skeletonB }} />
                <div style={{ marginTop: 16, height: 12, width: "100%", borderRadius: 999, backgroundColor: skeletonB }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={sectionStyle} className="w-full overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {header}

        {/* ---------- Especialistas ---------- */}
        {speakers.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {speakers.map((speaker, index) => (
              <Reveal key={speaker.id} delay={Math.min(index, 5) * 70} style={cardWrapStyle}>
                <article
                  className="group transition-all duration-300 active:scale-[0.985] md:hover:-translate-y-1.5 md:hover:shadow-2xl"
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    // Espacio arriba para que la foto respire y quede alineada
                    padding: "40px 16px 24px",
                    borderRadius: 24,
                    overflow: "hidden",
                    backgroundColor: cardBg,
                    border: cardBorder,
                    boxShadow: isLight ? "0 10px 30px -18px rgba(15,23,42,0.3)" : "none",
                  }}
                >
                  {/* Halo de color superior */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 110,
                      pointerEvents: "none",
                      background: `linear-gradient(to bottom, ${accentSoft}, transparent)`,
                    }}
                  />

                  {/* Fotografía circular */}
                  <div style={avatarRing}>
                    {speaker.photo ? (
                      <img
                        src={speaker.photo}
                        alt={speaker.name}
                        loading="lazy"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                          // Prioriza el rostro: recorta desde abajo, no desde arriba
                          objectPosition: "center 20%",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          backgroundColor: accentSoft,
                          color: accent,
                          fontSize: 28,
                          fontWeight: 700,
                        }}
                      >
                        {initials(speaker.name)}
                      </div>
                    )}
                  </div>

                  {/* Nombre */}
                  <h3
                    className="leading-snug"
                    style={{
                      position: "relative",
                      marginTop: 20,
                      fontSize: "clamp(15px, 4.2vw, 20px)",
                      fontWeight: 700,
                      color: textCol,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {speaker.name}
                  </h3>

                  {/* Especialidad */}
                  {speaker.specialty && (
                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginTop: 8,
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: "clamp(11px, 3vw, 13px)",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        backgroundColor: accentSoft,
                        color: accent,
                        border: `1px solid ${accentBorder}`,
                      }}
                    >
                      {speaker.specialty}
                    </span>
                  )}

                  {/* Breve biografía */}
                  {speaker.bio && (
                    <p
                      className="line-clamp-4 sm:line-clamp-3"
                      style={{
                        position: "relative",
                        marginTop: 12,
                        fontSize: "clamp(12px, 3.3vw, 14px)",
                        lineHeight: 1.6,
                        color: textCol,
                        opacity: isLight ? 0.72 : 0.65,
                      }}
                    >
                      {speaker.bio}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* ---------- Botón equipo ---------- */}
        {speakers.length > 0 && teamButtonText && (
          <Reveal className="mt-8 sm:mt-12 lg:mt-14">
            <div className="flex justify-center">
              <Link
                href={teamButtonLink}
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-7 py-3.5 transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                style={buttonStyle}
              >
                {teamButtonText}
                <span
                  className="material-icons-round transition-transform duration-300 group-hover:translate-x-1"
                  style={{ fontSize: 20 }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </Reveal>
        )}

        {/* ---------- Sin especialistas ---------- */}
        {speakers.length === 0 && (
          <Reveal>
            <div
              className="mx-auto max-w-2xl rounded-3xl p-6 text-center sm:p-10"
              style={{
                background: `linear-gradient(135deg, ${accentSoft} 0%, transparent 100%)`,
                border: `1px solid ${accentBorder}`,
              }}
            >
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: accent, color: "#ffffff" }}
              >
                <span className="material-icons-round" style={{ fontSize: 28 }}>
                  groups
                </span>
              </div>
              <p
                style={{
                  fontSize: "clamp(15px, 4vw, 18px)",
                  lineHeight: 1.65,
                  color: textCol,
                  opacity: 0.9,
                }}
              >
                Pronto presentaremos a nuestro equipo de especialistas.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default FeaturedSpeakersSection;