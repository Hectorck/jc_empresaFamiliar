"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTracking } from "../lib/useAnalytics";
import { themeManager } from "./themeManager";

/* ---------------- Iconos ---------------- */

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconWhatsApp = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" />
  </svg>
);

const IconTikTok = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48.04 2.96.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.23 1.61-.24 1.46.31 2.92 1.56 3.73 2.88.31.48.56 1.01.76 1.58.08.13.19.13.28.03 1.08-1.13 2.69-1.6 4.3-1.31.64.12 1.26.34 1.85.61.15.07.32.11.49.13z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IconUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* ---------------- Datos del negocio ---------------- */

const WHATSAPP_NUMBER = "+593996254372"; // solo números, con código de país, sin '+' ni espacios
const WHATSAPP_DISPLAY = "+593 99 625 4372"; // como se muestra al usuario
const EMAIL = "contacto@juancarlosvargas.com";
const INSTAGRAM_URL = "https://www.instagram.com/juancarlossvargas/";
const DEV_INSTAGRAM_URL = "https://www.instagram.com/hector.cobena/";

const ACCENT = "#3b82f6";

const socialLinks = [
  { href: INSTAGRAM_URL, label: "Instagram", Icon: IconInstagram },
];

const helpLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/conferencias", label: "Conferencias" },
  { href: "/interlocutores", label: "Sobre mí" },
  { href: "/blogs", label: "Artículos" },
];

/* ---------------- Estilos (autocontenidos, sin Tailwind ni CSS module) ---------------- */

const css = `
.jcvft{position:relative;overflow:hidden;width:100%;padding:56px 20px 24px}
.jcvft *{box-sizing:border-box}
.jcvft-wrap{position:relative;z-index:1;max-width:1152px;margin:0 auto}
.jcvft-glow{position:absolute;width:320px;height:320px;border-radius:50%;filter:blur(90px);opacity:.16;pointer-events:none;background:var(--ft-accent)}
.jcvft-glow.l{left:-120px;top:-80px}
.jcvft-glow.r{right:-120px;bottom:-100px}

/* CTA */
.jcvft-cta{position:relative;display:flex;flex-direction:column;gap:20px;padding:24px 20px;border-radius:24px;border:1px solid var(--ft-accent-border);background:linear-gradient(135deg,var(--ft-accent-soft) 0%,transparent 100%);margin-bottom:44px;text-align:center}
.jcvft-cta-title{margin:0;font-size:clamp(22px,6vw,32px);font-weight:800;line-height:1.15;letter-spacing:-.02em}
.jcvft-cta-text{margin:8px 0 0;font-size:clamp(14px,3.8vw,16px);line-height:1.6;opacity:.8}
.jcvft-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;width:100%;padding:14px 26px;border-radius:14px;background:var(--ft-accent);color:#fff;font-size:16px;font-weight:600;text-decoration:none;box-shadow:0 10px 30px -10px var(--ft-accent);transition:transform .2s ease,filter .2s ease}
.jcvft-btn:active{transform:scale(.98)}
.jcvft-btn:hover{filter:brightness(1.1)}

/* Grid principal */
.jcvft-grid{display:grid;grid-template-columns:1fr;gap:36px}
.jcvft-brand{margin:0;font-size:clamp(24px,6.5vw,30px);font-weight:800;letter-spacing:-.02em;line-height:1.1}
.jcvft-tag{margin:10px 0 0;font-size:15px;line-height:1.6;max-width:320px}
.jcvft-title{margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ft-accent)}

/* Redes */
.jcvft-socials{display:flex;gap:10px;margin:20px 0 0;padding:0;list-style:none}
.jcvft-social{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;border:1px solid var(--ft-border);background:var(--ft-card);color:inherit;transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease}
.jcvft-social:active{transform:scale(.94)}
.jcvft-social:hover{background:var(--ft-accent);border-color:var(--ft-accent);color:#fff}

/* Enlaces */
.jcvft-links{display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;margin:0;padding:0;list-style:none}
.jcvft-link{display:inline-flex;align-items:center;min-height:44px;font-size:15px;text-decoration:none;opacity:.78;transition:opacity .2s ease,transform .2s ease}
.jcvft-link:hover{opacity:1;transform:translateX(3px)}

/* Contacto */
.jcvft-contacts{display:flex;flex-direction:column;gap:10px}
.jcvft-contact{display:flex;align-items:center;gap:12px;min-height:60px;padding:10px 14px;border-radius:16px;border:1px solid var(--ft-border);background:var(--ft-card);color:inherit;text-decoration:none;transition:transform .2s ease,border-color .2s ease}
.jcvft-contact:active{transform:scale(.985)}
.jcvft-contact:hover{border-color:var(--ft-accent)}
.jcvft-ico{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:40px;height:40px;border-radius:12px;background:var(--ft-accent-soft);color:var(--ft-accent)}
.jcvft-ct{min-width:0}
.jcvft-ct small{display:block;font-size:11px;opacity:.6;letter-spacing:.04em}
.jcvft-ct span{display:block;font-size:14.5px;font-weight:600;overflow-wrap:anywhere}

/* Parte inferior: en móvil/tablet se apila; desde 1024px va todo en UNA sola fila */
.jcvft-divider{height:1px;margin:40px 0 24px;background:var(--ft-border)}
.jcvft-bottom{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}
.jcvft-copy{margin:0;font-size:13px;opacity:.7;line-height:1.6}
.jcvft-meta{display:flex;flex-direction:column;align-items:center;gap:6px}
.jcvft-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;border:1px solid var(--ft-border);background:var(--ft-card);font-size:12.5px;font-weight:500;white-space:nowrap}
.jcvft-dot{width:8px;height:8px;border-radius:50%;background:var(--ft-accent);box-shadow:0 0 0 4px var(--ft-accent-soft)}
.jcvft-dev{display:inline-flex;align-items:center;min-height:40px;font-size:13px;text-decoration:none;white-space:nowrap;opacity:.75;transition:opacity .2s ease}
.jcvft-dev:hover{opacity:1}
.jcvft-up{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:46px;height:46px;border-radius:50%;border:1px solid var(--ft-border);background:var(--ft-card);color:inherit;cursor:pointer;transition:transform .2s ease,background .2s ease,color .2s ease}
.jcvft-up:active{transform:scale(.94)}
.jcvft-up:hover{background:var(--ft-accent);color:#fff;border-color:var(--ft-accent)}

@media (min-width:640px){
  .jcvft{padding:72px 32px 28px}
  .jcvft-cta{flex-direction:row;align-items:center;justify-content:space-between;text-align:left;padding:32px 36px;margin-bottom:56px}
  .jcvft-btn{width:auto;flex-shrink:0}
}
@media (min-width:768px){
  .jcvft-grid{grid-template-columns:1.3fr 1fr 1.3fr;gap:48px}
  .jcvft-links{grid-template-columns:1fr}
}
@media (min-width:1024px){
  .jcvft-bottom{flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:nowrap;gap:20px;text-align:left}
  .jcvft-copy{white-space:nowrap}
  .jcvft-meta{flex-direction:row;align-items:center;gap:16px}
}
@media (prefers-reduced-motion:reduce){
  .jcvft *{transition:none!important}
}
`;

/* ---------------- Componente ---------------- */

const Footer: React.FC = () => {
  const { trackLinkClick } = useTracking();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const checkTheme = () => setTheme(themeManager.getTheme());
    checkTheme();
    const handler = () => checkTheme();
    window.addEventListener("theme-changed", handler);
    return () => window.removeEventListener("theme-changed", handler);
  }, []);

  const isLight = theme === "light";

  const cssVars = {
    "--ft-accent": ACCENT,
    "--ft-accent-soft": `color-mix(in srgb, ${ACCENT} 16%, transparent)`,
    "--ft-accent-border": `color-mix(in srgb, ${ACCENT} 35%, transparent)`,
    "--ft-border": isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.14)",
    "--ft-card": isLight ? "rgba(15,23,42,0.03)" : "rgba(255,255,255,0.05)",
    background: "var(--bg)",
    color: "var(--footerText)",
  } as React.CSSProperties;

  const track = () => trackLinkClick().catch(console.error);

  return (
    <footer className="jcvft" style={cssVars}>
      <style>{css}</style>
      <div className="jcvft-glow l" />
      <div className="jcvft-glow r" />

      <div className="jcvft-wrap">
        {/* CTA */}
        <div className="jcvft-cta">
          <div>
            <h2 className="jcvft-cta-title" style={{ color: "var(--text)" }}>
              Hablemos de tu empresa familiar
            </h2>
            <p className="jcvft-cta-text" style={{ color: "var(--textSecondary)" }}>
              Escríbenos y conversemos sobre cómo hacer que tu empresa perdure.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="jcvft-btn"
            onClick={track}
          >
            <IconWhatsApp size={22} />
            Escríbenos por WhatsApp
            <IconArrow />
          </a>
        </div>

        {/* Grid principal */}
        <div className="jcvft-grid">
          {/* Marca + redes */}
          <div>
            <h2 className="jcvft-brand" style={{ color: "var(--text)" }}>
              Juan Carlos Vargas
            </h2>
            <p className="jcvft-tag" style={{ color: "var(--textSecondary)" }}>
              Empresas familiares que perduran
            </p>
            <ul className="jcvft-socials">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="jcvft-social"
                    style={{ color: "var(--text)" }}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    aria-label={label}
                    onClick={track}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="jcvft-title">Ayuda</h3>
            <ul className="jcvft-links">
              {helpLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="jcvft-link"
                    style={{ color: "var(--text)" }}
                    onClick={track}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="jcvft-title">Contáctanos</h3>
            <div className="jcvft-contacts">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="jcvft-contact"
                style={{ color: "var(--text)" }}
                onClick={track}
              >
                <span className="jcvft-ico">
                  <IconWhatsApp />
                </span>
                <span className="jcvft-ct">
                  <small>WhatsApp</small>
                  <span>{WHATSAPP_DISPLAY}</span>
                </span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="jcvft-contact"
                style={{ color: "var(--text)" }}
                onClick={track}
              >
                <span className="jcvft-ico">
                  <IconMail />
                </span>
                <span className="jcvft-ct">
                  <small>Correo</small>
                  <span>{EMAIL}</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="jcvft-divider" />

        {/* Parte inferior (una sola fila en escritorio) */}
        <div className="jcvft-bottom">
          <p className="jcvft-copy" style={{ color: "var(--textSecondary)" }}>
            © {new Date().getFullYear()} Juan Carlos Vargas. Todos los derechos reservados.
          </p>

          <div className="jcvft-meta">
            <div className="jcvft-badge" style={{ color: "var(--text)" }}>
              <span className="jcvft-dot" />
              Asesoría de Empresas Familiares
            </div>
            <a
              href={DEV_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="jcvft-dev"
              style={{ color: "var(--textSecondary)" }}
              onClick={track}
            >
              Desarrollado por Héctor Cobeña
            </a>
          </div>

          <button
            type="button"
            className="jcvft-up"
            style={{ color: "var(--text)" }}
            aria-label="Volver arriba"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <IconUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;