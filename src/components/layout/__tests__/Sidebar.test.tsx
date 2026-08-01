/**
 * Pruebas de `Sidebar` (U-1, T8.2): las 6 secciones y su orden (H1-E2), el
 * despliegue de las subsecciones de "Comercial" y "Packing" al elegirlas
 * (H1-E3, H1-E4), la marca de sección activa — que recae en la subsección
 * elegida, no en la sección contenedora (H1-E5) — colapsar/expandir a solo
 * iconos con su tooltip (H2-E1…H2-E3), la sección contenedora marcada activa
 * cuando la ruta activa es una subsección con el menú colapsado (H2-E4), que
 * el colapso sobrevive a un cambio de ruta (H2-E5) porque `useUiStore` no
 * persiste — así que un módulo nuevo siempre arranca expandido (H2-E6, A-3) —
 * y que la marca de "activa" no depende solo del color (H7-E19, RN-34).
 *
 * Se usa `renderConProveedores` (T8.1): `Sidebar` depende de `useLocation`
 * (ruta activa) y del `useUiStore` real (sin mock) para ejercitar colapso y
 * navegación tal como ocurre en la app.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';

import { renderConProveedores } from '@/test/utils';
import { useUiStore } from '@/stores/useUiStore';

import { Sidebar } from '../Sidebar';

// jsdom no implementa `ResizeObserver`: lo necesita el `Popper` interno de
// Radix Tooltip (H2-E3) para posicionar el tooltip. Es un stub local a este
// archivo (no toca `src/test/setup.ts`, fuera del alcance de T8.2).
class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub);

/** Vuelve el store de UI a su estado inicial entre tests (evita fuga entre casos). */
function resetearUiStore() {
  useUiStore.setState({
    sidebarColapsado: false,
    menuMovilAbierto: false,
    panelAbierto: 'ninguno',
  });
}

describe('Sidebar', () => {
  it('H1-E2: renderiza las 6 secciones del menú, en el orden exigido', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />);

    const aside = screen.getByRole('complementary', { name: 'Menú principal' });
    const enlaces = within(aside).getAllByRole('link');

    expect(enlaces.map((enlace) => enlace.textContent)).toEqual([
      'Inicio',
      'Comercial',
      'Packing',
      'Almacén',
      'Reportes',
      'Configuración',
    ]);
  });

  it('H1-E3: al elegir "Comercial" se despliega su grupo con "Órdenes" y "Clientes"', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />);

    fireEvent.click(screen.getByRole('link', { name: 'Comercial' }));

    const grupo = screen.getByRole('group', { name: 'Subsecciones de Comercial' });
    expect(within(grupo).getByRole('link', { name: 'Órdenes' })).toBeInTheDocument();
    expect(within(grupo).getByRole('link', { name: 'Clientes' })).toBeInTheDocument();
  });

  it('H1-E4: al elegir "Packing" se despliega su grupo con "Lotes" y "Despachos"', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />);

    fireEvent.click(screen.getByRole('link', { name: 'Packing' }));

    const grupo = screen.getByRole('group', { name: 'Subsecciones de Packing' });
    expect(within(grupo).getByRole('link', { name: 'Lotes' })).toBeInTheDocument();
    expect(within(grupo).getByRole('link', { name: 'Despachos' })).toBeInTheDocument();
  });

  it('H1-E5: solo la subsección elegida queda marcada activa, no la sección "Comercial"', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />);

    // Elegir "Comercial" navega a su primera subsección, "Órdenes" (AF-21).
    fireEvent.click(screen.getByRole('link', { name: 'Comercial' }));

    expect(screen.getByRole('link', { name: 'Órdenes' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Comercial' })).not.toHaveAttribute('aria-current');
  });

  it('H2-E1 / H2-E2: colapsar oculta los nombres a solo iconos, y expandir los restaura', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />);

    const nombreInicio = () => screen.getByRole('link', { name: 'Inicio' }).querySelector('span')!;

    expect(nombreInicio()).not.toHaveClass('sr-only');

    fireEvent.click(screen.getByRole('button', { name: 'Colapsar menú' }));

    expect(screen.getByRole('button', { name: 'Expandir menú' })).toBeInTheDocument();
    expect(nombreInicio()).toHaveClass('sr-only');

    fireEvent.click(screen.getByRole('button', { name: 'Expandir menú' }));

    expect(screen.getByRole('button', { name: 'Colapsar menú' })).toBeInTheDocument();
    expect(nombreInicio()).not.toHaveClass('sr-only');
  });

  it('H2-E3: con el menú colapsado, enfocar un icono muestra su nombre en un tooltip', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />);

    fireEvent.click(screen.getByRole('button', { name: 'Colapsar menú' }));
    fireEvent.focus(screen.getByRole('link', { name: 'Inicio' }));

    expect(screen.getByRole('tooltip')).toHaveTextContent('Inicio');
  });

  it('H2-E4: con el menú colapsado, si la ruta activa es una subsección la sección contenedora se marca activa', () => {
    resetearUiStore();
    useUiStore.setState({ sidebarColapsado: true });
    renderConProveedores(<Sidebar />, { initialEntries: ['/comercial/clientes'] });

    // Colapsado no se muestran subsecciones (sin icono propio): solo existe
    // el enlace de primer nivel "Comercial", que debe quedar marcado activo.
    expect(screen.queryByRole('link', { name: 'Clientes' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Comercial' })).toHaveAttribute('aria-current', 'page');
  });

  it('H2-E5: el colapso del menú sobrevive a un cambio de sección (navegación)', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />, { initialEntries: ['/'] });

    fireEvent.click(screen.getByRole('button', { name: 'Colapsar menú' }));
    expect(screen.getByRole('button', { name: 'Expandir menú' })).toBeInTheDocument();

    // Navegar a otra sección sin subsecciones no debe expandir el menú de nuevo.
    fireEvent.click(screen.getByRole('link', { name: 'Almacén' }));

    expect(screen.getByRole('link', { name: 'Almacén' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Expandir menú' })).toBeInTheDocument();
  });

  it('H7-E19: la sección activa se marca con aria-current y un indicador visual además del color', () => {
    resetearUiStore();
    renderConProveedores(<Sidebar />, { initialEntries: ['/'] });

    const inicio = screen.getByRole('link', { name: 'Inicio' });
    expect(inicio).toHaveAttribute('aria-current', 'page');
    // La marca no depende solo del tinte de fondo (RN-34): también lleva una
    // barra indicadora a la izquierda (`border-primary`).
    expect(inicio.className).toContain('border-primary');
  });

  it('H2-E6: `useUiStore` no usa `persist` (A-3) — un módulo nuevo siempre arranca con el sidebar expandido', async () => {
    useUiStore.setState({ sidebarColapsado: true });
    expect(useUiStore.getState().sidebarColapsado).toBe(true);

    vi.resetModules();
    const { useUiStore: storeRecienCargado } = await import('@/stores/useUiStore');

    // Un módulo recién cargado (equivalente a recargar la página) siempre
    // arranca con el valor inicial: sin `persist`, nada restaura el colapso.
    expect(storeRecienCargado.getState().sidebarColapsado).toBe(false);

    resetearUiStore();
  });
});
