import { useEffect } from 'react';

import { useTemaStore } from '@/stores/useTemaStore';

/**
 * Aplica el tema actual del store al elemento raíz del documento.
 *
 * Tailwind 4 en este proyecto NO usa `prefers-color-scheme`: el variant
 * `dark` está fijado por clase (`@custom-variant dark (&:is(.dark *))` en
 * `src/index.css`, T1.4), y esa clase se decide por selección explícita del
 * usuario (`useTemaStore`, T4.2 — AF-19/A-9), nunca por el sistema operativo.
 *
 * Este hook es el único responsable de sincronizar `tema` → clase `dark` en
 * `<html>`. Se suscribe al store, así que reacciona en caliente a cada
 * `alternarTema`/`setTema`, no solo al montar.
 */
export function useAplicarTema(): void {
  const tema = useTemaStore((state) => state.tema);

  useEffect(() => {
    const raiz = document.documentElement;

    if (tema === 'oscuro') {
      raiz.classList.add('dark');
    } else {
      raiz.classList.remove('dark');
    }
  }, [tema]);
}
