import { create } from 'zustand';

/**
 * Panel flotante de la barra superior que está abierto. Modelado como enum
 * (no dos booleanos independientes) para que "ambos abiertos a la vez" sea
 * inexpresable — exclusión mutua estructural (A-4, H5-E13, RN-27).
 */
export type PanelTopbar = 'ninguno' | 'usuario' | 'notificaciones';

interface UiState {
  /** Menú lateral de escritorio colapsado a solo iconos (H2-E1, H2-E2). */
  sidebarColapsado: boolean;
  /** Menú lateral de teléfono desplegado como panel deslizable. */
  menuMovilAbierto: boolean;
  /** Panel de la topbar actualmente abierto (usuario o notificaciones), o ninguno. */
  panelAbierto: PanelTopbar;

  /** Alterna el colapso del sidebar de escritorio. */
  alternarSidebar: () => void;
  /** Abre o cierra el menú lateral de teléfono. */
  setMenuMovilAbierto: (abierto: boolean) => void;
  /** Abre un panel de la topbar; si ya estaba abierto, lo cierra (toggle). */
  abrirPanel: (panel: Exclude<PanelTopbar, 'ninguno'>) => void;
  /** Cierra cualquier panel de la topbar que esté abierto. */
  cerrarPanel: () => void;
}

/**
 * Store de UI efímero: sidebar colapsado, menú móvil y panel abierto de la
 * topbar. **Sin `persist`** (A-3, RN-11): a diferencia del tema, este estado
 * no sobrevive a la recarga — el sidebar siempre vuelve expandido (H2-E5,
 * H2-E6).
 */
export const useUiStore = create<UiState>((set) => ({
  sidebarColapsado: false,
  menuMovilAbierto: false,
  panelAbierto: 'ninguno',

  alternarSidebar: () =>
    set((estado) => ({ sidebarColapsado: !estado.sidebarColapsado })),

  setMenuMovilAbierto: (abierto) => set({ menuMovilAbierto: abierto }),

  abrirPanel: (panel) =>
    set((estado) => ({
      panelAbierto: estado.panelAbierto === panel ? 'ninguno' : panel,
    })),

  cerrarPanel: () => set({ panelAbierto: 'ninguno' }),
}));
