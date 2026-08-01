/**
 * Pruebas de `PanelNotificaciones` (U-5, T8.6): apertura de la campana
 * (H5-E6), los tres avisos de ejemplo con su texto literal exacto
 * (H5-E7…H5-E10, AF-11), que elegir un aviso no lo marca como leído ni lo
 * quita del panel (H5-E11, AF-13), y el cierre del panel tanto por clic
 * fuera (H5-E12) como por la tecla Escape (H7-E16).
 *
 * No se reinventa el wrapper de proveedores: se usa `renderConProveedores`
 * (T8.1) porque `PanelNotificaciones` depende del `useUiStore` real (sin
 * mock) para reflejar el enum `panelAbierto` tal como ocurre en la app.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';

import { renderConProveedores } from '@/test/utils';
import { useUiStore } from '@/stores/useUiStore';
import { notificacionesMock } from '@/features/notificaciones/data/notificaciones.mock';

import { PanelNotificaciones } from '../PanelNotificaciones';

/** Vuelve el store de UI a su estado inicial entre tests (evita fuga entre casos). */
function resetearUiStore() {
  useUiStore.setState({
    sidebarColapsado: false,
    menuMovilAbierto: false,
    panelAbierto: 'ninguno',
  });
}

/**
 * El disparador de `DropdownMenu` (Radix) abre el panel en `onPointerDown`,
 * no en `onClick` (`@radix-ui/react-dropdown-menu`) — así también responde a
 * touch, no sólo a mouse. `fireEvent.click` no alcanza para abrirlo.
 */
function abrirPanel(disparador: HTMLElement) {
  fireEvent.pointerDown(disparador, { button: 0, ctrlKey: false });
}

describe('PanelNotificaciones', () => {
  it('H5-E6: la campana abre el panel de notificaciones', () => {
    resetearUiStore();
    renderConProveedores(<PanelNotificaciones />);

    expect(screen.queryByRole('menu', { name: 'Notificaciones' })).not.toBeInTheDocument();

    abrirPanel(screen.getByRole('button', { name: 'Notificaciones' }));

    expect(screen.getByRole('menu', { name: 'Notificaciones' })).toBeInTheDocument();
    expect(useUiStore.getState().panelAbierto).toBe('notificaciones');
  });

  it('H5-E7…H5-E10: muestra los tres avisos de ejemplo con su texto literal exacto, en orden', () => {
    resetearUiStore();
    renderConProveedores(<PanelNotificaciones />);

    abrirPanel(screen.getByRole('button', { name: 'Notificaciones' }));

    const panel = screen.getByRole('menu', { name: 'Notificaciones' });
    const avisos = within(panel).getAllByRole('menuitem');

    expect(avisos).toHaveLength(3);
    expect(notificacionesMock).toHaveLength(3);
    avisos.forEach((aviso, indice) => {
      expect(aviso).toHaveTextContent(notificacionesMock[indice].mensaje);
    });
  });

  it('H5-E11 / AF-13: elegir un aviso no lo marca como leído ni lo quita del panel', () => {
    resetearUiStore();
    renderConProveedores(<PanelNotificaciones />);

    abrirPanel(screen.getByRole('button', { name: 'Notificaciones' }));

    const panel = screen.getByRole('menu', { name: 'Notificaciones' });
    const primerAviso = within(panel).getAllByRole('menuitem')[0];

    fireEvent.click(primerAviso);

    // El panel sigue abierto y sigue mostrando los mismos tres avisos: elegir
    // un aviso no es una acción de navegación (AF-13).
    expect(screen.getByRole('menu', { name: 'Notificaciones' })).toBeInTheDocument();
    expect(useUiStore.getState().panelAbierto).toBe('notificaciones');
    const avisosDespues = within(screen.getByRole('menu', { name: 'Notificaciones' })).getAllByRole(
      'menuitem',
    );
    expect(avisosDespues).toHaveLength(3);
    notificacionesMock.forEach((aviso) => {
      expect(screen.getByText(aviso.mensaje)).toBeInTheDocument();
    });
  });

  it('H5-E12: el panel se cierra al hacer clic fuera de él', async () => {
    resetearUiStore();
    renderConProveedores(<PanelNotificaciones />);

    abrirPanel(screen.getByRole('button', { name: 'Notificaciones' }));
    expect(screen.getByRole('menu', { name: 'Notificaciones' })).toBeInTheDocument();

    // El `DismissableLayer` de Radix registra su listener de `pointerdown`
    // recién en un `setTimeout(0)` posterior a abrirse (evita reaccionar al
    // mismo evento que lo abrió). Se deja correr ese tick antes de simular
    // el clic fuera.
    await new Promise((resolver) => setTimeout(resolver, 0));

    // Clic fuera del panel: el `DismissableLayer` de Radix difiere el cierre
    // del `pointerdown` (botón izquierdo) hasta el `click` que le sigue —
    // así un usuario real puede arrastrar desde dentro del panel sin
    // cerrarlo por accidente. Un clic real dispara ambos eventos en secuencia.
    fireEvent.pointerDown(document.body, { button: 0 });
    fireEvent.click(document.body);

    expect(screen.queryByRole('menu', { name: 'Notificaciones' })).not.toBeInTheDocument();
    expect(useUiStore.getState().panelAbierto).toBe('ninguno');
  });

  it('H7-E16: el panel se cierra con la tecla Escape', () => {
    resetearUiStore();
    renderConProveedores(<PanelNotificaciones />);

    abrirPanel(screen.getByRole('button', { name: 'Notificaciones' }));
    const panel = screen.getByRole('menu', { name: 'Notificaciones' });
    expect(panel).toBeInTheDocument();

    fireEvent.keyDown(panel, { key: 'Escape' });

    expect(screen.queryByRole('menu', { name: 'Notificaciones' })).not.toBeInTheDocument();
    expect(useUiStore.getState().panelAbierto).toBe('ninguno');
  });
});
