/**
 * Grilla de indicadores de la pantalla "Inicio" (H3-E1, H4-E11, H7-E7, H7-E8).
 *
 * Una columna en teléfono, una sola fila de 4 columnas en escritorio —
 * mismo breakpoint `md:` (768px) que ya usa el resto del shell
 * (`Sidebar.tsx`, `SidebarMovil`), para que el quiebre de la grilla coincida
 * con el quiebre en que aparece/desaparece la navegación (H7-E7, H7-E8).
 *
 * Mapea `indicadoresMock` (T2.4) y pasa `indicadorId`/`nombre` a cada
 * `TarjetaIndicador` (T6.2) — cada tarjeta resuelve su propio `useIndicador`
 * con su propia `queryKey`, así que el aislamiento entre tarjetas (H4-E11)
 * ya es estructural: esta grilla no necesita lógica extra para eso.
 *
 * En producción ninguna tarjeta recibe `modo`/`latenciaMs`: las cuatro usan
 * el default `'con-valor'` de `useIndicador`.
 */
import { indicadoresMock } from '../data/indicadores.mock';
import { TarjetaIndicador } from './TarjetaIndicador';

export function GrillaIndicadores() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {indicadoresMock.map((indicador) => (
        <TarjetaIndicador
          key={indicador.id}
          indicadorId={indicador.id}
          nombre={indicador.nombre}
        />
      ))}
    </div>
  );
}
