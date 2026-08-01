/**
 * Proveedores de la aplicación: cliente de consultas (TanStack Query) y
 * aplicación del tema.
 *
 * `retry: false` en `defaultOptions.queries` es consistente con el resto del
 * sistema (ver `useIndicador.ts`, T3.2): el reintento siempre es una acción
 * explícita del usuario vía el botón "Reintentar", nunca algo automático —
 * un retry automático haría que el estado de error casi nunca llegue a verse
 * (RN-20). Se fija a nivel de `QueryClient` para que ningún hook nuevo lo
 * olvide y quede reintentando en silencio.
 *
 * `AppProviders` llama `useAplicarTema()` (T4.3) internamente para que el
 * tema se sincronice con la clase `dark` de `<html>` apenas la app monta, sin
 * que quien lo use tenga que acordarse de invocar el hook aparte (H6-E7: el
 * tema se mantiene al cambiar de sección, porque el proveedor vive por
 * encima de las rutas y no se remonta al navegar).
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { useAplicarTema } from '@/hooks/useAplicarTema';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Envuelve la aplicación con el `QueryClientProvider` y sincroniza el tema.
 */
export function AppProviders({ children }: AppProvidersProps) {
  useAplicarTema();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
