/**
 * Acceso a datos de indicadores de la pantalla Inicio (H4).
 *
 * Punto único de enganche del backend futuro (A-2): cuando esta entrega se
 * conecte a un backend real, aquí entra el cliente axios con interceptores.
 * Por ahora es una simulación en memoria — sin `fetch` ni `axios`, sin
 * llamadas de red reales (RN-36) — con latencia artificial vía `setTimeout`
 * y un modo de respuesta inyectable para poder forzar cada estado desde las
 * pruebas (`con-valor` / `vacio` / `falla`) ejercitando el mismo camino que
 * usará la UI real.
 */

import type {
  IndicadorId,
  ModoRespuestaIndicador,
  RespuestaIndicador,
} from '../types/indicador.types';
import { indicadoresMock } from '../data/indicadores.mock';

/** Latencia simulada por defecto de `obtenerIndicador`, en milisegundos. */
export const LATENCIA_SIMULADA_MS = 600;

/** Espera artificial que imita la latencia de una llamada real al backend. */
function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Obtiene el indicador de ejemplo que corresponde al `id` (AF-2, AF-3).
 * Lanza si el `id` no existe entre los cuatro indicadores declarados —
 * error de programación, no un estado de UI.
 */
function buscarIndicadorMock(id: IndicadorId) {
  const indicador = indicadoresMock.find((candidato) => candidato.id === id);
  if (!indicador) {
    throw new Error(`Indicador desconocido: "${id}"`);
  }
  return indicador;
}

/**
 * "Endpoint" simulado de un indicador individual (A-2).
 *
 * @param id Identificador del indicador a obtener.
 * @param modo Modo de respuesta a simular (por defecto `'con-valor'`):
 *   - `'con-valor'`: resuelve con la información completa del indicador (RN-13).
 *   - `'vacio'`: resuelve sin información para el periodo (RN-18 / H4-E4…H4-E6).
 *   - `'falla'`: **rechaza** la promesa (RN-19 / H4-E7…H4-E9), para que
 *     TanStack Query lo exponga como `isError` con `refetch` (A-2).
 * @param latenciaMs Latencia simulada en milisegundos (por defecto
 *   `LATENCIA_SIMULADA_MS`); parametrizable para acelerar las pruebas.
 */
export async function obtenerIndicador(
  id: IndicadorId,
  modo: ModoRespuestaIndicador = 'con-valor',
  latenciaMs: number = LATENCIA_SIMULADA_MS,
): Promise<RespuestaIndicador> {
  await esperar(latenciaMs);

  if (modo === 'falla') {
    throw new Error(`No se pudo obtener el indicador "${id}"`);
  }

  const indicador = buscarIndicadorMock(id);

  if (modo === 'vacio') {
    return { estado: 'vacio', id: indicador.id, nombre: indicador.nombre };
  }

  return { estado: 'con-valor', indicador };
}
