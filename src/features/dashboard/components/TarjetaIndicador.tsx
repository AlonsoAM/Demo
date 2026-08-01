/**
 * Tarjeta de indicador de la pantalla Inicio (H3, H4).
 *
 * Es **el contrato de estados que reutilizará todo el sistema** (AF-7,
 * RN-35): cualquier pantalla futura que muestre un dato asíncrono repetirá
 * este mismo patrón de 4 estados, así que se resuelve una sola vez y bien
 * acá, no por pantalla.
 *
 * Los 4 estados, según `useIndicador` (T3.2):
 * 1. **Carga** (`isPending`, o refetch tras un error): nombre visible +
 *    `Skeleton` en lugar del valor (H4-E1, H4-E2, RN-17).
 * 2. **Con valor** (`data.estado === 'con-valor'`): nombre + valor + señal de
 *    tendencia + texto de variación (H3-E2, H3-E3, RN-13).
 * 3. **Sin información** (`data.estado === 'vacio'`): nombre + texto de
 *    `textosIndicador.vacio`, sin número ni variación (H4-E4…H4-E6, RN-18).
 * 4. **Problema** (`isError`): nombre + texto de `textosIndicador.error` +
 *    botón "Reintentar" que llama `refetch()` (H4-E7…H4-E10, RN-19, RN-20).
 *
 * El `nombre` llega por prop (no se resuelve del `data` de la consulta):
 * es lo único que el estado de error nunca trae (`obtenerIndicador` rechaza
 * la promesa sin estructura), y H4-E2 exige que el nombre se vea *durante*
 * la carga, antes de que exista cualquier respuesta. `GrillaIndicadores`
 * (T6.3) es quien conoce los datos de ejemplo y se los pasa a cada tarjeta —
 * este componente no importa `indicadores.mock.ts` a propósito, para seguir
 * siendo el contrato genérico que describe AF-7 y no una pieza atada a los
 * cuatro indicadores de esta entrega.
 *
 * `modo` y `latenciaMs` viajan como props opcionales hacia `useIndicador`
 * (por defecto `'con-valor'` y la latencia simulada por defecto): en
 * producción (`InicioPage`) ninguna tarjeta los pasa, así que las cuatro se
 * comportan igual; las pruebas (T8.7) fuerzan `'vacio'` o `'falla'` por
 * indicador sin mockear la librería, ejercitando el mismo camino que la UI
 * real (A-2).
 */
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { textosIndicador } from '@/lib/textos';

import { useIndicador } from '../hooks/useIndicador';
import type { IndicadorId, ModoRespuestaIndicador } from '../types/indicador.types';
import { SenalTendencia } from './SenalTendencia';

interface TarjetaIndicadorProps {
  /** Identificador estable del indicador — es también su `queryKey` propia,
   * lo que aísla el problema de una tarjeta del resto (H4-E11, A-2). */
  indicadorId: IndicadorId;
  /** Nombre visible del indicador; se mantiene en los 4 estados (H4-E2). */
  nombre: string;
  /** Modo de respuesta a simular — inyectable para pruebas/demo (T8.7); por
   * defecto `'con-valor'` (el mismo default de `useIndicador`). */
  modo?: ModoRespuestaIndicador;
  /** Latencia simulada en milisegundos — inyectable para acelerar pruebas. */
  latenciaMs?: number;
}

/** Formato del valor con separador de miles fijo (AF-2: "45,320"), no
 * localizado — AF-23 excluye i18n en esta entrega, así que se fija
 * `'en-US'` únicamente por su separador de coma, no como idioma de la UI. */
function formatearValor(valor: number): string {
  return valor.toLocaleString('en-US');
}

export function TarjetaIndicador({
  indicadorId,
  nombre,
  modo,
  latenciaMs,
}: TarjetaIndicadorProps) {
  const { data, isPending, isError, isFetching, refetch } = useIndicador(
    indicadorId,
    modo,
    latenciaMs,
  );

  // H4-E9: reintentar vuelve la tarjeta al estado de carga antes de mostrar
  // el valor. `isPending` solo cubre la primera carga; tras un error previo
  // el status de la consulta sigue siendo 'error' mientras el refetch está en
  // vuelo, así que se suma `isError && isFetching` para cubrir ese tramo.
  const estaCargando = isPending || (isError && isFetching);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {nombre}
        </p>

        {/* A-7: `aria-live="polite"` acá, en la región del valor de ESTA
            tarjeta — no `role="alert"` global — para que el mensaje se
            anuncie sin mover el foco (H4-E12, H4-E13) y sin que una tarjeta
            hable del problema de otra (H4-E11). */}
        <div aria-live="polite" aria-atomic="true" className="min-h-14">
          {estaCargando && (
            <div aria-hidden="true" className="flex flex-col gap-2">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          )}

          {!estaCargando && isError && (
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-destructive">
                <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
                {textosIndicador.error}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() => {
                  void refetch();
                }}
              >
                <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
                {textosIndicador.reintentar}
              </Button>
            </div>
          )}

          {!estaCargando && !isError && data?.estado === 'vacio' && (
            <p className="text-sm font-medium text-muted-foreground">
              {textosIndicador.vacio}
            </p>
          )}

          {!estaCargando && !isError && data?.estado === 'con-valor' && (
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold leading-tight text-foreground">
                {formatearValor(data.indicador.valor)}
              </p>
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <SenalTendencia tendencia={data.indicador.tendencia} />
                <span className="text-muted-foreground">
                  {data.indicador.textoVariacion}
                </span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
