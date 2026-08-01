/**
 * Señal visual de la tendencia de un indicador (H3, AF-4).
 *
 * AF-4 / RN-14…RN-16: la tendencia nunca se comunica solo por color — cada
 * estado trae una forma distinta (flecha arriba, flecha abajo, raya
 * horizontal) además del tono de `--primary`/`--destructive`/`--muted-foreground`
 * del DESIGN.md, para que se reconozca sin depender de la vista del color.
 *
 * Es decorativa (`aria-hidden`): vive siempre junto al texto de variación ya
 * redactado de `Indicador.textoVariacion` (ej. "+12% vs. mes anterior" o
 * "Sin cambio vs. mes anterior"), que es quien lleva el significado a
 * lectores de pantalla — evita anunciar la forma dos veces.
 */
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';
import type { Tendencia } from '../types/indicador.types';

interface SenalTendenciaProps {
  /** Sentido de la variación a señalar (H3-E4, H3-E9, H3-E12). */
  tendencia: Tendencia;
}

interface ConfiguracionTendencia {
  Icono: LucideIcon;
  claseColor: string;
}

/** Un icono y un color de token por sentido — nunca solo color (AF-4). */
const CONFIGURACION_POR_TENDENCIA: Record<Tendencia, ConfiguracionTendencia> = {
  alza: { Icono: TrendingUp, claseColor: 'text-primary' },
  baja: { Icono: TrendingDown, claseColor: 'text-destructive' },
  neutra: { Icono: Minus, claseColor: 'text-muted-foreground' },
};

export function SenalTendencia({ tendencia }: SenalTendenciaProps) {
  const { Icono, claseColor } = CONFIGURACION_POR_TENDENCIA[tendencia];

  return (
    <Icono
      aria-hidden="true"
      focusable="false"
      strokeWidth={2.5}
      className={`h-4 w-4 shrink-0 ${claseColor}`}
    />
  );
}
