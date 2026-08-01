/**
 * Los cuatro indicadores de ejemplo de la pantalla "Inicio" (H3-E2, H3-E3,
 * H3-E5, H3-E6, H3-E7, H3-E8, H3-E10, H3-E11).
 *
 * Valores y textos de variación literales de AF-2 y AF-3 — datos de muestra
 * para aprobar la presentación, no cifras reales del negocio (RN-36).
 */

import type { Indicador } from '../types/indicador.types';

/**
 * Los cuatro indicadores, en el orden exacto que exige H3-E1 ("Órdenes del
 * mes", "Kilos despachados", "Clientes activos", "Órdenes pendientes").
 */
export const indicadoresMock: Indicador[] = [
  {
    id: 'ordenes-mes',
    nombre: 'Órdenes del mes',
    valor: 128,
    textoVariacion: '+12% vs. mes anterior',
    tendencia: 'alza',
  },
  {
    id: 'kilos-despachados',
    nombre: 'Kilos despachados',
    valor: 45320,
    textoVariacion: '+8% vs. mes anterior',
    tendencia: 'alza',
  },
  {
    id: 'clientes-activos',
    nombre: 'Clientes activos',
    valor: 37,
    textoVariacion: 'Sin cambio vs. mes anterior',
    tendencia: 'neutra',
  },
  {
    id: 'ordenes-pendientes',
    nombre: 'Órdenes pendientes',
    valor: 9,
    textoVariacion: '-3% vs. mes anterior',
    tendencia: 'baja',
  },
];
