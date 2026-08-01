/**
 * Pruebas de `TarjetaIndicador` (U-6, T8.7): los 4 estados del contrato que
 * reutilizará todo el sistema (AF-7, RN-35) — carga, con valor, vacío y
 * problema —, el reintento explícito (H4-E8/E9/E10), el aislamiento entre
 * tarjetas por `queryKey` (H4-E11, A-2) y el anuncio a lectores de pantalla
 * vía `aria-live="polite"` sin robar el foco (A-7, H4-E12/E13).
 *
 * A propósito NO se mockea `@tanstack/react-query` ni `indicadores.api.ts`:
 * el `modo` inyectable de `obtenerIndicador` (T3.1) fuerza cada estado
 * recorriendo el mismo camino real que usa `InicioPage` en producción (A-2).
 * `latenciaMs={0}` acelera las pruebas sin cambiar el camino: el `setTimeout`
 * sigue siendo una macrotarea, así que el estado de carga (`isPending`) sigue
 * siendo observable de forma síncrona apenas montado el componente.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderConProveedores } from '@/test/utils';
import { textosIndicador } from '@/lib/textos';

import { TarjetaIndicador } from '../components/TarjetaIndicador';

describe('TarjetaIndicador', () => {
  it('H3-E2, H3-E3, H3-E4: "Órdenes del mes" muestra 128, su variación y la tendencia en alza', async () => {
    const { container } = renderConProveedores(
      <TarjetaIndicador indicadorId="ordenes-mes" nombre="Órdenes del mes" latenciaMs={0} />,
    );

    expect(await screen.findByText('128')).toBeInTheDocument();
    expect(screen.getByText('+12% vs. mes anterior')).toBeInTheDocument();
    // SenalTendencia es decorativa (aria-hidden): se verifica por el color
    // del ícono, nunca solo por color (AF-4) — acá solo el color, la forma
    // (flecha) queda cubierta visualmente por el propio SVG de lucide.
    expect(container.querySelector('svg')).toHaveClass('text-primary');
  });

  it('H3-E5, H3-E6: "Kilos despachados" muestra 45,320 con separador de miles y su variación', async () => {
    renderConProveedores(
      <TarjetaIndicador indicadorId="kilos-despachados" nombre="Kilos despachados" latenciaMs={0} />,
    );

    expect(await screen.findByText('45,320')).toBeInTheDocument();
    expect(screen.getByText('+8% vs. mes anterior')).toBeInTheDocument();
  });

  it('H3-E7, H3-E8, H3-E9: "Clientes activos" muestra 37, "Sin cambio" y tendencia neutra', async () => {
    const { container } = renderConProveedores(
      <TarjetaIndicador indicadorId="clientes-activos" nombre="Clientes activos" latenciaMs={0} />,
    );

    expect(await screen.findByText('37')).toBeInTheDocument();
    expect(screen.getByText('Sin cambio vs. mes anterior')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-muted-foreground');
  });

  it('H3-E10, H3-E11, H3-E12: "Órdenes pendientes" muestra 9, -3% y tendencia a la baja', async () => {
    const { container } = renderConProveedores(
      <TarjetaIndicador indicadorId="ordenes-pendientes" nombre="Órdenes pendientes" latenciaMs={0} />,
    );

    expect(await screen.findByText('9')).toBeInTheDocument();
    expect(screen.getByText('-3% vs. mes anterior')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-destructive');
  });

  it('H4-E1, H4-E2, H4-E3: muestra el nombre y el skeleton durante la carga, y el valor lo reemplaza al resolver', async () => {
    renderConProveedores(
      <TarjetaIndicador indicadorId="ordenes-mes" nombre="Órdenes del mes" latenciaMs={0} />,
    );

    // H4-E2: el nombre está visible desde el primer render, antes de cualquier respuesta.
    expect(screen.getByText('Órdenes del mes')).toBeInTheDocument();
    // H4-E1: mientras no hay respuesta se muestra el skeleton en lugar del valor.
    expect(document.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(2);

    // H4-E3: el éxito reemplaza el skeleton por el valor.
    expect(await screen.findByText('128')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(0);
  });

  it('H4-E4, H4-E5, H4-E6: el modo vacío muestra el texto de "sin información", sin número ni variación', async () => {
    renderConProveedores(
      <TarjetaIndicador
        indicadorId="clientes-activos"
        nombre="Clientes activos"
        modo="vacio"
        latenciaMs={0}
      />,
    );

    expect(await screen.findByText(textosIndicador.vacio)).toBeInTheDocument();
    expect(screen.queryByText('37')).not.toBeInTheDocument();
    expect(screen.queryByText(/vs\. mes anterior/)).not.toBeInTheDocument();
  });

  it('H4-E7, H4-E8: el modo falla muestra el texto de error y el botón "Reintentar"', async () => {
    renderConProveedores(
      <TarjetaIndicador
        indicadorId="ordenes-pendientes"
        nombre="Órdenes pendientes"
        modo="falla"
        latenciaMs={0}
      />,
    );

    expect(await screen.findByText(textosIndicador.error)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: textosIndicador.reintentar }),
    ).toBeInTheDocument();
  });

  it('H4-E9, H4-E10: "Reintentar" vuelve a la carga y, si la API se recuperó, reemplaza el error por el valor', async () => {
    // Latencia > 0 acá a propósito: deja una ventana observable para
    // capturar el estado de carga intermedio del reintento (H4-E9) antes de
    // que la respuesta simulada se resuelva.
    const { rerender } = renderConProveedores(
      <TarjetaIndicador
        indicadorId="ordenes-mes"
        nombre="Órdenes del mes"
        modo="falla"
        latenciaMs={40}
      />,
    );

    expect(await screen.findByText(textosIndicador.error)).toBeInTheDocument();

    // Simula que la API se recuperó antes del reintento: un cambio de props
    // (no un mock de la librería) actualiza el `modo` que consumirá el
    // `queryFn` real de `useIndicador` en el próximo `refetch()` (A-2).
    rerender(
      <TarjetaIndicador
        indicadorId="ordenes-mes"
        nombre="Órdenes del mes"
        modo="con-valor"
        latenciaMs={40}
      />,
    );

    // El estado de error persiste hasta el reintento explícito (RN-20).
    expect(screen.getByText(textosIndicador.error)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: textosIndicador.reintentar }));

    // H4-E9: el reintento vuelve la tarjeta al estado de carga antes del valor.
    await waitFor(() => {
      expect(document.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(2);
    });

    // H4-E10: el reintento exitoso reemplaza el error por el valor.
    expect(await screen.findByText('128')).toBeInTheDocument();
    expect(screen.queryByText(textosIndicador.error)).not.toBeInTheDocument();
  });

  it('H4-E11: el problema de una tarjeta no afecta a otra con distinto id (queryKey aislada, A-2)', async () => {
    renderConProveedores(
      <>
        <TarjetaIndicador
          indicadorId="ordenes-mes"
          nombre="Órdenes del mes"
          modo="falla"
          latenciaMs={0}
        />
        <TarjetaIndicador
          indicadorId="kilos-despachados"
          nombre="Kilos despachados"
          modo="con-valor"
          latenciaMs={0}
        />
      </>,
    );

    expect(await screen.findByText(textosIndicador.error)).toBeInTheDocument();
    expect(await screen.findByText('45,320')).toBeInTheDocument();

    // Solo la tarjeta forzada a fallar está en error; la otra sigue con su valor.
    expect(screen.getAllByText(textosIndicador.error)).toHaveLength(1);
    expect(screen.getByText('+8% vs. mes anterior')).toBeInTheDocument();
  });

  it('H4-E12, H4-E13: la región del valor usa aria-live="polite" y el cambio de estado no roba el foco', async () => {
    const { container } = renderConProveedores(
      <TarjetaIndicador
        indicadorId="ordenes-mes"
        nombre="Órdenes del mes"
        modo="falla"
        latenciaMs={0}
      />,
    );

    const regionDeValor = container.querySelector('[aria-live="polite"]');
    expect(regionDeValor).toHaveAttribute('aria-atomic', 'true');
    expect(document.activeElement).toBe(document.body);

    // La transición de carga → problema se anuncia sin mover el foco.
    expect(await screen.findByText(textosIndicador.error)).toBeInTheDocument();
    expect(document.activeElement).toBe(document.body);
    expect(container.querySelector('[aria-live="polite"]')).toHaveAttribute(
      'aria-atomic',
      'true',
    );
  });
});
