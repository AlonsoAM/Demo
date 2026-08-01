import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Tema visual de la aplicación.
 *
 * Decisión A-9 (plan técnico, H6-E1 / AF-19): el valor inicial es SIEMPRE
 * 'claro', sin leer `prefers-color-scheme` del sistema operativo. Es una
 * desviación deliberada del DESIGN.md, ya resuelta a favor de la spec
 * aprobada — ver `.specs/Layout/layout-base-y-dashboard-plan.md` §2.1.
 */
export type Tema = 'claro' | 'oscuro';

interface UseTemaStore {
  /** Tema actual de la interfaz. Default: 'claro' (A-9). */
  tema: Tema;
  /** Alterna entre 'claro' y 'oscuro'. */
  alternarTema: () => void;
  /** Fija el tema de forma explícita. */
  setTema: (tema: Tema) => void;
}

/**
 * Store de tema — a diferencia de `useUiStore` (T4.1), este SÍ persiste en
 * `localStorage` (H6-E4/E7, RN-29): el tema elegido por el usuario sobrevive
 * a la recarga y es independiente del ciclo de vida de la ruta.
 */
export const useTemaStore = create<UseTemaStore>()(
  persist(
    (set, get) => ({
      tema: 'claro',
      alternarTema: () =>
        set({ tema: get().tema === 'claro' ? 'oscuro' : 'claro' }),
      setTema: (tema) => set({ tema }),
    }),
    {
      name: 'layout.tema',
    },
  ),
);
