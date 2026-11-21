"use client";

import React, { useEffect, useRef, useState } from "react";
import { themeManager } from "../../components/themeManager";

interface MethodologyStep {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface MethodologySectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  steps?: MethodologyStep[];
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  textAlign?: string;
  borderRadius?: string;
  accentColor?: string;
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
  as?: "div" | "li";
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ as = "div", children, delay = 0, className = "" }) => {
  const ref = useRef<any>(null);
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

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};

/* ---------- Estilos (autocontenidos, sin Tailwind) ---------- */

const css = `
.mtd *{box-sizing:border-box}
.mtd-wrap{width:100%;max-width:1152px;margin:0 auto;padding:0 20px}

/* Encabezado */
.mtd-head{max-width:720px;margin:0 auto 40px;text-align:center}
.mtd-bar{display:block;width:48px;height:4px;border-radius:999px;margin:16px auto 0;background:var(--mt-accent)}
.mtd-sub{margin:20px 0 0;line-height:1.65}

/* Lista: línea de tiempo vertical (móvil y tablet) */
.mtd-list{list-style:none;margin:0 auto;padding:0;max-width:680px;display:grid;gap:20px;grid-template-columns:1fr}
.mtd-item{position:relative;padding-left:66px;display:flex}
.mtd-item::before{content:"";position:absolute;left:23px;top:54px;bottom:-16px;width:2px;border-radius:2px;background:linear-gradient(to bottom,var(--mt-accent),var(--mt-accent-border))}
.mtd-item.mtd-end::before{display:none}

.mtd-num{position:absolute;left:0;top:0;z-index:2;display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:var(--mt-accent);color:#fff;font-size:20px;font-weight:800;box-shadow:0 0 0 6px var(--mt-accent-soft),0 12px 24px -8px var(--mt-accent)}

/* Card */
.mtd-card{position:relative;flex:1;min-width:0;overflow:hidden;padding:20px;border-radius:22px;border:1px solid var(--mt-border);background:var(--mt-card);text-align:left;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
.mtd-ghost{position:absolute;right:14px;top:2px;font-size:84px;font-weight:800;line-height:1;letter-spacing:-.04em;color:var(--mt-accent);opacity:.08;pointer-events:none;user-select:none}
.mtd-img{position:relative;width:100%;aspect-ratio:16/9;margin-bottom:16px;border-radius:14px;overflow:hidden;background:var(--mt-img-bg)}
.mtd-img img{display:block;width:100%;height:100%;object-fit:cover}
.mtd-eyebrow{position:relative;display:inline-block;padding:4px 10px;border-radius:999px;background:var(--mt-accent-soft);color:var(--mt-accent);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.mtd-h{position:relative;margin:12px 0 0;line-height:1.2;letter-spacing:-.01em}
.mtd-p{position:relative;margin:8px 0 0;line-height:1.65}

@media (hover:hover){
  .mtd-card:hover{transform:translateY(-5px);border-color:var(--mt-accent-border);box-shadow:0 24px 50px -24px var(--mt-accent)}
}

@media (min-width:640px){
  .mtd-wrap{padding:0 32px}
  .mtd-head{margin-bottom:56px}
  .mtd-item{padding-left:76px}
  .mtd-item::before{left:27px;top:62px}
  .mtd-num{width:56px;height:56px;font-size:22px}
  .mtd-card{padding:26px}
}

/* Escritorio: línea de tiempo horizontal */
@media (min-width:1024px){
  .mtd-head{margin-bottom:64px}
  .mtd-list{max-width:none;grid-template-columns:repeat(var(--mt-cols,4),1fr);gap:28px 24px}
  .mtd-item{padding-left:0;padding-top:78px}
  .mtd-item::before{left:68px;right:-14px;top:27px;bottom:auto;width:auto;height:2px;background:linear-gradient(to right,var(--mt-accent),var(--mt-accent-border))}
  .mtd-item.mtd-end::before{display:none}
  .mtd-item.mtd-rowend::before{display:none}
  .mtd-num{left:0;top:0}
  .mtd-card{padding:24px}
}

@media (prefers-reduced-motion:reduce){
  .mtd *{transition:none!important}
}
`;

/* ---------- Componente ---------- */

const MethodologySection: React.FC<MethodologySectionProps> = ({
  title = "Nuestra metodología",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  steps = [],
  backgroundColor = "",
  textColor = "",
  paddingTop = "80",
  paddingBottom = "80",
  textAlign = "center",
  borderRadius = "0",
  accentColor = "",
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

  const accent = styles?.accentColor || accentColor || "#3b82f6";
  const textCol = styles?.textColor || textColor || "var(--text)";
  const pt = toPx(styles?.paddingTop || paddingTop, "80px");
  const pb = toPx(styles?.paddingBottom || paddingBottom, "80px");

  // Valores por defecto si no hay etapas configuradas
  const defaultSteps: MethodologyStep[] = [
    { id: "1", title: "Diagnóstico", description: "Comprendemos la situación de la empresa" },
    { id: "2", title: "Análisis", description: "Identificamos desafíos y oportunidades" },
    { id: "3", title: "Estrategia", description: "Diseñamos soluciones personalizadas" },
    { id: "4", title: "Acompañamiento", description: "Apoyamos la implementación" },
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;
  const cols = Math.min(Math.max(displaySteps.length, 1), 4);
  const titleMobile = num(titleMobileFontSize, 32);

  const sectionStyle = {
    backgroundColor: styles?.backgroundColor || backgroundColor || "var(--bg)",
    color: textCol,
    paddingTop: `clamp(48px, 12vw, ${pt})`,
    paddingBottom: `clamp(48px, 12vw, ${pb})`,
    borderRadius: toPx(styles?.borderRadius || borderRadius),
    overflow: "hidden",
    "--mt-accent": accent,
    "--mt-accent-soft": `color-mix(in srgb, ${accent} 16%, transparent)`,
    "--mt-accent-border": `color-mix(in srgb, ${accent} 38%, transparent)`,
    "--mt-border": isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.1)",
    "--mt-card": isLight ? "#ffffff" : "rgba(255,255,255,0.05)",
    "--mt-img-bg": isLight ? "#f1f5f9" : "rgba(255,255,255,0.05)",
    "--mt-cols": cols,
  } as React.CSSProperties;

  return (
    <section style={sectionStyle} className="mtd w-full">
      <style>{css}</style>

      <div className="mtd-wrap">
        {/* ---------- Encabezado ---------- */}
        {(title || subtitle) && (
          <Reveal className="mtd-head">
            {title && (
              <h2
                style={{
                  margin: 0,
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
            <span className="mtd-bar" />
            {subtitle && (
              <p
                className="mtd-sub"
                style={{
                  fontSize:
                    fieldStyles?.subtitle?.fontSize ||
                    `clamp(16px, 3.6vw, ${num(subtitleMobileFontSize, 20)}px)`,
                  color: fieldStyles?.subtitle?.color || textCol,
                  opacity: isLight ? 0.78 : 0.7,
                }}
              >
                {subtitle}
              </p>
            )}
          </Reveal>
        )}

        {/* ---------- Etapas ---------- */}
        <ol className="mtd-list" style={{ listStyle: "none" }}>
          {displaySteps.map((step, index) => {
            const isEnd = index === displaySteps.length - 1;
            const isRowEnd = (index + 1) % cols === 0;
            return (
              <Reveal
                as="li"
                key={step.id || index}
                delay={Math.min(index, 5) * 90}
                className={`mtd-item${isEnd ? " mtd-end" : ""}${isRowEnd ? " mtd-rowend" : ""}`}
              >
                <span className="mtd-num" aria-hidden="true">
                  {index + 1}
                </span>

                <article className="mtd-card">
                  <span className="mtd-ghost" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {step.image && (
                    <div className="mtd-img">
                      <img src={step.image} alt={step.title || `Etapa ${index + 1}`} loading="lazy" />
                    </div>
                  )}

                  <span className="mtd-eyebrow">Etapa {index + 1}</span>

                  <h3
                    className="mtd-h"
                    style={{
                      fontSize: "clamp(19px, 5vw, 22px)",
                      fontWeight: 700,
                      color: textCol,
                    }}
                  >
                    {step.title}
                  </h3>

                  {step.description && (
                    <p
                      className="mtd-p"
                      style={{
                        fontSize: "clamp(14px, 3.8vw, 16px)",
                        color: textCol,
                        opacity: isLight ? 0.76 : 0.68,
                      }}
                    >
                      {step.description}
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default MethodologySection;