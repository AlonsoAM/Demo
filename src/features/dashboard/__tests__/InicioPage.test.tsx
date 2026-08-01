/**
 * Pruebas de `InicioPage` (U-7, T8.8): las cuatro tarjetas de indicador en el
 * orden exacto que exige H3-E1, que la pantalla abre sin exigir inicio de
 * sesión (H1-E15, AF-24) — y que "volver a Inicio" (H1-E14) la muestra igual,
 * sin depender de ningún guard de ruta —, y la ausencia deliberada de
 * gráficos (H3-E13) y de tabla de actividad reciente (H3-E14): se descartaron
 * explícitamente en la entrevista funcional, agregarlos sería "de más" (A13).
 *
 * A propósito NO se mockea nada de `dashboard/` (ni `indicadores.mock.ts` ni
 * `useIndicador`): `InicioPage` se monta tal cual la monta `router.tsx` en
 * producción, con la latencia simulada real de `obtenerIndicador` (A-2), por
 * eso las aserciones esperan la resolución con `findByText`/`findAllByText`
 * en vez de asumir un estado síncrono.
 */
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

import { renderConProveedores } from '@/test/utils';

import { InicioPage } from '@/pages/InicioPage';

describe('InicioPage', () => {
  it('H1-E1, H3-E1: muestra las cuatro tarjetas con sus nombres en el orden exacto', async () => {
    renderConProveedores(<InicioPage />);

    // Espera a que resuelva la última tarjeta (latencia real de `obtenerIndicador`).
    expect(await screen.findByText('-3% vs. mes anterior', {}, { timeout: 2000 })).toBeInTheDocument();

    const nombres = screen
      .getAllByText(
        /^(Órdenes del mes|Kilos despachados|Clientes activos|Órdenes pendientes)$/,
      )
      .map((elemento) => elemento.textContent);

    expect(nombres).toEqual([
      'Órdenes del mes',
      'Kilos despachados',
      'Clientes activos',
      'Órdenes pendientes',
    ]);
  });

  it('H1-E15: abre sin ningún inicio de sesión y muestra las cuatro tarjetas de indicador', async () => {
    // Sin mock ni proveedor de autenticación: `renderConProveedores` replica
    // exactamente los proveedores reales (T7.1) y ninguno exige sesión (AF-24).
    renderConProveedores(<InicioPage />);

    expect(await screen.findByText('128', {}, { timeout: 2000 })).toBeInTheDocument();
    expect(await screen.findByText('45,320', {}, { timeout: 2000 })).toBeInTheDocument();
    expect(await screen.findByText('37', {}, { timeout: 2000 })).toBeInTheDocument();
    expect(await screen.findByText('9', {}, { timeout: 2000 })).toBeInTheDocument();
  });

  it('H1-E14: al volver a Inicio se muestran las cuatro tarjetas de indicador', async () => {
    // "Volver a Inicio" remonta la misma `InicioPage` que usa `router.tsx` en
    // la ruta índice — no hay estado propio de la sección En construcción que
    // limpiar, así que el remontaje ejercita el mismo camino de carga inicial.
    renderConProveedores(<InicioPage />);

    expect(
      await screen.findByText('Órdenes del mes', {}, { timeout: 2000 }),
    ).toBeInTheDocument();
    expect(screen.getByText('Kilos despachados')).toBeInTheDocument();
    expect(screen.getByText('Clientes activos')).toBeInTheDocument();
    expect(screen.getByText('Órdenes pendientes')).toBeInTheDocument();
  });

  it('H3-E13: el área de contenido no muestra ningún gráfico', async () => {
    const { container } = renderConProveedores(<InicioPage />);

    expect(await screen.findByText('128', {}, { timeout: 2000 })).toBeInTheDocument();

    // Sin librería de gráficos de por medio (Chart.js/Recharts/etc.): ni
    // `<canvas>` ni el contenedor característico de Recharts.
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
    expect(container.querySelector('.recharts-wrapper')).not.toBeInTheDocument();

    // Los únicos `<svg>` del área de contenido son las 4 señales de tendencia
    // decorativas de cada tarjeta (`SenalTendencia`, `aria-hidden`) — ninguno
    // extra que indique un gráfico agregado de más (A13).
    expect(container.querySelectorAll('svg')).toHaveLength(4);
  });

  it('H3-E14: el área de contenido no muestra ninguna tabla de actividad reciente', async () => {
    const { container } = renderConProveedores(<InicioPage />);

    expect(await screen.findByText('128', {}, { timeout: 2000 })).toBeInTheDocument();

    expect(container.querySelector('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
