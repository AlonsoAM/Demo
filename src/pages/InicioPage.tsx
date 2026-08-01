/**
 * Pantalla "Inicio" (H1-E1, H1-E14, H3-E13, H3-E14).
 *
 * Monta únicamente la grilla de las cuatro tarjetas de indicador. El título
 * "Inicio" ya lo muestra la `Topbar` a partir de la fuente única de
 * navegación (`navegacion.ts`) — esta página no lo repite con un
 * encabezado propio.
 *
 * A propósito NO incluye gráficos de tendencia/composición ni una tabla de
 * actividad reciente: se descartaron explícitamente en la entrevista
 * funcional (H3-E13, H3-E14) — agregarlos sería "de más" (A13).
 */
import { GrillaIndicadores } from '@/features/dashboard/components/GrillaIndicadores';

export function InicioPage() {
  return <GrillaIndicadores />;
}
