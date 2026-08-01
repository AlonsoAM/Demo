---
tasks_version: 1
plan_ref: layout-base-y-dashboard-plan.md
spec_ref: layout-base-y-dashboard-spec.md
created: 2026-07-31
status: completed
total_tasks: 59
completed_tasks: 59
last_session: "2026-08-01 17:26"
last_completed_task: T9.5
next_pending_task: ""
sessions_count: 6
paused_reason: ""
clickup_sync_cadence: progressive
run_id: "20260731-123738-13d12a"
branch: feat/layout-base-y-dashboard
---

# Tareas — Layout Base y Dashboard

## Resumen

| Dato | Valor |
|------|-------|
| Tareas atómicas | **54** |
| Bloques | **8** |
| Prioridades | 🔴 Bloqueante 35 · 🟡 Normal 18 · 🟢 Diferible 1 |
| Historias cubiertas | H1, H2, H3, H4 (`P1`) · H5, H6, H7 (`P2`) · 🧰 Base técnica |
| Estimación | Con IA 8h - 12h · Sin IA 39h - 54h |
| Stack | react-frontend — React 19 + TS + Vite 7 + Tailwind 4 + shadcn/ui |

Orden de bloques: andamiaje → contratos → datos → estado → shell → pantalla Inicio → rutas →
pruebas. Las historias `P1` quedan funcionales al cerrar el bloque 7; el bloque 8 cierra la
entrega con las pruebas de las 7 historias (A7).

## Tareas

### 🧱 Bloque 1 — Andamiaje del proyecto

- [x] **T1.1**: Crear el proyecto Vite + React 19 + TypeScript e instalar las dependencias del perfil (react-router 7, @tanstack/react-query 5, zustand, tailwindcss 4 + @tailwindcss/vite, lucide-react, vitest, @testing-library/react, jsdom) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `package.json`
  - Depende de: ninguno
  - Cubre: —
  - Rollback: `rm -rf node_modules package.json package-lock.json src index.html`
  - Nota: verificar las últimas versiones estables con context7 antes de fijarlas (perfil §0). No usar `tailwind.config.js` (Tailwind 4 es CSS-first, A-5).

- [x] **T1.2 [P]**: Configurar TypeScript en modo `strict` con el alias de rutas `@/*` `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `tsconfig.app.json`
  - Depende de: T1.1
  - Cubre: —
  - Rollback: `git checkout tsconfig.app.json`

- [x] **T1.3 [P]**: Configurar Vite con el plugin de React, el plugin de Tailwind 4, el alias `@/` y el entorno de Vitest (jsdom + setup) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `vite.config.ts`
  - Depende de: T1.1
  - Cubre: —
  - Rollback: `git checkout vite.config.ts`

- [x] **T1.4 [P]**: Escribir los tokens del DESIGN.md oficial como `:root` (claro) y `.dark` (oscuro) con `@theme` de Tailwind 4, más el `outline` de foco y la carga de Nunito `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/index.css`
  - Depende de: T1.1
  - Cubre: H6-E6, H6-E8, H7-E20
  - Rollback: `git checkout src/index.css`
  - Nota: pegar el mapeo shadcn del DESIGN.md tal cual (A-5). Ni un hex fuera de los tokens (A11).

- [x] **T1.5 [P]**: Inicializar shadcn/ui apuntando a los tokens de `src/index.css` y al alias `@/` `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `components.json`
  - Depende de: T1.2, T1.3, T1.4
  - Cubre: —
  - Rollback: `rm components.json src/lib/utils.ts`

- [x] **T1.6 [P]**: Configurar ESLint con `@typescript-eslint` y `eslint-plugin-react-hooks` `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `eslint.config.js`
  - Depende de: T1.1
  - Cubre: —
  - Rollback: `git checkout eslint.config.js`

- [x] **T1.7 [P]**: Crear el setup de pruebas (jest-dom, limpieza entre tests, mock de `matchMedia` para las pruebas responsive) `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/test/setup.ts`
  - Depende de: T1.1, T1.3
  - Cubre: —
  - Rollback: `rm src/test/setup.ts`

- [x] **T1.8 [P]**: Ajustar el documento raíz con `lang="es"`, el título del sistema y el `<div id="root">` `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `index.html`
  - Depende de: T1.1
  - Cubre: —
  - Rollback: `git checkout index.html`

### 📐 Bloque 2 — Contratos y datos de ejemplo

- [x] **T2.1 [P]**: Definir los tipos de navegación (`SeccionMenu`, `ItemNavegacion`, `NivelRuta`) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/types/navegacion.types.ts`
  - Depende de: T1.2
  - Cubre: —
  - Rollback: `rm src/types/navegacion.types.ts`

- [x] **T2.2 [P]**: Declarar la fuente única de navegación: las 6 secciones en orden, las subsecciones de Comercial y Packing, sus iconos y sus rutas `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/app/navegacion.ts`
  - Depende de: T2.1
  - Cubre: H1-E2, H1-E3, H1-E4
  - Rollback: `rm src/app/navegacion.ts`
  - Nota: A-1 — sidebar, breadcrumb, título y router derivan de aquí. Nombres y orden exactos de AF-1.

- [x] **T2.3 [P]**: Definir los tipos del indicador (`Indicador`, `Tendencia`, `RespuestaIndicador`) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/types/indicador.types.ts`
  - Depende de: T1.2
  - Cubre: —
  - Rollback: `rm src/features/dashboard/types/indicador.types.ts`

- [x] **T2.4 [P]**: Declarar los cuatro indicadores de ejemplo con sus valores, textos de variación y tendencia `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/data/indicadores.mock.ts`
  - Depende de: T2.3
  - Cubre: H3-E2, H3-E3, H3-E5, H3-E6, H3-E7, H3-E8, H3-E10, H3-E11
  - Rollback: `rm src/features/dashboard/data/indicadores.mock.ts`
  - Nota: valores y textos literales de AF-2 y AF-3 — 128 / 45,320 / 37 / 9 y "+12% vs. mes anterior", "+8% vs. mes anterior", "Sin cambio vs. mes anterior", "-3% vs. mes anterior".

- [x] **T2.5 [P]**: Declarar los tres avisos de ejemplo del panel de notificaciones `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/notificaciones/data/notificaciones.mock.ts`
  - Depende de: T1.2
  - Cubre: H5-E8, H5-E9, H5-E10
  - Rollback: `rm src/features/notificaciones/data/notificaciones.mock.ts`
  - Nota: textos literales de AF-11.

- [x] **T2.6 [P]**: Centralizar los textos literales de estado y placeholder en español `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/lib/textos.ts`
  - Depende de: T1.2
  - Cubre: H1-E11, H4-E4, H4-E7, H5-E3, H5-E5
  - Rollback: `rm src/lib/textos.ts`
  - Nota: A-10 — son criterio de aceptación (AF-5, AF-6, AF-8, AF-9, AF-10). El componente y su prueba leen el mismo literal.

### 🌐 Bloque 3 — Datos (API simulada)

- [x] **T3.1**: Implementar el acceso a datos de indicadores con latencia simulada y modo de respuesta inyectable (con valor / vacío / falla) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/api/indicadores.api.ts`
  - Depende de: T2.3, T2.4
  - Cubre: H4-E4, H4-E7
  - Rollback: `rm src/features/dashboard/api/indicadores.api.ts`
  - Nota: A-2 — punto único de enganche del backend futuro. Sin red real (RN-36).

- [x] **T3.2**: Implementar el hook de datos por indicador con TanStack Query (`queryKey` propia, `retry: false`, `refetch` expuesto) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/hooks/useIndicador.ts`
  - Depende de: T3.1
  - Cubre: H4-E3, H4-E9, H4-E10, H4-E11
  - Rollback: `rm src/features/dashboard/hooks/useIndicador.ts`
  - Nota: una entrada de cache por indicador ⇒ el aislamiento de H4-E11 es estructural. El reintento es del usuario, no automático.

### 🗃️ Bloque 4 — Estado de cliente

- [x] **T4.1 [P]**: Crear el store de UI sin persistencia (sidebar colapsado, menú móvil, panel abierto como enum) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/stores/useUiStore.ts`
  - Depende de: T1.2
  - Cubre: H2-E1, H2-E2, H2-E5, H2-E6, H5-E13
  - Rollback: `rm src/stores/useUiStore.ts`
  - Nota: A-3 y A-4 — sin `persist` (H2-E6 exige que el sidebar vuelva expandido); `panelAbierto` como enum hace inexpresable "dos paneles abiertos".

- [x] **T4.2 [P]**: Crear el store de tema persistido en `localStorage` con valor inicial claro `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/stores/useTemaStore.ts`
  - Depende de: T1.2
  - Cubre: H6-E1, H6-E2, H6-E3, H6-E4, H6-E7
  - Rollback: `rm src/stores/useTemaStore.ts`
  - Nota: A-9 — default claro fijo, **no** `prefers-color-scheme` (H6-E1, AF-19). Desviación del DESIGN.md registrada en el plan §2.1.

- [x] **T4.3**: Implementar el efecto que aplica la clase `dark` al elemento raíz según el store de tema `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/hooks/useAplicarTema.ts`
  - Depende de: T4.2
  - Cubre: H6-E5, H6-E6
  - Rollback: `rm src/hooks/useAplicarTema.ts`

### 🧩 Bloque 5 — Shell reutilizable del sistema

- [x] **T5.1 [P]**: Agregar los componentes base de shadcn/ui vía CLI (button, card, skeleton, tooltip, dropdown-menu, sheet, badge, separator) `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/ui/`
  - Depende de: T1.5
  - Cubre: —
  - Rollback: `rm -rf src/components/ui`
  - ⚠️ Precondición (hallazgo de T1.5, verificado 2026-07-31): la CLI de shadcn resuelve `@/` **solo** desde `compilerOptions.paths` del `tsconfig.json` **raíz**, y no sigue las `references` hacia `tsconfig.app.json` (donde vive el alias por T1.2). Sin arreglarlo, `shadcn add` escribe en una carpeta literal `./@/...`. Fix: agregar `"compilerOptions": { "paths": { "@/*": ["./src/*"] } }` al `tsconfig.json` raíz — inocuo para la compilación porque ese archivo tiene `"files": []` y solo `references`. Hacerlo **dentro de esta tarea**, antes del primer `shadcn add`.

- [x] **T5.2 [P]**: Ajustar el botón a los contratos del DESIGN.md: sombra 3D inferior, hundido al presionar y anillo de foco por token `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/ui/button.tsx`
  - Depende de: T5.1
  - Cubre: H7-E20
  - Rollback: `git checkout src/components/ui/button.tsx`
  - Nota: sombra `0 4px 0 #58A700` en claro / `0 4px 0 #3D8B00` en oscuro, vía token. Guard `prefers-reduced-motion`.

- [x] **T5.3 [P]**: Crear el aviso honesto de sección sin pantalla, que nombra la sección elegida `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/shared/EnConstruccion.tsx`
  - Depende de: T2.6, T5.1
  - Cubre: H1-E10, H1-E11
  - Rollback: `rm src/components/shared/EnConstruccion.tsx`

- [x] **T5.4 [P]**: Crear el ítem de sección del menú: icono + nombre, marca activa con barra izquierda y `aria-current`, tooltip cuando el menú está colapsado `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/SidebarSeccion.tsx`
  - Depende de: T2.2, T5.1
  - Cubre: H1-E5, H2-E3, H2-E4, H7-E15, H7-E19
  - Rollback: `rm src/components/layout/SidebarSeccion.tsx`
  - Nota: la marca activa no puede depender solo del color (RN-34). Es un `NavLink`, así que Enter lo activa sin código extra.

- [x] **T5.5 [P]**: Crear el menú lateral: lista las secciones desde la fuente única, colapsa/expande y despliega los grupos Comercial y Packing `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/Sidebar.tsx`
  - Depende de: T4.1, T5.4
  - Cubre: H1-E2, H1-E3, H1-E4, H2-E1, H2-E2, H7-E3, H7-E9, H7-E10
  - Rollback: `rm src/components/layout/Sidebar.tsx`
  - Nota: el control de colapso es el primer elemento focosable del DOM (A-8 / AF-15). Oculto bajo el breakpoint de escritorio.

- [x] **T5.6 [P]**: Crear el menú lateral de teléfono como panel deslizable sobre el contenido, que cierra al elegir sección, al tocar fuera y con Escape `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/SidebarMovil.tsx`
  - Depende de: T5.1, T5.5
  - Cubre: H7-E4, H7-E5, H7-E6, H7-E18
  - Rollback: `rm src/components/layout/SidebarMovil.tsx`
  - Nota: `Sheet` de shadcn (Radix) ya trae cierre por Escape y por clic fuera; el cierre al navegar es propio.

- [x] **T5.7 [P]**: Crear la ruta de navegación derivada de la fuente única: solo el primer nivel navega, el intermedio es inerte `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/Breadcrumb.tsx`
  - Depende de: T2.2
  - Cubre: H1-E7, H1-E8, H1-E9, H2-E7, H2-E8, H2-E9
  - Rollback: `rm src/components/layout/Breadcrumb.tsx`

- [x] **T5.8 [P]**: Crear el interruptor de tema claro/oscuro de la barra superior `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/BotonTema.tsx`
  - Depende de: T4.2, T5.2
  - Cubre: H6-E2, H6-E3
  - Rollback: `rm src/components/layout/BotonTema.tsx`

- [x] **T5.9 [P]**: Crear la campana con el panel de notificaciones: tres avisos de ejemplo, sin marcar leídos, cierre por clic fuera y Escape `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/PanelNotificaciones.tsx`
  - Depende de: T2.5, T4.1, T5.1
  - Cubre: H5-E6, H5-E7, H5-E8, H5-E9, H5-E10, H5-E11, H5-E12, H7-E16
  - Rollback: `rm src/components/layout/PanelNotificaciones.tsx`
  - Nota: sin contador de no leídos (AF-13). El estado de apertura vive en el store de UI (A-4).

- [x] **T5.10 [P]**: Crear el menú de usuario: nombre y avatar de ejemplo, con "Mi perfil" y "Cerrar sesión" que muestran aviso honesto sin sacar al usuario del sistema `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/MenuUsuario.tsx`
  - Depende de: T2.6, T4.1, T5.1
  - Cubre: H5-E1, H5-E2, H5-E3, H5-E4, H5-E5, H7-E17
  - Rollback: `rm src/components/layout/MenuUsuario.tsx`

- [x] **T5.11 [P]**: Crear la barra superior: título de la pantalla actual y los tres controles en el orden de foco definido `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/Topbar.tsx`
  - Depende de: T2.2, T5.8, T5.9, T5.10
  - Cubre: H1-E6, H1-E13, H5-E13, H5-E14, H7-E11, H7-E12, H7-E13
  - Rollback: `rm src/components/layout/Topbar.tsx`
  - Nota: orden del DOM = tema → campana → avatar (A-8 / AF-15). El título sale de la fuente única, no de un literal por página.

- [x] **T5.12 [P]**: Crear la región de anuncio que informa el título de la pantalla al lector de pantalla en cada cambio de ruta `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/AnuncioPantalla.tsx`
  - Depende de: T2.2
  - Cubre: H7-E21
  - Rollback: `rm src/components/layout/AnuncioPantalla.tsx`

- [x] **T5.13**: Ensamblar la estructura común: menú lateral (fijo o deslizable según el ancho), barra superior, ruta de navegación y área de contenido, sin desplazamiento horizontal entre 360 y 1440 px `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/AppLayout.tsx`
  - Depende de: T5.5, T5.6, T5.7, T5.11, T5.12
  - Cubre: H1-E12, H7-E1, H7-E2, H7-E14
  - Rollback: `rm src/components/layout/AppLayout.tsx`
  - Nota: cuidado con `overflow-x` — fijar solo `overflow-y: auto` deja `overflow-x: auto` y un tooltip que sobresale genera scroll fantasma (defecto real encontrado en el mockup).
  - ⚠️ Decisión pendiente (hallazgo de T1.4): el mockup aprobado pinta el fondo de página con `surface-1` (gris) y las tarjetas con `canvas` (blanco); el mapeo shadcn oficial del DESIGN.md hace lo inverso (`--background` = canvas blanco, `--card` = surface-1 gris). Los tokens quedaron pegados tal cual del DESIGN.md (A-5/A11, no se reinterpretan). Para igualar el mockup, el contenedor raíz usa `bg-muted` en vez de `bg-background` — resolverlo acá, no cambiando los tokens.

### 🧩 Bloque 6 — Pantalla Inicio

- [x] **T6.1 [P]**: Crear la señal de tendencia: flecha hacia arriba, flecha hacia abajo o raya horizontal, con forma además de color `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/components/SenalTendencia.tsx`
  - Depende de: T2.3
  - Cubre: H3-E4, H3-E9, H3-E12
  - Rollback: `rm src/features/dashboard/components/SenalTendencia.tsx`
  - Nota: AF-4 — la tendencia no puede reconocerse solo por color.

- [x] **T6.2**: Crear la tarjeta de indicador con sus cuatro estados (carga, valor, sin información, problema con reintento) y anuncio a lectores de pantalla `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/components/TarjetaIndicador.tsx`
  - Depende de: T2.6, T3.2, T5.1, T6.1
  - Cubre: H3-E2, H3-E3, H4-E1, H4-E2, H4-E3, H4-E4, H4-E5, H4-E6, H4-E7, H4-E8, H4-E9, H4-E10, H4-E12, H4-E13
  - Rollback: `rm src/features/dashboard/components/TarjetaIndicador.tsx`
  - Nota: es el contrato de estados que reutilizará todo el sistema (AF-7, RN-35). `aria-live="polite"` en la región del valor, no global (A-7). El nombre del indicador se mantiene visible en carga.

- [x] **T6.3**: Crear la grilla de indicadores: una columna en teléfono, una sola fila en escritorio `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/components/GrillaIndicadores.tsx`
  - Depende de: T2.4, T6.2
  - Cubre: H3-E1, H4-E11, H7-E7, H7-E8
  - Rollback: `rm src/features/dashboard/components/GrillaIndicadores.tsx`

- [x] **T6.4**: Crear la pantalla Inicio con las cuatro tarjetas, sin gráficos ni tabla de actividad `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/pages/InicioPage.tsx`
  - Depende de: T6.3
  - Cubre: H1-E1, H1-E14, H3-E13, H3-E14
  - Rollback: `rm src/pages/InicioPage.tsx`
  - Nota: gráficos y tabla se descartaron explícitamente en la entrevista — no agregarlos "de más".

- [x] **T6.5 [P]**: Crear la pantalla genérica de sección sin destino, que resuelve la sección desde la ruta actual `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/pages/SeccionEnConstruccionPage.tsx`
  - Depende de: T2.2, T5.3
  - Cubre: H1-E10, H1-E13
  - Rollback: `rm src/pages/SeccionEnConstruccionPage.tsx`

### 📄 Bloque 7 — Rutas y ensamblado

- [x] **T7.1 [P]**: Crear los proveedores de la aplicación: cliente de consultas (sin reintento automático) y aplicación del tema `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/app/providers.tsx`
  - Depende de: T4.3
  - Cubre: H6-E7
  - Rollback: `rm src/app/providers.tsx`

- [x] **T7.2 [P]**: Definir las rutas de las ocho pantallas sobre la estructura común, sin exigir inicio de sesión `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/app/router.tsx`
  - Depende de: T5.13, T6.4, T6.5
  - Cubre: H1-E1, H1-E5, H1-E14, H1-E15
  - Rollback: `rm src/app/router.tsx`
  - Nota: AF-24 — ninguna ruta protegida en esta entrega; la integración con Login Demo es posterior.

- [x] **T7.3**: Componer la aplicación uniendo proveedores y rutas `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/App.tsx`
  - Depende de: T7.1, T7.2
  - Cubre: —
  - Rollback: `rm src/App.tsx`

- [x] **T7.4**: Crear el punto de entrada que monta la aplicación e importa los tokens `🔴 Bloqueante`
  - Skill: `Frontend Developer`
  - Archivo: `src/main.tsx`
  - Depende de: T1.4, T7.3
  - Cubre: H1-E15
  - Rollback: `rm src/main.tsx`

- [x] **T7.5**: Documentar el arranque del proyecto (requisitos, comandos de desarrollo, build, lint y pruebas) `🟢 Diferible`
  - Skill: `Frontend Developer`
  - Archivo: `README.md`
  - Depende de: T7.4
  - Cubre: —
  - Rollback: `rm README.md`

### 🧪 Bloque 8 — Pruebas

- [x] **T8.1**: Crear el helper de pruebas que renderiza con proveedores y enrutador de memoria `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/test/utils.tsx`
  - Depende de: T1.7, T7.1
  - Cubre: —
  - Rollback: `rm src/test/utils.tsx`

- [x] **T8.2 [P]**: Probar el menú lateral: secciones y orden, despliegue de grupos, marca activa, colapsar/expandir y que vuelva expandido al recargar `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/components/layout/__tests__/Sidebar.test.tsx`
  - Depende de: T5.5, T8.1
  - Cubre: H1-E2, H1-E3, H1-E4, H1-E5, H2-E1, H2-E2, H2-E3, H2-E4, H2-E5, H2-E6, H7-E19
  - Rollback: `rm src/components/layout/__tests__/Sidebar.test.tsx`

- [x] **T8.3 [P]**: Probar la ruta de navegación en sus tres profundidades y el comportamiento de cada nivel `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/components/layout/__tests__/Breadcrumb.test.tsx`
  - Depende de: T5.7, T8.1
  - Cubre: H1-E7, H1-E8, H1-E9, H2-E7, H2-E8, H2-E9
  - Rollback: `rm src/components/layout/__tests__/Breadcrumb.test.tsx`

- [x] **T8.4 [P]**: Probar la barra superior: título por sección, exclusión mutua de paneles y presencia en cualquier sección `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/components/layout/__tests__/Topbar.test.tsx`
  - Depende de: T5.11, T8.1
  - Cubre: H1-E6, H1-E13, H5-E13, H5-E14
  - Rollback: `rm src/components/layout/__tests__/Topbar.test.tsx`

- [x] **T8.5 [P]**: Probar el menú de usuario: nombre de ejemplo, las dos opciones, sus avisos honestos y que no saque al usuario del sistema `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/components/layout/__tests__/MenuUsuario.test.tsx`
  - Depende de: T5.10, T8.1
  - Cubre: H5-E1, H5-E2, H5-E3, H5-E4, H5-E5, H7-E17
  - Rollback: `rm src/components/layout/__tests__/MenuUsuario.test.tsx`

- [x] **T8.6 [P]**: Probar el panel de notificaciones: apertura, los tres textos exactos, que elegir un aviso no lo quite, y el cierre por clic fuera y por Escape `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/components/layout/__tests__/PanelNotificaciones.test.tsx`
  - Depende de: T5.9, T8.1
  - Cubre: H5-E6, H5-E7, H5-E8, H5-E9, H5-E10, H5-E11, H5-E12, H7-E16
  - Rollback: `rm src/components/layout/__tests__/PanelNotificaciones.test.tsx`

- [x] **T8.7 [P]**: Probar la tarjeta de indicador en sus cuatro estados, el reintento, el aislamiento entre tarjetas y el anuncio a lectores de pantalla `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/features/dashboard/__tests__/TarjetaIndicador.test.tsx`
  - Depende de: T6.2, T8.1
  - Cubre: H3-E2, H3-E3, H3-E4, H3-E5, H3-E6, H3-E7, H3-E8, H3-E9, H3-E10, H3-E11, H3-E12, H4-E1, H4-E2, H4-E3, H4-E4, H4-E5, H4-E6, H4-E7, H4-E8, H4-E9, H4-E10, H4-E11, H4-E12, H4-E13
  - Rollback: `rm src/features/dashboard/__tests__/TarjetaIndicador.test.tsx`
  - Nota: forzar vacío y falla por el modo de respuesta del acceso a datos, no mockeando la librería — el test recorre el mismo camino que la UI real.

- [x] **T8.8 [P]**: Probar la pantalla Inicio: las cuatro tarjetas, la ausencia de gráficos y de tabla, y que abre sin inicio de sesión `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/features/dashboard/__tests__/InicioPage.test.tsx`
  - Depende de: T6.4, T8.1
  - Cubre: H1-E1, H1-E14, H1-E15, H3-E1, H3-E13, H3-E14
  - Rollback: `rm src/features/dashboard/__tests__/InicioPage.test.tsx`

- [x] **T8.9 [P]**: Probar el tema: valor inicial claro, alternancia en ambos sentidos, persistencia entre visitas y alcance al menú lateral y a las tarjetas `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/__tests__/tema.test.tsx`
  - Depende de: T4.3, T5.8, T8.1
  - Cubre: H6-E1, H6-E2, H6-E3, H6-E4, H6-E5, H6-E6, H6-E7, H6-E8
  - Rollback: `rm src/__tests__/tema.test.tsx`
  - Nota: H6-E8 (contraste ≥ 4.5:1) se prueba aquí sobre los tokens aplicados y se confirma en Verify con `design/verify-contrast.mjs`.

- [x] **T8.10 [P]**: Probar el recorrido por teclado: orden de tabulación completo, activación con Enter, marca activa sin color y foco visible `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/__tests__/navegacion-teclado.test.tsx`
  - Depende de: T5.13, T8.1
  - Cubre: H7-E9, H7-E10, H7-E11, H7-E12, H7-E13, H7-E14, H7-E15, H7-E19, H7-E20, H7-E21
  - Rollback: `rm src/__tests__/navegacion-teclado.test.tsx`
  - Nota: el orden se valida sobre el orden de elementos focosables del DOM (sin `tabindex` positivos, A-8).

- [x] **T8.11 [P]**: Probar el comportamiento responsive: sin desplazamiento horizontal en ambos anchos, menú deslizable en teléfono y disposición de las tarjetas `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/__tests__/responsive.test.tsx`
  - Depende de: T5.13, T6.3, T8.1
  - Cubre: H7-E1, H7-E2, H7-E3, H7-E4, H7-E5, H7-E6, H7-E7, H7-E8, H7-E18
  - Rollback: `rm src/__tests__/responsive.test.tsx`
  - Nota: usa el mock de `matchMedia` del setup; el cero-scroll a 360 px se confirma además en el smoke de navegador.

- [x] **T8.12 [P]**: Probar la pantalla de sección sin destino: título, texto que nombra la sección, y que el menú y la barra superior siguen visibles `🟡 Normal`
  - Skill: `API Tester`
  - Archivo: `src/pages/__tests__/SeccionEnConstruccionPage.test.tsx`
  - Depende de: T6.5, T8.1
  - Cubre: H1-E10, H1-E11, H1-E12, H1-E13
  - Rollback: `rm src/pages/__tests__/SeccionEnConstruccionPage.test.tsx`

### 🔍 Bloque 9 — Peer Review

- [x] **T9.1**: Agregar `version: 1` al middleware `persist` de `useTemaStore` para evitar hidratación incompatible ante un futuro cambio de forma del estado `🟢 Diferible`
  - Skill: `Frontend Developer`
  - Archivo: `src/stores/useTemaStore.ts`
  - Depende de: ninguno
  - Cubre: A-3, RN-29
  - Rollback: `git checkout src/stores/useTemaStore.ts`
  - Nota: Peer Review PRT-2 — aceptado.

- [x] **T9.2**: Filtrar el `onClick` de cierre de `SidebarMovil` para que solo dispare al hacer clic en un enlace (`<a>`), no en cualquier punto del `<nav>` `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `src/components/layout/SidebarMovil.tsx`
  - Depende de: ninguno
  - Cubre: RN-32, H7-E5
  - Rollback: `git checkout src/components/layout/SidebarMovil.tsx`
  - Nota: Peer Review PRT-4/PRT-12 (mismo hallazgo, dos ángulos) — aceptado.

- [x] **T9.3**: Incluir `modo` y `latenciaMs` en la `queryKey` de `useIndicador` para que cada combinación tenga su propia entrada de cache `🟡 Normal`
  - Skill: `Frontend Developer`
  - Archivo: `src/features/dashboard/hooks/useIndicador.ts`
  - Depende de: ninguno
  - Cubre: A-2, AF-7
  - Rollback: `git checkout src/features/dashboard/hooks/useIndicador.ts`
  - Nota: Peer Review PRT-6/PRT-16 (mismo hallazgo, dos ángulos) — aceptado.

- [x] **T9.4**: Documentar en `useUiStore.ts` (o README) que `sidebarColapsado` y `menuMovilAbierto` no persisten entre sesiones, por decisión explícita `🟢 Diferible`
  - Skill: `Frontend Developer`
  - Archivo: `src/stores/useUiStore.ts`
  - Depende de: ninguno
  - Cubre: A10
  - Rollback: `git checkout src/stores/useUiStore.ts`
  - Nota: Peer Review PRT-13 — aceptado.

- [x] **T9.5**: Autoalojar la fuente tipográfica (Nunito) en vez de cargarla desde Google Fonts, para no depender de un CDN externo en el entorno corporativo `🟢 Diferible`
  - Skill: `Frontend Developer`
  - Archivo: `src/index.css`
  - Depende de: ninguno
  - Cubre: A13
  - Rollback: `git checkout src/index.css`
  - Nota: Peer Review PRT-15 — aceptado.

## Waves de ejecución

> Salida verbatim de `scripts/wave-plan.mjs --all` (`max_parallel: 3`, exit 0 — sin
> dependencias huérfanas ni ciclos). Es el mismo cálculo que hará el Build, así que lo que
> promete el plan es lo que se ejecuta. Las waves nunca cruzan bloques.
>
> Cuando una wave tiene más candidatas que `max_parallel`, el script la parte en varios lotes
> con el mismo número de wave (dos lotes "Wave 1" = misma etapa del grafo, ancho capado a 3).
> Por eso `T2.6` aparece sola en un lote pese a estar marcada `[P]`: no colisiona con nadie,
> simplemente sobra respecto del cap.

```text
🌊 Waves de ejecución
   🧱 Bloque 1 — Andamiaje del proyecto
      Wave 0 · 1 secuencial   → T1.1
      Wave 1 · 3 en paralelo  → T1.2, T1.3, T1.4
      Wave 1 · 2 en paralelo  → T1.6, T1.8
      Wave 2 · 2 en paralelo  → T1.5, T1.7
   📐 Bloque 2 — Contratos y datos de ejemplo
      Wave 0 · 3 en paralelo  → T2.1, T2.3, T2.5
      Wave 0 · 1 secuencial   → T2.6
      Wave 1 · 2 en paralelo  → T2.2, T2.4
   🌐 Bloque 3 — Datos (API simulada)
      Wave 0 · 1 secuencial   → T3.1
      Wave 1 · 1 secuencial   → T3.2
   🗃️ Bloque 4 — Estado de cliente
      Wave 0 · 2 en paralelo  → T4.1, T4.2
      Wave 1 · 1 secuencial   → T4.3
   🧩 Bloque 5 — Shell reutilizable del sistema
      Wave 0 · 3 en paralelo  → T5.1, T5.7, T5.12
      Wave 1 · 3 en paralelo  → T5.2, T5.3, T5.4
      Wave 1 · 2 en paralelo  → T5.9, T5.10
      Wave 2 · 2 en paralelo  → T5.5, T5.8
      Wave 3 · 2 en paralelo  → T5.6, T5.11
      Wave 4 · 1 secuencial   → T5.13
   🧩 Bloque 6 — Pantalla Inicio
      Wave 0 · 2 en paralelo  → T6.1, T6.5
      Wave 1 · 1 secuencial   → T6.2
      Wave 2 · 1 secuencial   → T6.3
      Wave 3 · 1 secuencial   → T6.4
   📄 Bloque 7 — Rutas y ensamblado
      Wave 0 · 2 en paralelo  → T7.1, T7.2
      Wave 1 · 1 secuencial   → T7.3
      Wave 2 · 1 secuencial   → T7.4
      Wave 3 · 1 secuencial   → T7.5
   🧪 Bloque 8 — Pruebas
      Wave 0 · 1 secuencial   → T8.1
      Wave 1 · 3 en paralelo  → T8.2, T8.3, T8.4
      Wave 1 · 3 en paralelo  → T8.5, T8.6, T8.7
      Wave 1 · 3 en paralelo  → T8.8, T8.9, T8.10
      Wave 1 · 2 en paralelo  → T8.11, T8.12
```
