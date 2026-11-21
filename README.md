# Juan Carlos Vargas - Asesoría de Empresas Familiares

Sitio web de servicios de consultoría para empresas familiares.

## Descripción

Plataforma web para mostrar y gestionar servicios de asesoría empresarial enfocados en:
- Consultoría estratégica
- Sucesión familiar
- Gobernabilidad corporativa
- Gestión financiera
- Desarrollo de liderazgo
- Resolución de conflictos

## Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Firebase** - Base de datos y autenticación
- **Material Icons** - Iconos

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuración

1. Copia `.env.example` a `.env.local` y configura las variables de Firebase
2. Configura las reglas de Firestore en `firestore.rules`
3. Actualiza las categorías desde el panel de administración

## Categorías

Ver `CATEGORIAS_RECOMENDADAS.md` para las categorías sugeridas para servicios de asesoría de empresas familiares.

## Estructura del Proyecto

- `app/` - Páginas y componentes de Next.js App Router
- `app/admin/` - Panel de administración
- `app/lib/` - Utilidades y conexión a Firebase
- `app/components/` - Componentes reutilizables
- `public/` - Archivos estáticos

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=nextjs&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [the Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploy) for more details.
