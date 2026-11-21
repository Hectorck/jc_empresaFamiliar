
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { themeManager } from "../../components/themeManager";
import { getPublishedBlogs } from "../../lib/blogs-db";
import type { Blog } from "../../lib/blog-types";

interface FeaturedBlogsSectionProps {
  title?: string;
  titleMobileFontSize?: string;
  subtitle?: string;
  subtitleMobileFontSize?: string;
  maxBlogs?: number;
  selectedBlogIds?: string;
  showAllBlogsText?: string;
  showAllBlogsLink?: string;
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

const FeaturedBlogsSection: React.FC<FeaturedBlogsSectionProps> = ({
  title = "Blog / Conocimiento empresarial",
  titleMobileFontSize = "32",
  subtitle = "",
  subtitleMobileFontSize = "20",
  maxBlogs = 3,
  selectedBlogIds = "",
  showAllBlogsText = "Explorar todos los artículos",
  showAllBlogsLink = "/blogs",
  backgroundColor = "",
  textColor = "",
  paddingTop = "100",
  paddingBottom = "100",
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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setCurrentTheme(themeManager.getTheme());
    };

    checkTheme();

    window.addEventListener("theme-changed", checkTheme);

    return () => {
      window.removeEventListener("theme-changed", checkTheme);
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadBlogs() {
      setLoading(true);

      try {
        const allBlogs = await getPublishedBlogs();

        if (!active) return;

        if (selectedBlogIds) {
          const ids = selectedBlogIds
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean);

          const selectedBlogs = allBlogs.filter((blog) =>
            ids.includes(blog.id)
          );

          setBlogs(selectedBlogs.slice(0, maxBlogs));
        } else {
          setBlogs(allBlogs.slice(0, maxBlogs));
        }
      } catch (error) {
        console.error("Error loading blogs:", error);

        if (active) setBlogs([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadBlogs();

    return () => {
      active = false;
    };
  }, [maxBlogs, selectedBlogIds]);

  const isLight = currentTheme === "light";

  const colors = {
    background:
      styles?.backgroundColor ||
      backgroundColor ||
      "var(--bg)",

    text:
      styles?.textColor ||
      textColor ||
      "var(--text)",

    muted: isLight ? "#64748b" : "#94a3b8",

    card: isLight ? "#ffffff" : "#111c2d",

    border: isLight
      ? "rgba(15, 23, 42, 0.09)"
      : "rgba(255, 255, 255, 0.09)",

    accent: "#3b82f6",

    softAccent: isLight
      ? "rgba(59, 130, 246, 0.08)"
      : "rgba(59, 130, 246, 0.15)",
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
    paddingTop: styles?.paddingTop || `${paddingTop}px`,
    paddingBottom: styles?.paddingBottom || `${paddingBottom}px`,
    borderRadius: styles?.borderRadius || borderRadius,
    width: "100%",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor:
      styles?.buttonBackgroundColor ||
      buttonBackgroundColor ||
      "#3b82f6",

    color:
      styles?.buttonTextColor ||
      buttonTextColor ||
      "#ffffff",

    borderColor:
      styles?.buttonBorderColor ||
      buttonBorderColor ||
      "#3b82f6",

    borderWidth:
      styles?.buttonBorderWidth || buttonBorderWidth,

    borderRadius:
      styles?.buttonBorderRadius || buttonBorderRadius,
  };

  const formatDate = (timestamp?: any) => {
    if (!timestamp) return "";

    try {
      const date = timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

      if (Number.isNaN(date.getTime())) return "";

      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const getFirstImage = (blog: Blog) => {
    const imageBlock = blog.blocks?.find(
      (block) => block.type === "image"
    );

    return imageBlock && "url" in imageBlock
      ? imageBlock.url
      : null;
  };

  const getReadingTime = (blog: Blog) => {
    const text = [
      blog.title,
      blog.description || "",
      ...(blog.blocks || []).map((block: any) =>
        typeof block.text === "string" ? block.text : ""
      ),
    ].join(" ");

    const words = text.trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 200));
  };

  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "15px 28px",
    fontSize: "14px",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: buttonStyle.borderRadius,
    border:
      Number(buttonStyle.borderWidth) > 0
        ? `${buttonStyle.borderWidth}px solid ${buttonStyle.borderColor}`
        : "none",
    backgroundColor: buttonStyle.backgroundColor,
    color: buttonStyle.color,
    transition: "all 0.25s ease",
  };

  return (
    <section
      style={sectionStyle}
      className="w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Encabezado */}
        <div
          className="max-w-3xl mx-auto mb-12 md:mb-16"
          style={{ textAlign: "center" }}
        >
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              color: colors.accent,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: colors.accent,
              }}
            />
            IDEAS QUE IMPULSAN
            <span
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: colors.accent,
              }}
            />
          </div>

          {title && (
            <h2
              style={{
                fontSize:
                  fieldStyles?.title?.fontSize ||
                  `clamp(${titleMobileFontSize}px, 4vw, 46px)`,
                fontWeight:
                  fieldStyles?.title?.fontWeight || 700,
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                color: fieldStyles?.title?.color || colors.text,
                marginBottom: "18px",
              }}
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              style={{
                fontSize:
                  fieldStyles?.subtitle?.fontSize ||
                  `clamp(15px, 2vw, ${subtitleMobileFontSize}px)`,
                lineHeight: 1.8,
                color:
                  fieldStyles?.subtitle?.color || colors.muted,
                maxWidth: "650px",
                margin: "0 auto",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Cargando */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="w-full aspect-[16/10]"
                  style={{
                    backgroundColor: colors.softAccent,
                  }}
                />

                <div className="p-6 space-y-4">
                  <div
                    className="h-3 w-24 rounded"
                    style={{
                      backgroundColor: colors.softAccent,
                    }}
                  />
                  <div
                    className="h-5 w-full rounded"
                    style={{
                      backgroundColor: colors.softAccent,
                    }}
                  />
                  <div
                    className="h-3 w-3/4 rounded"
                    style={{
                      backgroundColor: colors.softAccent,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Artículos */}
        {!loading && blogs.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {blogs.map((blog) => {
              const coverImage = getFirstImage(blog);
              const date = formatDate(blog.createdAt);
              const readingTime = getReadingTime(blog);

              return (
                <article
                  key={blog.id}
                  className="blog-card group flex flex-col overflow-hidden"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "18px",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  {/* Imagen */}
                  <Link
                    href={`/blogs/${blog.id}`}
                    aria-label={`Leer ${blog.title}`}
                    className="block overflow-hidden relative"
                    style={{
                      aspectRatio: "16 / 10",
                      backgroundColor: colors.softAccent,
                    }}
                  >
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover blog-image"
                        style={{
                          transition: "transform 0.6s ease",
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          color: colors.accent,
                        }}
                      >
                        <span
                          className="material-icons-round"
                          style={{ fontSize: "48px" }}
                        >
                          article
                        </span>
                      </div>
                    )}

                    {blog.featured && (
                      <span
                        className="absolute top-4 left-4"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#2563eb",
                          padding: "7px 12px",
                          borderRadius: "6px",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          boxShadow:
                            "0 2px 10px rgba(0,0,0,0.12)",
                        }}
                      >
                        Destacado
                      </span>
                    )}
                  </Link>

                  {/* Contenido */}
                  <div className="flex flex-col flex-1 p-6 md:p-7">

                    {/* Metadatos */}
                    <div
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5"
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: colors.muted,
                      }}
                    >
                      {date && (
                        <span className="flex items-center gap-2">
                          <span
                            className="material-icons-round"
                            style={{ fontSize: "15px" }}
                          >
                            calendar_today
                          </span>
                          {date}
                        </span>
                      )}

                      <span className="flex items-center gap-2">
                        <span
                          className="material-icons-round"
                          style={{ fontSize: "15px" }}
                        >
                          schedule
                        </span>
                        {readingTime} min de lectura
                      </span>
                    </div>

                    {/* Título */}
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="no-underline"
                    >
                      <h3
                        className="blog-title"
                        style={{
                          fontSize: "clamp(19px, 2vw, 23px)",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          letterSpacing: "-0.4px",
                          color: colors.text,
                          marginBottom: "14px",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {blog.title}
                      </h3>
                    </Link>

                    {/* Descripción */}
                    <p
                      className="line-clamp-3"
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.8,
                        color: colors.muted,
                        marginBottom: "28px",
                        flex: 1,
                      }}
                    >
                      {blog.description ||
                        "Descubre nuevas perspectivas y conocimientos para impulsar el crecimiento de tu empresa."}
                    </p>

                    {/* Enlace */}
                    <div
                      className="pt-5"
                      style={{
                        borderTop: `1px solid ${colors.border}`,
                      }}
                    >
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="blog-read-link inline-flex items-center gap-2 no-underline"
                        style={{
                          color: colors.accent,
                          fontSize: "13px",
                          fontWeight: 700,
                          transition: "gap 0.2s ease",
                        }}
                      >
                        Leer artículo
                        <span
                          className="material-icons-round"
                          style={{ fontSize: "17px" }}
                        >
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Sin artículos */}
        {!loading && blogs.length === 0 && (
          <div
            className="max-w-2xl mx-auto text-center py-16 px-6"
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: "18px",
            }}
          >
            <span
              className="material-icons-round"
              style={{
                fontSize: "42px",
                color: colors.accent,
                marginBottom: "16px",
              }}
            >
              auto_stories
            </span>

            <h3
              style={{
                fontSize: "21px",
                fontWeight: 700,
                marginBottom: "10px",
                color: colors.text,
              }}
            >
              Próximamente
            </h3>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: colors.muted,
              }}
            >
              Estamos preparando nuevos artículos con ideas,
              conocimientos y perspectivas sobre empresas familiares.
            </p>
          </div>
        )}

        {/* Ver todos */}
        {!loading &&
          blogs.length > 0 &&
          showAllBlogsText && (
            <div className="flex justify-center mt-12 md:mt-16">
              <Link
                href={showAllBlogsLink}
                style={linkStyle}
                className="blog-all-link"
              >
                {showAllBlogsText}

                <span
                  className="material-icons-round"
                  style={{ fontSize: "18px" }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          )}
      </div>

      {/* Microinteracciones */}
      <style jsx>{`
        .blog-card:hover {
          transform: translateY(-6px);
          border-color: rgba(59, 130, 246, 0.35) !important;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.09);
        }

        .blog-card:hover .blog-image {
          transform: scale(1.055);
        }

        .blog-card:hover .blog-title {
          color: #3b82f6 !important;
        }

        .blog-read-link:hover {
          gap: 12px !important;
        }

        .blog-all-link:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }

        .blog-all-link {
          transition: all 0.25s ease;
        }

        @media (max-width: 640px) {
          section {
            padding-top: 65px !important;
            padding-bottom: 65px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .blog-card,
          .blog-image,
          .blog-read-link,
          .blog-all-link {
            transition: none !important;
          }

          .blog-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedBlogsSection;
