import { describe, expect, it } from 'vitest';

import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { renderConProveedores, screen } from '@/test/utils';

/**
 * Pruebas de `Breadcrumb` (T8.3): las tres profundidades de la ruta de
 * navegación (1, 2 y 3 niveles) y el comportamiento de cada nivel — cuál
 * navega y cuál es inerte (H1-E7…H1-E9, H2-E7…H2-E9, RN-4, RN-5, RN-12).
 *
 * `Breadcrumb` lee la ruta activa vía `useLocation()`, así que cada caso se
 * monta con `initialEntries` distinto (no hay navegación real de usuario que
 * simular; el "Cuando" del escenario ya está resuelto por la ruta activa).
 */
describe('Breadcrumb', () => {
  // H1-E9 — Inicio: un solo nivel, inerte (es la pantalla actual).
  it('U2.1 — en Inicio muestra un solo nivel "Inicio" y no es un enlace', () => {
    renderConProveedores(<Breadcrumb />, { initialEntries: ['/'] });

    const nivel = screen.getByText('Inicio');
    expect(nivel).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(nivel).toHaveAttribute('aria-current', 'page');
  });

  // H1-E8 / RN-5 — sección sin subsecciones: dos niveles, "Inicio / Almacén".
  it('U2.2 — en una sección sin subsecciones (Almacén) muestra "Inicio / Almacén" con Inicio navegable', () => {
    renderConProveedores(<Breadcrumb />, { initialEntries: ['/almacen'] });

    expect(screen.getByText('Almacén')).toBeInTheDocument();

    const enlaceInicio = screen.getByRole('link', { name: 'Inicio' });
    expect(enlaceInicio).toHaveAttribute('href', '/');

    // H2-E9 — el último nivel indica la pantalla actual.
    const ultimoNivel = screen.getByText('Almacén');
    expect(ultimoNivel).toHaveAttribute('aria-current', 'page');
  });

  // H1-E7 / RN-4 — subsección: tres niveles, "Inicio / Comercial / Órdenes".
  it('U2.3 — en una subsección (Comercial / Órdenes) muestra los tres niveles completos', () => {
    renderConProveedores(<Breadcrumb />, { initialEntries: ['/comercial/ordenes'] });

    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Comercial')).toBeInTheDocument();
    expect(screen.getByText('Órdenes')).toBeInTheDocument();
  });

  // H2-E7 — el primer nivel ("Inicio") es el único que navega.
  it('U2.4 — el primer nivel "Inicio" es un enlace a la raíz', () => {
    renderConProveedores(<Breadcrumb />, { initialEntries: ['/comercial/clientes'] });

    const enlaceInicio = screen.getByRole('link', { name: 'Inicio' });
    expect(enlaceInicio).toHaveAttribute('href', '/');
  });

  // H2-E8 / RN-12 / AF-21 — el nivel intermedio ("Comercial") no tiene pantalla propia y no navega.
  it('U2.5 — el nivel intermedio "Comercial" no es un enlace', () => {
    renderConProveedores(<Breadcrumb />, { initialEntries: ['/comercial/ordenes'] });

    const nivelIntermedio = screen.getByText('Comercial');
    expect(nivelIntermedio.tagName).not.toBe('A');
    expect(screen.queryByRole('link', { name: 'Comercial' })).not.toBeInTheDocument();
  });

  // H2-E9 — el último nivel (pantalla actual) tampoco navega, a diferencia del primero.
  it('U2.6 — el último nivel (pantalla actual, Despachos) no es un enlace y queda marcado como página actual', () => {
    renderConProveedores(<Breadcrumb />, { initialEntries: ['/packing/despachos'] });

    const ultimoNivel = screen.getByText('Despachos');
    expect(ultimoNivel.tagName).not.toBe('A');
    expect(ultimoNivel).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'Despachos' })).not.toBeInTheDocument();
  });
});
