import { Outlet, useLocation } from 'react-router';

import { AnuncioPantalla } from './AnuncioPantalla';
import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './Sidebar';
import { SidebarMovil } from './SidebarMovil';
import { resolverTitulo } from './resolverTitulo';
import { Topbar } from './Topbar';

/**
 * Estructura común del sistema (T5.13): menú lateral + barra superior + ruta
 * de navegación + área de contenido, compartida por las 8 pantallas que monta
 * el router (T7.2) vía `<Outlet />` (H1-E12, H5-E14, RN-7).
 *
 * Menú lateral según el ancho (H7-E1…H7-E3, RN-30, RN-31):
 * - `Sidebar` (T5.5) ya se oculta a sí mismo bajo el breakpoint de escritorio
 *   (`hidden md:flex`) y ocupa espacio fijo en el layout cuando es visible.
 * - `SidebarMovil` (T5.6) está **siempre montado** — es un `Sheet` que no
 *   ocupa espacio en el flujo (se superpone) y decide su propia visibilidad
 *   leyendo `useUiStore().menuMovilAbierto`; este layout no necesita leer ese
 *   estado ni condicionar su montaje.
 *
 * Altura fija de viewport (`h-dvh`) en la raíz, no `min-h-screen`: así
 * `Sidebar` (que asume `h-full` para su propio scroll interno del `<nav>`,
 * T5.5) recibe una altura real, y el documento (`<html>`/`<body>`) nunca
 * llega a necesitar scroll propio — el único contenedor que se desplaza
 * verticalmente es `<main>`. Esto es además lo que evita el defecto de scroll
 * horizontal fantasma documentado en la nota de T5.13: como el documento no
 * scrollea, un tooltip con portal a `document.body` (Radix, `TooltipContent`)
 * nunca amplía el `scrollWidth` del documento, sin importar cuánto sobresalga
 * visualmente.
 *
 * `overflow-x-hidden` explícito en la raíz y en `<main>` (nunca `overflow-auto`,
 * que aplica a ambos ejes): el único eje que debe scrollear es Y, en `<main>`.
 * Verificado sin scroll horizontal entre 360 px y 1440 px (H7-E1, H7-E2).
 *
 * Fondo `bg-muted` en la raíz, no `bg-background` (decisión pendiente de
 * T1.4, resuelta aquí sin tocar `src/index.css`): el mockup aprobado pinta el
 * fondo de página con el token gris (`surface-1`) y las tarjetas con el token
 * blanco (`canvas`), pero el mapeo shadcn oficial del DESIGN.md invierte esos
 * dos roles (`--background` = canvas blanco, `--card` = surface-1 gris, A-5).
 * Los tokens no se reinterpretan (A11): se usa `bg-muted` (que sí mapea a
 * `surface-1`) para el fondo de página en vez de `bg-background`, y las
 * tarjetas (T6.2) siguen usando `bg-card` sin cambios.
 *
 * El título de la pantalla activa se resuelve una sola vez aquí, con la misma
 * función que ya usa `Topbar` (`resolverTitulo`, exportada puntualmente para
 * esta tarea) y se pasa a `AnuncioPantalla` (T5.12, H7-E21) — así el título
 * nunca se calcula una tercera vez con lógica duplicada.
 */
export function AppLayout() {
  const { pathname } = useLocation();
  const titulo = resolverTitulo(pathname);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-muted">
      <Sidebar />
      <SidebarMovil />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <Breadcrumb />
        <AnuncioPantalla titulo={titulo} />

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
