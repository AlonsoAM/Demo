/**
 * Contrato de tipos del indicador de la pantalla Inicio (H3, H4).
 *
 * Es la base técnica que consumen:
 * - T2.4 `indicadores.mock.ts` — los cuatro indicadores de ejemplo (AF-2, AF-3).
 * - Bloque 3 `indicadores.api.ts` / `useIndicador` — la API simulada con sus
 *   tres modos de respuesta inyectables (A-2, T3.1).
 * - `TarjetaIndicador` / `SenalTendencia` — el contrato de estados que
 *   reutilizará todo el sistema (AF-7, RN-35).
 */

/** Identificador estable de cada indicador de la pantalla Inicio (AF-2). */
export type IndicadorId =
  | 'ordenes-mes'
  | 'kilos-despachados'
  | 'clientes-activos'
  | 'ordenes-pendientes';

/**
 * Sentido de la variación de un indicador respecto al periodo anterior.
 * Se comunica siempre con forma (flecha o raya) además de color (AF-4, RN-14…RN-16):
 * nunca es el único canal de significado.
 */
export type Tendencia = 'alza' | 'baja' | 'neutra';

/**
 * Indicador con información disponible para el periodo — el estado "con valor"
 * de la tarjeta (RN-13, H3-E2…H3-E12).
 */
export interface Indicador {
  /** Identificador estable, usado como `queryKey` por indicador (A-2). */
  id: IndicadorId;
  /** Nombre visible, ej. "Órdenes del mes" — se mantiene visible en carga (H4-E2). */
  nombre: string;
  /** Valor del periodo, ej. 128, 45320, 37, 9 (AF-2). */
  valor: number;
  /** Texto de variación ya redactado, ej. "+12% vs. mes anterior" (AF-3). */
  textoVariacion: string;
  /** Sentido de la variación, para `SenalTendencia`. */
  tendencia: Tendencia;
}

/**
 * Modo de respuesta simulado e inyectable de `obtenerIndicador` (T3.1):
 * - `'con-valor'`: el indicador trae información completa (RN-13).
 * - `'vacio'`: no hay información para el periodo (RN-18 / H4-E4…H4-E6).
 * - `'falla'`: la obtención no se pudo completar (RN-19 / H4-E7…H4-E9). Se
 *   modela como **rechazo de la promesa** (no como variante resuelta de
 *   `RespuestaIndicador`), para que TanStack Query lo reconozca como
 *   `isError` y exponga `refetch` (A-2).
 */
export type ModoRespuestaIndicador = 'con-valor' | 'vacio' | 'falla';

/**
 * Resultado **resuelto** de `obtenerIndicador` — cubre los dos modos que no
 * lanzan: con valor o vacío. El tercer modo (`'falla'`) no tiene variante acá:
 * se representa lanzando un `Error` que `useIndicador` expone como `isError`.
 */
export type RespuestaIndicador =
  | { estado: 'con-valor'; indicador: Indicador }
  | { estado: 'vacio'; id: IndicadorId; nombre: string };
