/**
 * Pruebas de `Topbar` (U-3, T8.4): título derivado de la sección activa
 * (H1-E6), presencia del título también en secciones sin pantalla propia
 * (H1-E13), exclusión mutua de los paneles flotantes vía `useUiStore`
 * (H5-E13, A-4) y presencia de la Topbar en cualquier sección del sistema
 * (H5-E14).
 *
 * No se reinventa el wrapper de proveedores: se usa `renderConProveedores`
 * (T8.1) porque `Topbar` depende de `useLocation` (ruta activa) y del
 * `useUiStore` real (sin mock) para ejercitar la exclusión mutua tal como
 * ocurre en la app.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';

import { renderConProveedores } from '@/test/utils';
import { useUiStore } from '@/stores/useUiStore';
import { notificacionesMock } from '@/features/notificaciones/data/notificaciones.mock';

import { Topbar } from '../Topbar';

/** Vuelve el store de UI a su estado inicial entre tests (evita fuga entre casos). */
function resetearUiStore() {
  useUiStore.setState({
    sidebarColapsado: false,
    menuMovilAbierto: false,
    panelAbierto: 'ninguno',
  });
}

/**
 * Los disparadores de `DropdownMenu` (Radix) abren el panel en `onPointerDown`,
 * no en `onClick` (`@radix-ui/react-dropdown-menu`) — así también responden a
 * touch, no sólo a mouse. `fireEvent.click` no alcanza para abrirlo.
 */
function abrirDropdown(disparador: HTMLElement) {
  fireEvent.pointerDown(disparador, { button: 0, ctrlKey: false });
}

describe('Topbar', () => {
  it('H1-E6: muestra "Inicio" como título cuando la ruta activa es la Home', () => {
    resetearUiStore();
    renderConProveedores(<Topbar />, { initialEntries: ['/'] });

    expect(screen.getByRole('heading', { level: 1, name: 'Inicio' })).toBeInTheDocument();
  });

  it('H1-E6: muestra el nombre de la subsección activa (no el de la sección padre)', () => {
    resetearUiStore();
    renderConProveedores(<Topbar />, { initialEntries: ['/comercial/clientes'] });

    expect(screen.getByRole('heading', { level: 1, name: 'Clientes' })).toBeInTheDocument();
  });

  it('H1-E13 / H5-E14: la Topbar (con su título correcto) está presente en una sección sin pantalla propia', () => {
    resetearUiStore();
    renderConProveedores(<Topbar />, { initialEntries: ['/reportes'] });

    // La topbar es el único <header> del shell (RN-2): sigue presente aunque
    // la sección elegida no tenga pantalla propia en esta entrega.
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Reportes' })).toBeInTheDocument();
  });

  it.each([
    ['/', 'Inicio'],
    ['/almacen', 'Almacén'],
    ['/configuracion', 'Configuración'],
    ['/packing/despachos', 'Despachos'],
  ])(
    'H5-E14: la Topbar está presente en %s con su título propio',
    (ruta, tituloEsperado) => {
      resetearUiStore();
      renderConProveedores(<Topbar />, { initialEntries: [ruta] });

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 1, name: tituloEsperado }),
      ).toBeInTheDocument();
    },
  );

  it('H5-E13: abrir el panel de notificaciones cierra el menú de usuario si estaba abierto', () => {
    resetearUiStore();
    renderConProveedores(<Topbar />, { initialEntries: ['/'] });

    // Se capturan ambos disparadores ANTES de interactuar: mientras un
    // `DropdownMenu` (Radix) está abierto, marca `aria-hidden` al resto del
    // árbol para lectores de pantalla (correcto para accesibilidad), lo que
    // sacaría al otro botón de una consulta `getByRole` posterior.
    const botonUsuario = screen.getByRole('button', { name: /menú de usuario/i });
    const botonNotificaciones = screen.getByRole('button', { name: 'Notificaciones' });

    abrirDropdown(botonUsuario);

    // El menú de usuario quedó abierto: sus opciones son visibles.
    expect(screen.getByRole('menuitem', { name: 'Mi perfil' })).toBeInTheDocument();
    expect(useUiStore.getState().panelAbierto).toBe('usuario');

    abrirDropdown(botonNotificaciones);

    // Exclusión mutua estructural (A-4): al abrir notificaciones, el enum
    // pasa a 'notificaciones' y el menú de usuario deja de estar montado.
    expect(useUiStore.getState().panelAbierto).toBe('notificaciones');
    expect(screen.queryByRole('menuitem', { name: 'Mi perfil' })).not.toBeInTheDocument();

    const panelNotificaciones = screen.getByRole('menu', { name: 'Notificaciones' });
    expect(
      within(panelNotificaciones).getByText(notificacionesMock[0].mensaje),
    ).toBeInTheDocument();
  });

  it('H5-E13: abrir el menú de usuario cierra el panel de notificaciones si estaba abierto', () => {
    resetearUiStore();
    renderConProveedores(<Topbar />, { initialEntries: ['/'] });

    const botonNotificaciones = screen.getByRole('button', { name: 'Notificaciones' });
    const botonUsuario = screen.getByRole('button', { name: /menú de usuario/i });

    abrirDropdown(botonNotificaciones);

    expect(useUiStore.getState().panelAbierto).toBe('notificaciones');
    expect(screen.getByText(notificacionesMock[0].mensaje)).toBeInTheDocument();

    abrirDropdown(botonUsuario);

    expect(useUiStore.getState().panelAbierto).toBe('usuario');
    expect(screen.queryByText(notificacionesMock[0].mensaje)).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Mi perfil' })).toBeInTheDocument();
  });

  it('H5-E13: el enum de useUiStore nunca representa ambos paneles abiertos a la vez (solo "ninguno" antes de interactuar)', () => {
    resetearUiStore();
    renderConProveedores(<Topbar />, { initialEntries: ['/'] });

    expect(useUiStore.getState().panelAbierto).toBe('ninguno');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
