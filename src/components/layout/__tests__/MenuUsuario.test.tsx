/**
 * Pruebas de `MenuUsuario` (U-4, T8.5): nombre de ejemplo del avatar (H5-E1),
 * las dos opciones del dropdown (H5-E2), los avisos honestos de cada una
 * (H5-E3, H5-E5) leídos de la misma constante que el componente
 * (`textosMenuUsuario`, `src/lib/textos.ts`), que ninguna opción navega ni
 * limpia estado ajeno — no saca al usuario del sistema (H5-E4, RN-23,
 * RN-24) — y que Escape cierra el panel devolviendo el foco al disparador,
 * comportamiento de `DismissableLayer`/`FocusScope` de Radix (H7-E17).
 *
 * Se usa `renderConProveedores` (T8.1) porque `MenuUsuario` depende del
 * `useUiStore` real (sin mock) para la exclusión mutua de paneles y del
 * `MemoryRouter` para poder leer `useLocation` y confirmar que no hay
 * navegación (H5-E4).
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useLocation } from 'react-router';

import { renderConProveedores } from '@/test/utils';
import { useUiStore } from '@/stores/useUiStore';
import { textosMenuUsuario } from '@/lib/textos';

import { MenuUsuario } from '../MenuUsuario';

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
 * no en `onClick` (`@radix-ui/react-dropdown-menu`). `fireEvent.click` no
 * alcanza para abrirlo (nota heredada de T8.2/T8.4).
 */
function abrirDropdown(disparador: HTMLElement) {
  fireEvent.pointerDown(disparador, { button: 0, ctrlKey: false });
}

/** Muestra la ruta activa del `MemoryRouter` para poder afirmar que no cambió (H5-E4). */
function RutaActiva() {
  const location = useLocation();
  return <p data-testid="ruta-activa">{location.pathname}</p>;
}

describe('MenuUsuario', () => {
  it('H5-E1: muestra el nombre de ejemplo en el disparador de la barra superior', () => {
    resetearUiStore();
    renderConProveedores(<MenuUsuario />);

    const boton = screen.getByRole('button', { name: /alfredo anchante, menú de usuario/i });
    expect(boton).toBeInTheDocument();
    expect(boton).toHaveTextContent('Alfredo Anchante');
  });

  it('H5-E2: el dropdown ofrece exactamente las dos opciones "Mi perfil" y "Cerrar sesión"', () => {
    resetearUiStore();
    renderConProveedores(<MenuUsuario />);

    abrirDropdown(screen.getByRole('button', { name: /menú de usuario/i }));

    const opciones = screen.getAllByRole('menuitem');
    expect(opciones).toHaveLength(2);
    expect(screen.getByRole('menuitem', { name: 'Mi perfil' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Cerrar sesión' })).toBeInTheDocument();
  });

  it('H5-E3: elegir "Cerrar sesión" muestra el aviso honesto exacto de textos.ts', () => {
    resetearUiStore();
    renderConProveedores(<MenuUsuario />);

    abrirDropdown(screen.getByRole('button', { name: /menú de usuario/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Cerrar sesión' }));

    const aviso = screen.getByRole('status');
    expect(aviso).toHaveTextContent(textosMenuUsuario.cerrarSesion);
  });

  it('H5-E5: elegir "Mi perfil" muestra el aviso honesto exacto de textos.ts', () => {
    resetearUiStore();
    renderConProveedores(<MenuUsuario />);

    abrirDropdown(screen.getByRole('button', { name: /menú de usuario/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Mi perfil' }));

    const aviso = screen.getByRole('status');
    expect(aviso).toHaveTextContent(textosMenuUsuario.miPerfil);
  });

  it('H5-E4: elegir "Cerrar sesión" no navega ni limpia estado ajeno — el usuario sigue en el sistema', () => {
    resetearUiStore();
    useUiStore.setState({ sidebarColapsado: true });

    renderConProveedores(
      <>
        <RutaActiva />
        <MenuUsuario />
      </>,
      { initialEntries: ['/comercial/clientes'] },
    );

    expect(screen.getByTestId('ruta-activa')).toHaveTextContent('/comercial/clientes');

    abrirDropdown(screen.getByRole('button', { name: /menú de usuario/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Cerrar sesión' }));

    // Sigue en la misma ruta: ninguna navegación real ocurrió.
    expect(screen.getByTestId('ruta-activa')).toHaveTextContent('/comercial/clientes');
    // El disparador (y por lo tanto el usuario "logueado" de ejemplo) sigue presente.
    expect(screen.getByRole('button', { name: /menú de usuario/i })).toBeInTheDocument();
    // Estado ajeno del store (sidebar) no fue tocado por la selección.
    expect(useUiStore.getState().sidebarColapsado).toBe(true);
  });

  it('H7-E17: Escape cierra el menú y devuelve el foco al disparador', async () => {
    resetearUiStore();
    renderConProveedores(<MenuUsuario />);

    const boton = screen.getByRole('button', { name: /menú de usuario/i });
    abrirDropdown(boton);

    expect(screen.getByRole('menuitem', { name: 'Mi perfil' })).toBeInTheDocument();

    // El `aria-labelledby` que agrega Radix al contenido tiene precedencia
    // sobre el `aria-label="Menú de usuario"` del componente en el cálculo
    // del nombre accesible (queda "Alfredo Anchante, menú de usuario", el
    // mismo del disparador) — se busca por rol sin filtrar por nombre.
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menuitem', { name: 'Mi perfil' })).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(boton).toHaveFocus();
    });
    expect(useUiStore.getState().panelAbierto).toBe('ninguno');
  });
});
