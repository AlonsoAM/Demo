/**
 * Región de anuncio para lectores de pantalla (H7-E21): informa el título de
 * la pantalla activa cada vez que cambia. Es puramente presentacional — no
 * resuelve la ruta ni deriva el título por sí misma; recibe `titulo` ya
 * resuelto desde la fuente única de navegación (`src/app/navegacion.ts`) por
 * quien la use (T5.13 `AppLayout`), igual que hacen `Topbar` (T5.11) y
 * `Breadcrumb` (T5.7). Así el título nunca se calcula dos veces.
 *
 * `aria-live="polite"`: el mismo nivel de urgencia que las tarjetas de
 * indicador (A-7) — el cambio de pantalla no es una alerta, es información
 * de contexto. `aria-atomic="true"` asegura que se lea el texto completo del
 * nuevo título y no solo la diferencia. Visualmente oculta con el patrón
 * `sr-only` (utilidad nativa de Tailwind): no ocupa espacio ni layout, solo
 * existe para tecnología de asistencia.
 */
interface AnuncioPantallaProps {
  /** Título de la pantalla activa, ya resuelto desde `navegacion.ts`. */
  titulo: string;
}

export function AnuncioPantalla({ titulo }: AnuncioPantallaProps) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {titulo}
    </div>
  );
}
