"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { themeManager } from "../../components/themeManager";
import { obtenerConferencias } from "../../lib/services-db";
import type { Conference } from "../../lib/services-types";

interface FeaturedConferencesSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  maxConferences?: number;
  showAllConferencesText?: string;
  showAllConferencesLink?: string;
  noConferencesMessage?: string;
  contactLink?: string;
  contactText?: string;
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

/* Evita el desfase de un día: "2026-11-21" se interpreta como UTC y en Ecuador (UTC-5) mostraría el 20 */
const parseDate = (value?: string): Date | null => {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const formatTime = (timeStr?: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours, 10);
  if (Number.isNaN(hour)) return "";
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minutes ?? "00"} ${ampm}`;
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

/* ---------- Componente ---------- */

const FeaturedConferencesSection: React.FC<FeaturedConferencesSectionProps> = ({
  title = "Conferencias",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  maxConferences = 3,
  showAllConferencesText = "Explorar todas las conferencias",
  showAllConferencesLink = "/conferencias",
  noConferencesMessage = "No hay conferencias disponibles en este momento. Si estás interesado en una conferencia privada para tu organización, contáctanos.",
  contactLink = "/contacto",
  contactText = "Solicitar conferencia privada",
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
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTheme = () => setCurrentTheme(themeManager.getTheme());
    checkTheme();
    const handler = () => checkTheme();
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  useEffect(() => {
    async function loadConferences() {
      setLoading(true);
      try {
        const data = await obtenerConferencias({ status: "published", limit: maxConferences });
        setConferences(data);
      } catch (error) {
        console.error("Error loading conferences:", error);
        setConferences([]);
      } finally {
        setLoading(false);
      }
    }
    loadConferences();
  }, [maxConferences]);

  const isLight = currentTheme === "light";

  // Dorado de marca para fechas, categorías y enlaces (sobrescribible con styles.accentColor)
  const brand = styles?.accentColor || "#E0A11A";
  const btnColor = styles?.buttonBackgroundColor || buttonBackgroundColor || "#3b82f6";
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

  const cardBg = isLight ? "#ffffff" : "rgba(255,255,255,0.04)";
  const cardBorder = isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.1)";
  const brandSoft = `color-mix(in srgb, ${brand} 14%, transparent)`;
  const btnSoft = `color-mix(in srgb, ${btnColor} 16%, transparent)`;
  const btnBorderSoft = `color-mix(in srgb, ${btnColor} 35%, transparent)`;

  const bw = num(styles?.buttonBorderWidth ?? buttonBorderWidth, 0);
  const buttonStyle: React.CSSProperties = {
    backgroundColor: btnColor,
    color: styles?.buttonTextColor || buttonTextColor || "#ffffff",
    borderRadius: toPx(styles?.buttonBorderRadius || buttonBorderRadius, "8px"),
    border: bw > 0 ? `${bw}px solid ${styles?.buttonBorderColor || buttonBorderColor || btnColor}` : "none",
    fontSize: "clamp(15px, 4vw, 16px)",
    fontWeight: 600,
    boxShadow: `0 10px 30px -10px ${btnColor}`,
  };

  const titleMobile = num(titleMobileFontSize, 32);
  const single = conferences.length === 1;

  /* ---------- Encabezado (reutilizado en carga y contenido) ---------- */
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
        style={{ backgroundColor: brand }}
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

  /* ---------- Estado de carga: skeletons ---------- */
  if (loading) {
    return (
      <section style={sectionStyle} className="w-full overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          {header}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`animate-pulse overflow-hidden rounded-2xl ${i > 0 ? "hidden md:block" : ""}`}
                style={{ backgroundColor: cardBg, border: cardBorder }}
              >
                <div className="aspect-[16/10] w-full" style={{ backgroundColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)" }} />
                <div className="space-y-3 p-4 lg:p-5">
                  <div className="h-4 w-3/4 rounded-full" style={{ backgroundColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)" }} />
                  <div className="h-3 w-full rounded-full" style={{ backgroundColor: isLight ? "#eef2f7" : "rgba(255,255,255,0.05)" }} />
                  <div className="h-3 w-2/3 rounded-full" style={{ backgroundColor: isLight ? "#eef2f7" : "rgba(255,255,255,0.05)" }} />
                </div>
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

        {/* ---------- Sin conferencias ---------- */}
        {conferences.length === 0 && (
          <Reveal>
            <div
              className="mx-auto max-w-2xl rounded-3xl p-6 text-center sm:p-10"
              style={{
                background: `linear-gradient(135deg, ${btnSoft} 0%, transparent 100%)`,
                border: `1px solid ${btnBorderSoft}`,
              }}
            >
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: btnColor, color: "#ffffff" }}
              >
                <span className="material-icons-round" style={{ fontSize: 28 }}>
                  event_available
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
                {noConferencesMessage}
              </p>
              {contactLink && contactText && (
                <Link
                  href={contactLink}
                  className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-7 py-3.5 transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                  style={buttonStyle}
                >
                  {contactText}
                  <span className="material-icons-round" style={{ fontSize: 20 }}>
                    arrow_forward
                  </span>
                </Link>
              )}
            </div>
          </Reveal>
        )}

        {/* ---------- Conferencias: carrusel en móvil, 3 por fila desde md ---------- */}
        {conferences.length > 0 && (
          <Reveal>
            {conferences.length > 1 && (
              <p className="mb-3 text-right text-xs opacity-50 md:hidden">Desliza →</p>
            )}
            <div
              className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:gap-4 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {conferences.map((conference) => {
                const date = parseDate(conference.hero?.date);
                const day = date ? date.getDate() : null;
                const month = date
                  ? date.toLocaleDateString("es-EC", { month: "short" }).replace(".", "")
                  : "";
                const year = date ? date.getFullYear() : "";
                const time = formatTime(conference.hero?.startTime);

                return (
                  <Link
                    key={conference.id}
                    href={`/conferencias/${conference.slug}`}
                    className={`group block shrink-0 snap-start md:w-auto ${
                      single
                        ? "w-full md:col-span-3 md:mx-auto md:w-full md:max-w-sm"
                        : "w-[68%] min-[420px]:w-[58%] sm:w-[44%]"
                    }`}
                  >
                    <article
                      className="flex h-full flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 active:scale-[0.985] md:hover:-translate-y-1 md:hover:shadow-xl"
                      style={{
                        backgroundColor: cardBg,
                        border: cardBorder,
                        boxShadow: isLight ? "0 8px 24px -16px rgba(15,23,42,0.3)" : "none",
                      }}
                    >
                      {/* Imagen */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {conference.coverImage ? (
                          <img
                            src={conference.coverImage}
                            alt={conference.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="h-full w-full"
                            style={{ background: `linear-gradient(135deg, ${brand}, #1e293b)` }}
                          />
                        )}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.15) 100%)",
                          }}
                        />

                        {/* Badge de fecha tipo calendario (compacto) */}
                        {day !== null && (
                          <div
                            className="absolute left-2.5 top-2.5 flex min-w-[46px] flex-col items-center rounded-xl px-2 py-1.5 leading-none shadow-lg"
                            style={{ backgroundColor: brand, color: "#ffffff" }}
                          >
                            <span className="text-xl font-extrabold">{day}</span>
                            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider">
                              {month}
                            </span>
                            <span className="mt-0.5 text-[9px] font-medium opacity-80">{year}</span>
                          </div>
                        )}

                        {/* Categoría sobre la imagen */}
                        {conference.hero?.category && (
                          <span className="absolute bottom-2.5 left-2.5 max-w-[85%] truncate rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                            {conference.hero.category}
                          </span>
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="flex flex-1 flex-col p-4 lg:p-5">
                        <h3
                          className="line-clamp-2 leading-snug"
                          style={{
                            fontSize: "clamp(16px, 4.2vw, 18px)",
                            fontWeight: 700,
                            color: textCol,
                          }}
                        >
                          {conference.title}
                        </h3>

                        {conference.hero?.briefDescription && (
                          <p
                            className="mt-1.5 line-clamp-2"
                            style={{
                              fontSize: "clamp(13px, 3.4vw, 14px)",
                              lineHeight: 1.6,
                              color: textCol,
                              opacity: isLight ? 0.72 : 0.65,
                            }}
                          >
                            {conference.hero.briefDescription}
                          </p>
                        )}

                        {/* Hora y modalidad como chips */}
                        {(time || conference.hero?.modality) && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {time && (
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
                                style={{ backgroundColor: brandSoft, color: textCol }}
                              >
                                <span className="material-icons-round" style={{ fontSize: 14, color: brand }}>
                                  schedule
                                </span>
                                {time}
                              </span>
                            )}
                            {conference.hero?.modality && (
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize"
                                style={{ backgroundColor: brandSoft, color: textCol }}
                              >
                                <span className="material-icons-round" style={{ fontSize: 14, color: brand }}>
                                  location_on
                                </span>
                                {conference.hero.modality}
                              </span>
                            )}
                          </div>
                        )}

                        {/* CTA */}
                        <div
                          className="mt-auto flex items-center justify-between border-t pt-3"
                          style={{
                            borderColor: isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.1)",
                            marginTop: 16,
                          }}
                        >
                          <span className="text-[13px] font-semibold" style={{ color: brand }}>
                            Ver detalles
                          </span>
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1"
                            style={{ backgroundColor: brand, color: "#ffffff" }}
                          >
                            <span className="material-icons-round" style={{ fontSize: 16 }}>
                              arrow_forward
                            </span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* ---------- Ver todas ---------- */}
        {conferences.length > 0 && showAllConferencesText && (
          <Reveal className="mt-8 sm:mt-12 lg:mt-14">
            <div className="flex justify-center">
              <Link
                href={showAllConferencesLink}
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-7 py-3.5 transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                style={buttonStyle}
              >
                {showAllConferencesText}
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
      </div>
    </section>
  );
};

export default FeaturedConferencesSection;