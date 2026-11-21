"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { themeManager } from "../../components/themeManager";
import { obtenerServicios } from "../../lib/services-db";
import type { Service } from "../../lib/services-types";

interface FeaturedServicesSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  maxServices?: number;
  showAllServicesText?: string;
  showAllServicesLink?: string;
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

const FeaturedServicesSection: React.FC<FeaturedServicesSectionProps> = ({
  title = "Nuestros servicios",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  maxServices = 2,
  showAllServicesText = "Explorar todos los servicios",
  showAllServicesLink = "/servicios",
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTheme = () => setCurrentTheme(themeManager.getTheme());
    checkTheme();
    const handler = () => checkTheme();
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      try {
        const data = await obtenerServicios({ status: "published", limit: maxServices });
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, [maxServices]);

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
  const cardBorder = isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.1)";
  const accentSoft = `color-mix(in srgb, ${accent} 16%, transparent)`;
  const skeletonA = isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)";
  const skeletonB = isLight ? "#eef2f7" : "rgba(255,255,255,0.05)";

  const bw = num(styles?.buttonBorderWidth ?? buttonBorderWidth, 0);
  const buttonColor = styles?.buttonTextColor || buttonTextColor || "#ffffff";
  const buttonRadius = toPx(styles?.buttonBorderRadius || buttonBorderRadius, "8px");
  const buttonBorder =
    bw > 0 ? `${bw}px solid ${styles?.buttonBorderColor || buttonBorderColor || accent}` : "none";

  const buttonStyle: React.CSSProperties = {
    backgroundColor: accent,
    color: buttonColor,
    borderRadius: buttonRadius,
    border: buttonBorder,
    fontSize: "clamp(15px, 4vw, 16px)",
    fontWeight: 600,
    boxShadow: `0 10px 30px -10px ${accent}`,
  };

  const titleMobile = num(titleMobileFontSize, 32);
  const count = services.length;

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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7" aria-busy="true">
            {Array.from({ length: Math.min(Math.max(maxServices || 2, 1), 2) }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-3xl"
                style={{ backgroundColor: cardBg, border: cardBorder }}
              >
                <div className="aspect-[16/10] w-full" style={{ backgroundColor: skeletonA }} />
                <div className="space-y-3 p-5 sm:p-6">
                  <div className="h-5 w-2/3 rounded-full" style={{ backgroundColor: skeletonA }} />
                  <div className="h-3 w-full rounded-full" style={{ backgroundColor: skeletonB }} />
                  <div className="h-3 w-4/5 rounded-full" style={{ backgroundColor: skeletonB }} />
                  <div className="mt-5 h-12 w-full rounded-xl" style={{ backgroundColor: skeletonB }} />
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

        {/* ---------- Servicios ---------- */}
        {count > 0 && (
          <div
            className={`grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7 ${
              count >= 3 ? "lg:grid-cols-3" : ""
            } ${count === 1 ? "mx-auto max-w-xl md:grid-cols-1" : ""}`}
          >
            {services.map((service, index) => (
              <Reveal key={service.id} delay={Math.min(index, 4) * 80} className="h-full">
                <Link href={`/servicios/${service.slug}`} className="group block h-full">
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-3xl text-left transition-all duration-300 active:scale-[0.985] md:hover:-translate-y-1.5 md:hover:shadow-2xl"
                    style={{
                      backgroundColor: cardBg,
                      border: cardBorder,
                      boxShadow: isLight ? "0 10px 30px -18px rgba(15,23,42,0.3)" : "none",
                    }}
                  >
                    {/* Imagen */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {service.coverImage ? (
                        <img
                          src={service.coverImage}
                          alt={service.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${accent}, #1e293b)` }}
                        >
                          <span
                            className="material-icons-round"
                            style={{ fontSize: 56, color: "rgba(255,255,255,0.85)" }}
                          >
                            design_services
                          </span>
                        </div>
                      )}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)",
                        }}
                      />
                      {/* Número del servicio */}
                      <span
                        className="absolute left-3 top-3 flex h-9 min-w-[36px] items-center justify-center rounded-full px-2 text-xs font-bold text-white shadow-lg sm:left-4 sm:top-4"
                        style={{ backgroundColor: accent }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                      <h3
                        className="leading-snug"
                        style={{
                          fontSize: "clamp(19px, 5vw, 24px)",
                          fontWeight: 700,
                          color: textCol,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {service.title}
                      </h3>

                      {service.briefDescription && (
                        <p
                          className="mt-2.5 line-clamp-4"
                          style={{
                            fontSize: "clamp(14px, 3.8vw, 16px)",
                            lineHeight: 1.65,
                            color: textCol,
                            opacity: isLight ? 0.75 : 0.68,
                          }}
                        >
                          {service.briefDescription}
                        </p>
                      )}

                      {/* CTA: toda la card es tocable, el botón es visual */}
                      <div
                        className="mt-auto inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-6 py-3 pt-3 transition-all duration-300 group-hover:brightness-110"
                        style={{
                          ...buttonStyle,
                          marginTop: 20,
                          fontSize: "clamp(14px, 3.8vw, 15px)",
                        }}
                      >
                        Conocer servicio
                        <span
                          className="material-icons-round transition-transform duration-300 group-hover:translate-x-1"
                          style={{ fontSize: 20 }}
                        >
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* ---------- Ver todos ---------- */}
        {showAllServicesText && (
          <Reveal className="mt-8 sm:mt-12 lg:mt-14">
            <div className="flex justify-center">
              <Link
                href={showAllServicesLink}
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-7 py-3.5 transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                style={buttonStyle}
              >
                {showAllServicesText}
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

export default FeaturedServicesSection;