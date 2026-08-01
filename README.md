# Layout Base y Dashboard (Demo)

Andamiaje de layout y pantalla de Inicio del sistema, con datos de ejemplo.
Implementa el menú lateral, la barra superior, la ruta de navegación, el
panel de notificaciones, el menú de usuario, el tema claro/oscuro y las
tarjetas de indicadores del Dashboard.

> **Solo frontend.** Esta entrega no tiene backend: los indicadores y las
> notificaciones son datos de ejemplo servidos por una API simulada en el
> propio cliente (latencia falsa + modos de respuesta con valor, vacío o
> falla). No hay inicio de sesión ni persistencia real más allá del tema
> (`localStorage`).

## Stack

- **React 19** + **TypeScript** (modo `strict`)
- **Vite 7**
- **Tailwind CSS 4** (config CSS-first con `@theme`) + **shadcn/ui**
- **React Router 7**
- **TanStack Query 5** (datos del servidor simulado)
- **Zustand** (estado de cliente: UI del layout, tema)
- **Vitest** + **Testing Library** (pruebas)

## Requisitos

- **Node.js 20.19+ o 22.12+** (recomendado usar la versión LTS activa más
  reciente; Vite 7 exige alguno de estos mínimos)
- **npm** (viene con Node.js)

## Instalación

```bash
npm install
```

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo con recarga en caliente |
| `npm run build` | Verifica tipos (`tsc -b`) y genera el build de producción en `dist/` |
| `npm run lint` | Corre ESLint sobre el proyecto |
| `npm run test` | Corre las pruebas con Vitest |
| `npm run preview` | Sirve el build de producción localmente para previsualizar |

## Estructura del proyecto

```
src/
├── app/            # navegación (fuente única), rutas, proveedores
├── components/
│   ├── layout/     # shell reutilizable: Sidebar, Topbar, Breadcrumb, etc.
│   ├── shared/      # componentes compartidos (p. ej. aviso "en construcción")
│   └── ui/          # componentes base de shadcn/ui
├── features/
│   ├── dashboard/   # indicadores: tipos, datos de ejemplo, API simulada, hooks, componentes
│   └── notificaciones/  # avisos de ejemplo del panel de notificaciones
├── hooks/           # hooks de aplicación (p. ej. aplicar tema)
├── stores/          # estado de cliente con Zustand (UI, tema)
├── pages/           # pantallas enrutadas
├── lib/             # utilidades y textos centralizados
└── test/            # helpers y setup de pruebas
```

## Notas de diseño

- Los tokens visuales (color, espaciado, tipografía) salen del `DESIGN.md`
  oficial del proyecto y viven en `src/index.css` como variables `@theme` de
  Tailwind 4 — no hay valores hex sueltos en los componentes.
- El tema por defecto es claro; el usuario puede alternar a oscuro y la
  preferencia persiste entre visitas.
- No hay rutas protegidas en esta entrega (la integración con inicio de
  sesión queda para una spec posterior).
