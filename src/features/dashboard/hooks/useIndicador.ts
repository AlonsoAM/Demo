/**
 * Hook de datos de un indicador individual de la pantalla Inicio (H4).
 *
 * Envuelve `obtenerIndicador` (T3.1) con TanStack Query: una entrada de cache
 * por indicador para que el fallo de uno no afecte a los otros tres (H4-E11,
 * RN-21, A-2), y `retry: false` porque el reintento es una acción explícita
 * del usuario vía el botón "Reintentar" (H4-E8/E9), no algo automático — un
 * retry automático haría que el estado de error casi nunca llegue a verse
 * (RN-20).
 */

import { useQuery } from '@tanstack/react-query';
import { obtenerIndicador } from '../api/indicadores.api';
import type { IndicadorId, ModoRespuestaIndicador } from '../types/indicador.types';

/**
 * Obtiene el indicador `id` (H4-E3: el éxito reemplaza el skeleton de carga).
 *
 * @param id Identificador estable del indicador (AF-2) — forma parte de la
 *   `queryKey` para aislar el cache por indicador (H4-E11, RN-21).
 * @param modo Modo de respuesta a simular; por defecto `'con-valor'`. También
 *   forma parte de la `queryKey`: cada combinación de `id`+`modo`+`latenciaMs`
 *   tiene su propia entrada de cache, para que cambiar el modo simulado no
 *   reutilice una respuesta cacheada de un modo distinto (hallazgo T9.3).
 * @param latenciaMs Latencia simulada en milisegundos; por defecto la de
 *   `obtenerIndicador`. También forma parte de la `queryKey` (ver `modo`).
 */
export function useIndicador(
  id: IndicadorId,
  modo: ModoRespuestaIndicador = 'con-valor',
  latenciaMs?: number,
) {
  const query = useQuery({
    queryKey: ['indicador', id, modo, latenciaMs] as const,
    queryFn: () => obtenerIndicador(id, modo, latenciaMs),
    retry: false,
  });

  return {
    ...query,
    /** Reintento explícito del usuario (H4-E9, H4-E10) — nunca automático. */
    refetch: query.refetch,
  };
}
