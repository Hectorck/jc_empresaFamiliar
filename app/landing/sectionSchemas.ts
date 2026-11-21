
export const sectionSchemas: { [key: string]: { type: string; label: string; icon: string; fields: any[] } } = {
  hero: {
    type: "hero",
    label: "Hero",
    icon: "image",
    fields: [
      { name: "googleMaps", type: "boolean", label: "¿Hero de Google Maps?", group: "content" },
      { name: "title", type: "text", label: "Título", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "badge", type: "text", label: "Badge", group: "content", stylable: true },
      { name: "badgeMobileFontSize", type: "text", label: "Tamaño móvil (px) para Badge", group: "styles", stylable: true },
      { name: "buttonText", type: "text", label: "Texto del botón", group: "content", stylable: true },
      { name: "buttonTextMobileFontSize", type: "text", label: "Tamaño móvil (px) para Botón", group: "styles", stylable: true },
      { name: "buttonLink", type: "text", label: "Enlace del botón", group: "content" },

      // ── Imágenes ─────────────────────────────────────────────────────
      { name: "image", type: "image", label: "Imagen principal (1 imagen)", group: "content" },
      { name: "images", type: "images", label: "Galería de imágenes (2–4 fotos)", group: "content" }, // ✅ NUEVO

      { name: "videoUrl", type: "text", label: "Video principal (URL)", group: "content" },

      // ── Google Maps ───────────────────────────────────────────────────
      { name: "generalMessage", type: "textarea", label: "Mensaje general", group: "content", showIf: { googleMaps: true } },

      // ── Estilos generales ─────────────────────────────────────────────
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },

      // ── Estilos del botón ─────────────────────────────────────────────
      { name: "buttonBackgroundColor", type: "color", label: "Color de fondo del botón", group: "styles" },       // ✅ NUEVO
      { name: "buttonTextColor", type: "color", label: "Color de texto del botón", group: "styles" },             // ✅ NUEVO
      { name: "buttonBorderColor", type: "color", label: "Color de borde del botón", group: "styles" },           // ✅ NUEVO
      { name: "buttonBorderWidth", type: "text", label: "Grosor de borde del botón (ej: 2px)", group: "styles" }, // ✅ NUEVO
      { name: "buttonBorderRadius", type: "text", label: "Border radius del botón (ej: 1rem)", group: "styles" }, // ✅ NUEVO
    ],
  },
  googleComments: {
    type: "googleComments",
    label: "Comentarios Google Maps",
    icon: "comment",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "comments", type: "textarea", label: "Comentarios seleccionados (JSON)", group: "content" },
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
    ],
  },
  banner: {
    type: "banner",
    label: "Banner",
    icon: "format_color_fill",
    fields: [
      { name: "title", type: "text", label: "Título", group: "content", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo 1", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo 1", group: "styles", stylable: true },
      { name: "subtitle2", type: "text", label: "Subtítulo 2 (opcional)", group: "content", stylable: true },
      { name: "subtitle2MobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo 2", group: "styles", stylable: true },
      { name: "subtitle3", type: "text", label: "Subtítulo 3 (opcional)", group: "content", stylable: true },
      { name: "subtitle3MobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo 3", group: "styles", stylable: true },
      { name: "backgroundImage", type: "image", label: "Imagen de fondo", group: "content" },
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
    ],
  },
  gallery: {
    type: "gallery",
    label: "Galería",
    icon: "collections",
    fields: [
      { name: "title", type: "text", label: "Título", group: "content" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
    ],
  },
  titleSubtitle: {
    type: "titleSubtitle",
    label: "Título y subtítulo",
    icon: "short_text",
    fields: [
      { name: "title", type: "text", label: "Título", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
    ],
  },
  aboutUs: {
    type: "aboutUs",
    label: "Quiénes somos",
    icon: "groups",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "organizationName", type: "text", label: "Nombre de la organización", group: "content", stylable: true },
      { name: "organizationNameMobileFontSize", type: "text", label: "Tamaño móvil (px) para Nombre", group: "styles", stylable: true },
      { name: "history", type: "textarea", label: "Historia o propósito", group: "content", stylable: true },
      { name: "historyMobileFontSize", type: "text", label: "Tamaño móvil (px) para Historia", group: "styles", stylable: true },
      { name: "experience", type: "textarea", label: "Experiencia en empresas familiares", group: "content", stylable: true },
      { name: "experienceMobileFontSize", type: "text", label: "Tamaño móvil (px) para Experiencia", group: "styles", stylable: true },
      { name: "philosophy", type: "textarea", label: "Filosofía de trabajo", group: "content", stylable: true },
      { name: "philosophyMobileFontSize", type: "text", label: "Tamaño móvil (px) para Filosofía", group: "styles", stylable: true },
      { name: "teamPhoto", type: "image", label: "Fotografía del equipo", group: "content" },
      { name: "advisorName", type: "text", label: "Nombre del asesor principal", group: "content", stylable: true },
      { name: "advisorNameMobileFontSize", type: "text", label: "Tamaño móvil (px) para Asesor", group: "styles", stylable: true },
      { name: "advisorBio", type: "textarea", label: "Biografía del asesor principal", group: "content", stylable: true },
      { name: "advisorBioMobileFontSize", type: "text", label: "Tamaño móvil (px) para Bio asesor", group: "styles", stylable: true },
      { name: "advisorPhoto", type: "image", label: "Foto del asesor principal", group: "content" },
      // Los colaboradores se gestionan dinámicamente en el panel
      { name: "collaboratorsMobileFontSize", type: "text", label: "Tamaño móvil (px) para Colaboradores", group: "styles", stylable: true },
      { name: "buttonText", type: "text", label: "Texto del botón", group: "content", stylable: true },
      { name: "buttonTextMobileFontSize", type: "text", label: "Tamaño móvil (px) para Botón", group: "styles", stylable: true },
      { name: "buttonLink", type: "text", label: "Enlace del botón", group: "content" },
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      
      // Estilos del botón
      { name: "buttonBackgroundColor", type: "color", label: "Color de fondo del botón", group: "styles" },
      { name: "buttonTextColor", type: "color", label: "Color de texto del botón", group: "styles" },
      { name: "buttonBorderColor", type: "color", label: "Color de borde del botón", group: "styles" },
      { name: "buttonBorderWidth", type: "text", label: "Grosor de borde del botón (ej: 2px)", group: "styles" },
      { name: "buttonBorderRadius", type: "text", label: "Border radius del botón (ej: 1rem)", group: "styles" },
    ],
  },
  challenges: {
    type: "challenges",
    label: "Desafíos de empresas familiares",
    icon: "warning",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      // Los desafíos se gestionan dinámicamente en el panel
      { name: "closingText", type: "textarea", label: "Texto de cierre", group: "content", stylable: true },
      { name: "closingTextMobileFontSize", type: "text", label: "Tamaño móvil (px) para Cierre", group: "styles", stylable: true },
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
    ],
  },
  featuredServices: {
    type: "featuredServices",
    label: "Nuestros servicios",
    icon: "business_center",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "maxServices", type: "number", label: "Máximo de servicios a mostrar (1-4)", group: "content" },
      { name: "showAllServicesText", type: "text", label: "Texto del botón para ver todos", group: "content", stylable: true },
      { name: "showAllServicesLink", type: "text", label: "Enlace para ver todos los servicios", group: "content" },
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      
      // Estilos del botón
      { name: "buttonBackgroundColor", type: "color", label: "Color de fondo del botón", group: "styles" },
      { name: "buttonTextColor", type: "color", label: "Color de texto del botón", group: "styles" },
      { name: "buttonBorderColor", type: "color", label: "Color de borde del botón", group: "styles" },
      { name: "buttonBorderWidth", type: "text", label: "Grosor de borde del botón (ej: 2px)", group: "styles" },
      { name: "buttonBorderRadius", type: "text", label: "Border radius del botón (ej: 1rem)", group: "styles" },
    ],
  },
  featuredConferences: {
    type: "featuredConferences",
    label: "Conferencias",
    icon: "event",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "maxConferences", type: "number", label: "Máximo de conferencias a mostrar (1-3)", group: "content" },
      { name: "showAllConferencesText", type: "text", label: "Texto del botón para ver todas", group: "content", stylable: true },
      { name: "showAllConferencesLink", type: "text", label: "Enlace para ver todas las conferencias", group: "content" },
      { name: "noConferencesMessage", type: "textarea", label: "Mensaje cuando no hay conferencias", group: "content", stylable: true },
      { name: "contactLink", type: "text", label: "Enlace para solicitar conferencia privada", group: "content" },
      { name: "contactText", type: "text", label: "Texto del enlace de contacto", group: "content", stylable: true },
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      
      // Estilos del botón
      { name: "buttonBackgroundColor", type: "color", label: "Color de fondo del botón", group: "styles" },
      { name: "buttonTextColor", type: "color", label: "Color de texto del botón", group: "styles" },
      { name: "buttonBorderColor", type: "color", label: "Color de borde del botón", group: "styles" },
      { name: "buttonBorderWidth", type: "text", label: "Grosor de borde del botón (ej: 2px)", group: "styles" },
      { name: "buttonBorderRadius", type: "text", label: "Border radius del botón (ej: 1rem)", group: "styles" },
    ],
  },
  featuredSpeakers: {
    type: "featuredSpeakers",
    label: "Nuestro equipo de especialistas",
    icon: "people",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "maxSpeakers", type: "number", label: "Máximo de especialistas a mostrar (1-4)", group: "content" },
      { name: "teamButtonText", type: "text", label: "Texto del botón para conocer al equipo", group: "content", stylable: true },
      { name: "teamButtonLink", type: "text", label: "Enlace para conocer al equipo", group: "content" },
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      
      // Estilos del botón
      { name: "buttonBackgroundColor", type: "color", label: "Color de fondo del botón", group: "styles" },
      { name: "buttonTextColor", type: "color", label: "Color de texto del botón", group: "styles" },
      { name: "buttonBorderColor", type: "color", label: "Color de borde del botón", group: "styles" },
      { name: "buttonBorderWidth", type: "text", label: "Grosor de borde del botón (ej: 2px)", group: "styles" },
      { name: "buttonBorderRadius", type: "text", label: "Border radius del botón (ej: 1rem)", group: "styles" },
    ],
  },
  methodology: {
    type: "methodology",
    label: "Nuestra metodología",
    icon: "route",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      // Las etapas se gestionan dinámicamente en el panel
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      { name: "accentColor", type: "color", label: "Color de acento (números y flechas)", group: "styles" },
    ],
  },
  testimonials: {
    type: "testimonials",
    label: "Testimonios y experiencias",
    icon: "format_quote",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "visibleTestimonials", type: "number", label: "Testimonios visibles (1-4)", group: "content" },
      // Los testimonios se gestionan dinámicamente en el panel
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      { name: "accentColor", type: "color", label: "Color de acento (comillas y flechas)", group: "styles" },
    ],
  },
  featuredBlogs: {
    type: "featuredBlogs",
    label: "Blog / Conocimiento empresarial",
    icon: "article",
    fields: [
      { name: "title", type: "text", label: "Título de sección", group: "content", stylable: true },
      { name: "titleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Título", group: "styles", stylable: true },
      { name: "subtitle", type: "text", label: "Subtítulo de sección", group: "content", stylable: true },
      { name: "subtitleMobileFontSize", type: "text", label: "Tamaño móvil (px) para Subtítulo", group: "styles", stylable: true },
      { name: "maxBlogs", type: "number", label: "Máximo de blogs a mostrar (1-4)", group: "content" },
      { name: "selectedBlogIds", type: "textarea", label: "IDs de blogs seleccionados (separados por coma)", group: "content" },
      { name: "showAllBlogsText", type: "text", label: "Texto del botón para ver todos", group: "content", stylable: true },
      { name: "showAllBlogsLink", type: "text", label: "Enlace para ver todos los blogs", group: "content" },
      
      // Estilos generales
      { name: "backgroundColor", type: "color", label: "Color de fondo", group: "styles" },
      { name: "textColor", type: "color", label: "Color de texto", group: "styles" },
      { name: "paddingTop", type: "text", label: "Padding superior", group: "styles" },
      { name: "paddingBottom", type: "text", label: "Padding inferior", group: "styles" },
      { name: "textAlign", type: "text", label: "Alineación texto (left/center/right)", group: "styles" },
      { name: "borderRadius", type: "text", label: "Border radius contenedor", group: "styles" },
      
      // Estilos del botón
      { name: "buttonBackgroundColor", type: "color", label: "Color de fondo del botón", group: "styles" },
      { name: "buttonTextColor", type: "color", label: "Color de texto del botón", group: "styles" },
      { name: "buttonBorderColor", type: "color", label: "Color de borde del botón", group: "styles" },
      { name: "buttonBorderWidth", type: "text", label: "Grosor de borde del botón (ej: 2px)", group: "styles" },
      { name: "buttonBorderRadius", type: "text", label: "Border radius del botón (ej: 1rem)", group: "styles" },
    ],
  },
};
