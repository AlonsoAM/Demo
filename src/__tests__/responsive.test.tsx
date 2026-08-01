/**
 * Pruebas de comportamiento responsive del shell (U-10, T8.11): sin scroll
 * horizontal en los dos anchos de referencia (H7-E1, H7-E2, RN-30), el menú
 * deslizable de teléfono (H7-E4…H7-E6, H7-E18, RN-31, RN-32) y la disposición
 * de las tarjetas de indicador (H7-E7, H7-E8).
 *
 * jsdom no evalúa `@media` sobre CSS real (no implementa layout ni cascada de
 * estilos) — la misma limitación documentada en la cabecera de
 * `navegacion-teclado.test.tsx` (T8.10). Las clases de Tailwind que fijan
 * overflow/columnas son estáticas en el JSX: no se activan o desactivan según
 * el ancho simulado. Por eso este archivo verifica la garantía estructural
 * (las clases correctas están presentes en el árbol) bajo cada ancho, usando
 * `mockViewportWidth` (T1.7, `src/test/setup.ts`) para dejar explícito bajo
 * qué ancho se afirma cada caso — tal como pide la nota de T8.11 en
 * `tasks.md`. El cero-scroll real a 360 px lo confirma además el smoke de
 * navegador de Verify (S-1), fuera del alcance de este archivo.
 */
import { afterEach, describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';

import { renderConProveedores } from '@/test/utils';
import { mockViewportWidth } from '@/test/setup';
import { useUiStore } from '@/stores/useUiStore';

import { AppLayout } from '@/components/layout/AppLayout';
import { SidebarMovil } from '@/components/layout/SidebarMovil';
import { GrillaIndicadores } from '@/features/dashboard/components/GrillaIndicadores';

/** Vuelve el store de UI a su estado inicial entre tests (evita fuga entre casos). */
function resetearUiStore() {
  useUiStore.setState({
    sidebarColapsado: false,
    menuMovilAbierto: false,
    panelAbierto: 'ninguno',
  });
}

afterEach(() => {
  resetearUiStore();
});

describe('Comportamiento responsive del shell (T8.11)', () => {
  it.each([360, 1440])(
    'H7-E1, H7-E2, RN-30: el shell no scrollea horizontalmente a %ipx',
    (ancho) => {
      resetearUiStore();
      mockViewportWidth(ancho);
      const { container } = renderConProveedores(<AppLayout />);

      // Raíz del shell (T5.13): `overflow-hidden` en ambos ejes, así el
      // documento nunca desarrolla su propio scroll.
      const raiz = container.firstElementChild as HTMLElement;
      expect(raiz).toHaveClass('overflow-hidden');

      // El único contenedor que scrollea es `<main>`, y solo en el eje Y:
      // `overflow-x-hidden` explícito (nunca `overflow-auto`, que aplica a
      // ambos ejes) es lo que garantiza cero scroll horizontal sin importar
      // el ancho.
      const main = screen.getByRole('main');
      expect(main).toHaveClass('overflow-x-hidden');
      expect(main).toHaveClass('overflow-y-auto');
    },
  );

  it('H7-E3: el sidebar de escritorio se oculta bajo el breakpoint de escritorio', () => {
    resetearUiStore();
    mockViewportWidth(360);
    renderConProveedores(<AppLayout />);

    const aside = screen.getByRole('complementary', { name: 'Menú principal' });
    // `hidden md:flex` (T5.5): oculto por defecto, visible recién desde el
    // breakpoint de escritorio — en teléfono el sidebar de escritorio no
    // ocupa espacio ni es alcanzable (H7-E3).
    expect(aside).toHaveClass('hidden');
    expect(aside).toHaveClass('md:flex');
  });

  it('H7-E4, RN-31: en teléfono el menú se abre como panel deslizable sobre el contenido', () => {
    resetearUiStore();
    mockViewportWidth(360);
    useUiStore.setState({ menuMovilAbierto: true });
    renderConProveedores(<SidebarMovil />);

    const panel = screen.getByRole('dialog', { name: 'Menú principal' });
    expect(panel).toBeInTheDocument();
    expect(within(panel).getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
  });

  it('H7-E5, RN-32: elegir una sección cierra el menú deslizable', () => {
    resetearUiStore();
    mockViewportWidth(360);
    useUiStore.setState({ menuMovilAbierto: true });
    renderConProveedores(<SidebarMovil />);

    fireEvent.click(screen.getByRole('link', { name: 'Almacén' }));

    expect(useUiStore.getState().menuMovilAbierto).toBe(false);
  });

  it('H7-E6: el menú deslizable se cierra al tocar fuera de él', async () => {
    resetearUiStore();
    mockViewportWidth(360);
    useUiStore.setState({ menuMovilAbierto: true });
    renderConProveedores(<SidebarMovil />);

    expect(screen.getByRole('dialog', { name: 'Menú principal' })).toBeInTheDocument();

    // Igual que en `PanelNotificaciones` (U-5): el `DismissableLayer` de Radix
    // registra su listener de `pointerdown` recién en un `setTimeout(0)`
    // posterior a abrirse, y difiere el cierre hasta el `click` que le sigue.
    await new Promise((resolver) => setTimeout(resolver, 0));
    fireEvent.pointerDown(document.body, { button: 0 });
    fireEvent.click(document.body);

    expect(screen.queryByRole('dialog', { name: 'Menú principal' })).not.toBeInTheDocument();
    expect(useUiStore.getState().menuMovilAbierto).toBe(false);
  });

  it('H7-E18: el menú deslizable se cierra con la tecla Escape', () => {
    resetearUiStore();
    mockViewportWidth(360);
    useUiStore.setState({ menuMovilAbierto: true });
    renderConProveedores(<SidebarMovil />);

    const panel = screen.getByRole('dialog', { name: 'Menú principal' });
    fireEvent.keyDown(panel, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Menú principal' })).not.toBeInTheDocument();
    expect(useUiStore.getState().menuMovilAbierto).toBe(false);
  });

  it.each([360, 1440])(
    'H7-E7, H7-E8: la grilla de indicadores lleva las clases de una columna en móvil y una fila en escritorio (%ipx)',
    (ancho) => {
      mockViewportWidth(ancho);
      const { container } = renderConProveedores(<GrillaIndicadores />);

      const grilla = container.firstElementChild as HTMLElement;
      // Una columna por defecto (móvil, H7-E7) y las 4 en una sola fila desde
      // `md:` (escritorio, H7-E8) — mismo breakpoint que oculta/muestra la
      // navegación, para que ambos quiebres coincidan.
      expect(grilla).toHaveClass('grid-cols-1');
      expect(grilla).toHaveClass('md:grid-cols-4');
    },
  );
});
