/**
 * Pruebas del recorrido por teclado del shell (T8.10): orden de tabulación
 * completo (H7-E9…H7-E14, AF-15), activación de una sección con Enter
 * (H7-E15), la marca de sección activa sin depender solo del color (H7-E19),
 * el foco visible (H7-E20) y el anuncio de cambio de pantalla a lectores de
 * pantalla (H7-E21).
 *
 * Se ejercita `AppLayout` (T5.13) completo — no una pieza aislada — porque el
 * orden de tabulación es una propiedad del ensamblado (Sidebar + Topbar +
 * Breadcrumb + área de contenido), no de un componente por separado.
 *
 * Dos decisiones de test documentadas acá (no son bugs, son límites de jsdom):
 *
 * 1. **Sin librería de simulación de Tab** (nota de T8.10 en tasks.md):
 *    `@testing-library/user-event` no está instalado (`package.json`
 *    verificado). El orden se valida sobre el orden real de
 *    `document.querySelectorAll` de elementos focosables — como el shell
 *    nunca usa `tabindex` positivos (A-8), ese orden del DOM ES el orden de
 *    tabulación real en un navegador. Además, cada elemento del orden
 *    esperado se enfoca con `.focus()` y se confirma con `toHaveFocus()`:
 *    no alcanza con que matcheen el selector, tienen que ser focosables de
 *    verdad.
 *
 * 2. **El botón "Abrir menú" (T5.11, sólo teléfono, `md:hidden`) se excluye a
 *    mano del orden de escritorio**: jsdom no aplica `@media` sobre el CSS
 *    real (no implementa layout ni `matchMedia` nativo — por eso
 *    `src/test/setup.ts` lo mockea a mano), así que ese botón seguiría
 *    apareciendo en `querySelectorAll` aunque en un navegador real, a
 *    1440 px, esté oculto y sea inalcanzable con Tab. H7-E9…H7-E14 describen
 *    explícitamente el recorrido en una pantalla de 1440 px (AF-15), así que
 *    se filtra por su `aria-label` en vez de fingir que jsdom sabe ocultarlo.
 *
 * H7-E15 (Enter activa la sección enfocada): `SidebarSeccion` (T5.4) renderiza
 * un `<a href>` plano (react-router `Link`). Por semántica nativa de HTML,
 * Enter sobre un enlace enfocado dispara su `click` — comportamiento del
 * navegador que jsdom NO reproduce solo al despachar un `keydown` sintético
 * (verificado directamente con jsdom: un `keydown` de Enter sobre un `<a>` no
 * dispara `click` por sí solo). Se dispara el `click` que Enter produce en un
 * navegador real para validar el efecto de la activación — no se finge haber
 * simulado la tecla.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router';

import { renderConProveedores } from '@/test/utils';
import { useUiStore } from '@/stores/useUiStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { InicioPage } from '@/pages/InicioPage';
import { SeccionEnConstruccionPage } from '@/pages/SeccionEnConstruccionPage';

/** Vuelve el store de UI a su estado inicial entre tests (evita fuga entre casos). */
function resetearUiStore() {
  useUiStore.setState({
    sidebarColapsado: false,
    menuMovilAbierto: false,
    panelAbierto: 'ninguno',
  });
}

const SELECTOR_FOCOSABLES =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]';

/** Elementos focosables del documento en el orden real del DOM (A-8: el
 * shell nunca usa `tabindex` positivos, así que este orden ES el orden de
 * tabulación real). */
function obtenerFocosables(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTOR_FOCOSABLES));
}

/** Igual que `obtenerFocosables`, pero sin el botón "Abrir menú" de la Topbar
 * (T5.11): sólo existe para teléfono (`md:hidden`) y jsdom no sabe ocultarlo
 * por CSS — ver punto 2 del comentario de cabecera. */
function obtenerFocosablesDeEscritorio(): HTMLElement[] {
  return obtenerFocosables().filter(
    (elemento) => elemento.getAttribute('aria-label') !== 'Abrir menú',
  );
}

/** Nombre accesible aproximado de un elemento: `aria-label` si existe, si no
 * su texto visible (alcanza para distinguir cada control del shell, que no
 * repite nombres). */
function nombreAccesible(elemento: HTMLElement): string {
  return elemento.getAttribute('aria-label') ?? elemento.textContent?.trim() ?? '';
}

/** Shell completo con un contenido de prueba en el `<Outlet />` (en vez de
 * `InicioPage` real): la pantalla Inicio, en sus 4 estados (T6.2), nunca
 * tiene un elemento focosable en el área de contenido (ni siquiera "Reintentar",
 * que sólo aparece en el estado de error) — así que no sirve para probar
 * H7-E14 ("Tab llega al primer elemento del área de contenido"). Este test
 * cubre el contrato del shell (T5.13: Sidebar → Topbar → Breadcrumb → `<main>`),
 * no el contenido de negocio de Inicio (eso ya lo cubre T8.8).
 */
function renderShellConContenidoDePrueba() {
  return renderConProveedores(
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={<button type="button">Contenido de la pantalla</button>}
        />
      </Route>
    </Routes>,
  );
}

/** Shell con las mismas rutas reales de `src/app/router.tsx` (T7.2): lo usan
 * los tests que necesitan navegar de verdad entre pantallas (H7-E15, H7-E19,
 * H7-E21). */
function renderShellConRutasReales(initialEntries: string[]) {
  return renderConProveedores(
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<InicioPage />} />
        <Route path="comercial/ordenes" element={<SeccionEnConstruccionPage />} />
        <Route path="comercial/clientes" element={<SeccionEnConstruccionPage />} />
        <Route path="packing/lotes" element={<SeccionEnConstruccionPage />} />
        <Route path="packing/despachos" element={<SeccionEnConstruccionPage />} />
        <Route path="almacen" element={<SeccionEnConstruccionPage />} />
        <Route path="reportes" element={<SeccionEnConstruccionPage />} />
        <Route path="configuracion" element={<SeccionEnConstruccionPage />} />
      </Route>
    </Routes>,
    { initialEntries },
  );
}

describe('Navegación por teclado del shell (T8.10)', () => {
  it('H7-E9…H7-E14 / AF-15: el orden de tabulación es colapsar → las 6 secciones → tema → campana → avatar → contenido', () => {
    resetearUiStore();
    renderShellConContenidoDePrueba();

    const focosables = obtenerFocosablesDeEscritorio();
    const nombres = focosables.map(nombreAccesible);

    expect(nombres).toEqual([
      'Colapsar menú', // H7-E9
      'Inicio', // H7-E10
      'Comercial',
      'Packing',
      'Almacén',
      'Reportes',
      'Configuración', // fin de las secciones (AF-15)
      'Cambiar a tema oscuro', // H7-E11
      'Notificaciones', // H7-E12
      'Alfredo Anchante, menú de usuario', // H7-E13
      'Contenido de la pantalla', // H7-E14
    ]);

    // No alcanza con que matcheen el selector: cada uno tiene que ser
    // focosable de verdad, en ese mismo orden.
    focosables.forEach((elemento) => {
      elemento.focus();
      expect(elemento).toHaveFocus();
    });
  });

  it('A-8: ningún elemento focosable del shell usa un tabindex positivo', () => {
    resetearUiStore();
    renderShellConContenidoDePrueba();

    obtenerFocosablesDeEscritorio().forEach((elemento) => {
      const tabIndexAttr = elemento.getAttribute('tabindex');
      if (tabIndexAttr !== null) {
        expect(Number(tabIndexAttr)).toBeLessThanOrEqual(0);
      }
    });
  });

  it('H7-E15: activar (Enter) la sección "Reportes" enfocada actualiza el título de la barra superior', () => {
    resetearUiStore();
    renderShellConRutasReales(['/almacen']);

    const enlaceReportes = screen.getByRole('link', { name: 'Reportes' });
    enlaceReportes.focus();
    expect(enlaceReportes).toHaveFocus();

    // Ver comentario de cabecera: `click` es el efecto que Enter produce en
    // un `<a>` enfocado en un navegador real; jsdom no lo dispara solo.
    fireEvent.click(enlaceReportes);

    expect(screen.getByRole('heading', { level: 1, name: 'Reportes' })).toBeInTheDocument();
  });

  it('H7-E19: la sección activa se distingue con aria-current y una barra indicadora, no solo con color (RN-34)', () => {
    resetearUiStore();
    renderShellConRutasReales(['/almacen']);

    const enlaceAlmacen = screen.getByRole('link', { name: 'Almacén' });

    expect(enlaceAlmacen).toHaveAttribute('aria-current', 'page');
    expect(enlaceAlmacen.className).toContain('border-primary');
  });

  it('H7-E20: el elemento enfocado (la campana) conserva el anillo de foco por token del sistema de diseño', () => {
    resetearUiStore();
    renderShellConRutasReales(['/']);

    const campana = screen.getByRole('button', { name: 'Notificaciones' });
    campana.focus();

    expect(campana).toHaveFocus();
    // Anillo de foco por token (T5.2, `button.tsx`, `buttonVariants` base):
    // compartido por todos los controles del shell, no un `outline` propio.
    expect(campana.className).toContain('focus-visible:border-ring');
    expect(campana.className).toContain('focus-visible:ring-ring/50');
  });

  it('H7-E21: al elegir "Comercial" (que navega a "Órdenes", AF-21) el lector de pantalla anuncia el nuevo título', () => {
    resetearUiStore();
    renderShellConRutasReales(['/']);

    expect(screen.getByRole('status')).toHaveTextContent('Inicio');

    fireEvent.click(screen.getByRole('link', { name: 'Comercial' }));

    expect(screen.getByRole('status')).toHaveTextContent('Órdenes');
  });
});
