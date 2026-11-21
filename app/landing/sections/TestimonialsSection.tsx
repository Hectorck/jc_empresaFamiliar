"use client";

import React, { useEffect, useRef, useState } from "react";
import { themeManager } from "../../components/themeManager";

interface Testimonial {
  id?: string;
  name?: string;
  company?: string;
  position?: string;
  testimonial?: string;
  photo?: string;
  results?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  visibleTestimonials?: number;
  testimonials?: Testimonial[];
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const IconChevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/* ---------- Estilos (autocontenidos, sin Tailwind) ---------- */

const css = `
.tms *{box-sizing:border-box}
.tms-wrap{width:100%;max-width:1152px;margin:0 auto;padding:0 20px}

/* Encabezado */
.tms-head{max-width:720px;margin:0 auto 36px;text-align:center}
.tms-bar{display:block;width:48px;height:4px;border-radius:999px;margin:16px auto 0;background:var(--tm-accent)}
.tms-sub{margin:20px 0 0;line-height:1.65}

/* Grid: 1 card por fila en móvil, N en escritorio */
.tms-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;align-items:stretch}
.tms-item{display:flex;animation:tmsIn .45s cubic-bezier(.22,1,.36,1) both}
@keyframes tmsIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* Card */
.tms-card{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;border-radius:26px;border:1px solid var(--tm-border);background:var(--tm-card);text-align:left;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}

/* Foto protagonista */
.tms-photo{position:relative;width:100%;aspect-ratio:10/11;overflow:hidden;background:linear-gradient(135deg,var(--tm-accent),#1e293b)}
.tms-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 22%;transition:transform .7s ease}
.tms-fallback{display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:72px;font-weight:800;letter-spacing:-.03em;color:rgba(255,255,255,.9)}
.tms-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(to top,rgba(8,12,24,.88) 0%,rgba(8,12,24,.45) 32%,rgba(8,12,24,0) 62%)}
.tms-who{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:18px 18px 16px;color:#fff}
.tms-name{margin:0;font-size:clamp(18px,5vw,21px);font-weight:800;line-height:1.2;letter-spacing:-.01em}
.tms-pos{margin:4px 0 0;font-size:13px;line-height:1.4;opacity:.85}
.tms-co{display:inline-block;margin-top:8px;padding:4px 10px;border-radius:999px;background:var(--tm-accent);color:#fff;font-size:11.5px;font-weight:700;letter-spacing:.02em}

/* Cuerpo */
.tms-body{display:flex;flex-direction:column;flex:1;gap:14px;padding:20px 18px 22px}
.tms-text{margin:0;line-height:1.7}
.tms-res{display:flex;gap:10px;padding:12px 14px;border-radius:14px;border:1px solid var(--tm-accent-border);background:var(--tm-accent-soft)}
.tms-res-ico{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:24px;border-radius:50%;background:var(--tm-accent);color:#fff;margin-top:1px}
.tms-res b{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--tm-accent)}
.tms-res span{display:block;margin-top:3px;font-size:13.5px;line-height:1.55}

/* Controles: flechas + puntos (móvil y escritorio) */
.tms-ctrl{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:24px}
.tms-arrow{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:52px;height:52px;border-radius:50%;border:none;background:var(--tm-accent);color:#fff;cursor:pointer;box-shadow:0 10px 24px -10px var(--tm-accent);transition:transform .2s ease,filter .2s ease}
.tms-arrow:hover{filter:brightness(1.1)}
.tms-arrow:active{transform:scale(.92)}
.tms-dots{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;max-width:160px}
.tms-dot{height:10px;width:10px;padding:0;border:none;border-radius:999px;background:var(--tm-dot);cursor:pointer;transition:width .3s ease,background .3s ease}
.tms-dot.on{width:26px;background:var(--tm-accent)}

/* Estado vacío */
.tms-empty{max-width:640px;margin:0 auto;padding:28px 22px;border-radius:24px;text-align:center;border:1px solid var(--tm-accent-border);background:linear-gradient(135deg,var(--tm-accent-soft) 0%,transparent 100%)}

@media (hover:hover){
  .tms-card:hover{transform:translateY(-6px);border-color:var(--tm-accent-border);box-shadow:0 26px 50px -26px var(--tm-accent)}
  .tms-card:hover .tms-photo img{transform:scale(1.05)}
}

/* Tablet: la card única no se estira de más */
@media (min-width:640px){
  .tms-wrap{padding:0 32px}
  .tms-head{margin-bottom:48px}
  .tms-grid{grid-template-columns:minmax(0,460px);justify-content:center}
  .tms-body{padding:22px 22px 24px}
  .tms-who{padding:20px 22px 18px}
}

/* Escritorio: ventana de N testimonios */
@media (min-width:900px){
  .tms-head{margin-bottom:56px}
  .tms-grid{grid-template-columns:repeat(var(--tm-cols,3),minmax(0,1fr));justify-content:stretch}
  .tms-grid.tms-one{grid-template-columns:minmax(0,420px);justify-content:center}
  .tms-ctrl{margin-top:36px;gap:16px}
  .tms-arrow{width:48px;height:48px}
}

@media (prefers-reduced-motion:reduce){
  .tms *{transition:none!important;animation:none!important}
}
`;

/* ---------- Componente ---------- */

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = "Testimonios y experiencias",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  visibleTestimonials = 3,
  testimonials = [],
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const checkTheme = () => setCurrentTheme(themeManager.getTheme());
    checkTheme();
    const handler = () => checkTheme();
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  /* Escritorio (>=900px) muestra N cards; móvil y tablet muestran 1 */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const isLight = currentTheme === "light";

  const accent = styles?.accentColor || accentColor || "#3b82f6";
  const textCol = styles?.textColor || textColor || "var(--text)";
  const pt = toPx(styles?.paddingTop || paddingTop, "80px");
  const pb = toPx(styles?.paddingBottom || paddingBottom, "80px");

  const total = testimonials.length;
  const desktopCount = Math.min(Math.max(num(visibleTestimonials, 3), 1), 4);
  const perView = isDesktop ? desktopCount : 1;
  const cols = Math.min(desktopCount, Math.max(total, 1));
  const maxIndex = Math.max(total - perView, 0);
  const safeIndex = Math.min(currentIndex, maxIndex);
  const hasNav = total > perView;
  const windowList = testimonials.slice(safeIndex, safeIndex + perView);

  const nextSlide = () => setCurrentIndex(safeIndex >= maxIndex ? 0 : safeIndex + 1);
  const prevSlide = () => setCurrentIndex(safeIndex <= 0 ? maxIndex : safeIndex - 1);

  /* Deslizar con el dedo también cambia de card (opcional, además de las flechas) */
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || !hasNav) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    dx < 0 ? nextSlide() : prevSlide();
  };

  const sectionStyle = {
    backgroundColor: styles?.backgroundColor || backgroundColor || "var(--bg)",
    color: textCol,
    paddingTop: `clamp(48px, 12vw, ${pt})`,
    paddingBottom: `clamp(48px, 12vw, ${pb})`,
    borderRadius: toPx(styles?.borderRadius || borderRadius),
    overflow: "hidden",
    "--tm-accent": accent,
    "--tm-accent-soft": `color-mix(in srgb, ${accent} 14%, transparent)`,
    "--tm-accent-border": `color-mix(in srgb, ${accent} 38%, transparent)`,
    "--tm-border": isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.1)",
    "--tm-card": isLight ? "#ffffff" : "rgba(255,255,255,0.05)",
    "--tm-dot": isLight ? "rgba(15,23,42,0.18)" : "rgba(255,255,255,0.22)",
    "--tm-cols": cols,
  } as React.CSSProperties;

  const titleMobile = num(titleMobileFontSize, 32);

  const renderCard = (t: Testimonial, i: number) => (
    <article className="tms-card" style={{ boxShadow: isLight ? "0 12px 32px -20px rgba(15,23,42,0.35)" : "none" }}>
      <div className="tms-photo">
        {t.photo ? (
          <img src={t.photo} alt={t.name || `Testimonio ${i + 1}`} loading="lazy" />
        ) : (
          <div className="tms-fallback">{initials(t.name)}</div>
        )}
        <div className="tms-shade" />
        <div className="tms-who">
          {t.name && <h3 className="tms-name">{t.name}</h3>}
          {t.position && <p className="tms-pos">{t.position}</p>}
          {t.company && <span className="tms-co">{t.company}</span>}
        </div>
      </div>

      <div className="tms-body">
        {t.testimonial && (
          <p
            className="tms-text"
            style={{
              fontSize: "clamp(14.5px, 3.9vw, 16px)",
              color: textCol,
              opacity: isLight ? 0.85 : 0.8,
            }}
          >
            {t.testimonial}
          </p>
        )}

        {t.results && (
          <div className="tms-res">
            <span className="tms-res-ico">
              <IconCheck />
            </span>
            <div style={{ minWidth: 0, color: textCol }}>
              <b>Resultados</b>
              <span style={{ opacity: isLight ? 0.8 : 0.72 }}>{t.results}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );

  return (
    <section style={sectionStyle} className="tms w-full">
      <style>{css}</style>

      <div className="tms-wrap">
        {/* ---------- Encabezado ---------- */}
        {(title || subtitle) && (
          <Reveal className="tms-head">
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
            <span className="tms-bar" />
            {subtitle && (
              <p
                className="tms-sub"
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

        {total > 0 ? (
          <Reveal>
            {/* Cards: 1 en móvil/tablet, N en escritorio */}
            <div
              className={`tms-grid${total === 1 ? " tms-one" : ""}`}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {windowList.map((t, i) => (
                <div key={`${t.id || "t"}-${safeIndex + i}`} className="tms-item">
                  {renderCard(t, safeIndex + i)}
                </div>
              ))}
            </div>

            {/* Controles: flechas + puntos */}
            {hasNav && (
              <div className="tms-ctrl">
                <button type="button" className="tms-arrow" onClick={prevSlide} aria-label="Anterior">
                  <IconChevron dir="left" />
                </button>

                <div className="tms-dots">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Ir al testimonio ${i + 1}`}
                      className={`tms-dot${safeIndex === i ? " on" : ""}`}
                      onClick={() => setCurrentIndex(i)}
                    />
                  ))}
                </div>

                <button type="button" className="tms-arrow" onClick={nextSlide} aria-label="Siguiente">
                  <IconChevron dir="right" />
                </button>
              </div>
            )}
          </Reveal>
        ) : (
          <Reveal>
            <div className="tms-empty">
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(15px, 4vw, 18px)",
                  lineHeight: 1.65,
                  color: textCol,
                }}
              >
                Pronto compartiremos las experiencias de nuestros clientes.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;