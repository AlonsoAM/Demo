/**
 * Pruebas de tema (U-8, T8.9): valor inicial claro (H6-E1), alternancia en
 * ambos sentidos (H6-E2, H6-E3), persistencia entre visitas (H6-E4, RN-29),
 * que el tema sobrevive un cambio de sección (H6-E7) y que el cambio alcanza
 * al menú lateral (H6-E5) y a las tarjetas de indicador (H6-E6) sin lógica
 * condicional propia de cada componente — todos consumen los mismos tokens
 * CSS que `useAplicarTema` (T4.3, A-6) cambia sobre `<html>` con la clase
 * `dark`.
 *
 * H6-E8 (contraste ≥ 4.5:1) se confirma con la medición real en Verify
 * (`design/verify-contrast.mjs` sobre `src/index.css`). Acá sólo se verifica
 * que los tokens `--foreground`/`--card` efectivamente cambian de valor al
 * aplicar `.dark` — la clase es el mecanismo que ese script mide después;
 * este test no reimplementa el cálculo de contraste (nota de T8.9).
 *
 * El store de tema persiste en `localStorage` bajo la clave `layout.tema`
 * (`useTemaStore`, T4.2) — se limpia entre tests para que ningún caso
 * arrastre el tema elegido por el anterior.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import '@/index.css';
import { BotonTema } from '@/components/layout/BotonTema';
import { Sidebar } from '@/components/layout/Sidebar';
import { TarjetaIndicador } from '@/features/dashboard/components/TarjetaIndicador';
import { useTemaStore } from '@/stores/useTemaStore';
import { renderConProveedores } from '@/test/utils';

const CLAVE_LOCALSTORAGE = 'layout.tema';

// jsdom no implementa `ResizeObserver`: lo necesita el `Popper` interno de
// Radix Tooltip que usa `Sidebar` (igual que en Sidebar.test.tsx, T8.2) —
// stub local a este archivo.
class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub);

/** Vuelve el store de tema y el DOM a su estado inicial entre tests. */
function resetearTema() {
  window.localStorage.removeItem(CLAVE_LOCALSTORAGE);
  useTemaStore.setState({ tema: 'claro' });
  document.documentElement.classList.remove('dark');
}

describe('Tema claro/oscuro', () => {
  beforeEach(() => {
    resetearTema();
  });

  it('H6-E1: el valor inicial es claro, sin la clase dark en <html>', () => {
    renderConProveedores(<BotonTema />);

    expect(useTemaStore.getState().tema).toBe('claro');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Cambiar a tema oscuro' })).toBeInTheDocument();
  });

  it('H6-E2: alternar desde claro pasa a oscuro y agrega la clase dark a <html>', () => {
    renderConProveedores(<BotonTema />);

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));

    expect(useTemaStore.getState().tema).toBe('oscuro');
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Cambiar a tema claro' })).toBeInTheDocument();
  });

  it('H6-E3: alternar desde oscuro vuelve a claro y quita la clase dark de <html>', () => {
    renderConProveedores(<BotonTema />);

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));
    expect(document.documentElement).toHaveClass('dark');

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema claro' }));

    expect(useTemaStore.getState().tema).toBe('claro');
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('H6-E4 / RN-29: el tema elegido se guarda en localStorage y un módulo recién cargado lo recupera', async () => {
    useTemaStore.getState().setTema('oscuro');

    const guardado = window.localStorage.getItem(CLAVE_LOCALSTORAGE);
    expect(guardado).toContain('"tema":"oscuro"');

    // Simula una nueva visita (recarga de página): módulo fresco del store,
    // mismo `localStorage` — equivalente a lo que hace `Sidebar.test.tsx`
    // (T8.2, H2-E6) para el store sin persistencia, pero acá se espera que
    // SÍ recupere el valor guardado (a diferencia de `useUiStore`, A-3).
    vi.resetModules();
    const { useTemaStore: storeRecienCargado } = await import('@/stores/useTemaStore');

    expect(storeRecienCargado.getState().tema).toBe('oscuro');
  });

  it('H6-E5: el cambio de tema alcanza al menú lateral', () => {
    renderConProveedores(
      <>
        <BotonTema />
        <Sidebar />
      </>,
    );

    const aside = screen.getByRole('complementary', { name: 'Menú principal' });
    expect(aside).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));

    // El menú lateral no tiene lógica de tema propia: consume los mismos
    // tokens CSS (`bg-card`, etc.) que cambia la clase `dark` en `<html>`
    // (A-6) — sigue montado e intacto, y el `<html>` que lo contiene pasó a
    // oscuro.
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByRole('complementary', { name: 'Menú principal' })).toBeInTheDocument();
  });

  it('H6-E6: el cambio de tema alcanza a las tarjetas de indicador', async () => {
    const { container } = renderConProveedores(
      <>
        <BotonTema />
        <TarjetaIndicador indicadorId="ordenes-mes" nombre="Órdenes del mes" latenciaMs={0} />
      </>,
    );

    expect(await screen.findByText('128')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));

    // Igual que el menú lateral: la tarjeta (`Card`, `data-slot="card"`) no
    // tiene lógica de tema propia — sigue mostrando el mismo valor, y el
    // `<html>` que la contiene pasó a oscuro.
    expect(document.documentElement).toHaveClass('dark');
    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
  });

  it('H6-E7: el tema se mantiene al cambiar de sección (navegación)', () => {
    renderConProveedores(
      <>
        <BotonTema />
        <Sidebar />
      </>,
      { initialEntries: ['/'] },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));
    expect(document.documentElement).toHaveClass('dark');

    fireEvent.click(screen.getByRole('link', { name: 'Almacén' }));

    expect(screen.getByRole('link', { name: 'Almacén' })).toHaveAttribute('aria-current', 'page');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('H6-E8: los tokens de contraste (`--foreground`, `--card`) cambian de valor al aplicar la clase dark', () => {
    document.documentElement.classList.remove('dark');
    const foregroundClaro = getComputedStyle(document.documentElement).getPropertyValue(
      '--foreground',
    );
    const cardClaro = getComputedStyle(document.documentElement).getPropertyValue('--card');

    document.documentElement.classList.add('dark');
    const foregroundOscuro = getComputedStyle(document.documentElement).getPropertyValue(
      '--foreground',
    );
    const cardOscuro = getComputedStyle(document.documentElement).getPropertyValue('--card');

    // No se calcula el ratio de contraste acá (eso lo mide
    // `design/verify-contrast.mjs` en Verify) — sólo que los tokens
    // realmente cambian de valor bajo `.dark`, que es lo que ese script
    // termina midiendo.
    expect(foregroundClaro).not.toBe('');
    expect(cardClaro).not.toBe('');
    expect(foregroundOscuro).not.toBe(foregroundClaro);
    expect(cardOscuro).not.toBe(cardClaro);
  });
});
