/**
 * Helper de pruebas de componente (Bloque 8): envuelve el elemento bajo
 * prueba con los mismos proveedores que la app real ensambla en
 * `AppProviders` (T7.1) — `QueryClientProvider` + `useAplicarTema()` — y con
 * un `MemoryRouter` (T7.2 usa `createBrowserRouter`, pero un test de
 * componente no necesita navegador real: sólo la ruta activa que consumen
 * `useLocation()`/`NavLink` en `Sidebar`/`Breadcrumb`/`Topbar`).
 *
 * No reexporta `AppProviders` tal cual porque éste usa el `queryClient`
 * singleton de la app: un test que reutilizara ese mismo cliente arrastraría
 * caché de un test al siguiente (ej. TarjetaIndicador forzando un estado de
 * error después de que otro test cacheó un éxito con la misma queryKey,
 * T8.7). Por eso acá se crea un `QueryClient` nuevo en cada `renderConProveedores`,
 * con la misma opción `retry: false` que `providers.tsx` (RN-20: el reintento
 * siempre es manual, nunca automático).
 */
import type { ReactElement, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { useAplicarTema } from '@/hooks/useAplicarTema';

interface RenderConProveedoresOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Ruta(s) inicial(es) del `MemoryRouter`. Por defecto: la Home (`/`, T7.2). */
  initialEntries?: string[];
}

interface ProveedoresDePruebaProps {
  children: ReactNode;
  initialEntries: string[];
}

function crearQueryClientDePrueba(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

/**
 * Equivalente de prueba de `AppProviders` (T7.1): mismo orden de proveedores
 * y misma sincronización de tema, pero con un `QueryClient` propio del test
 * y un `MemoryRouter` en vez del `BrowserRouter` real de `router.tsx`.
 */
function ProveedoresDePrueba({ children, initialEntries }: ProveedoresDePruebaProps) {
  useAplicarTema();

  return (
    <QueryClientProvider client={crearQueryClientDePrueba()}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

/**
 * Renderiza `ui` envuelto en proveedores + enrutador de memoria. Reemplaza al
 * `render` de Testing Library para cualquier componente que dependa del tema,
 * de TanStack Query o de contexto de ruta (`useLocation`, `NavLink`, `Link`).
 */
export function renderConProveedores(ui: ReactElement, options: RenderConProveedoresOptions = {}) {
  const { initialEntries = ['/'], ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <ProveedoresDePrueba initialEntries={initialEntries}>{children}</ProveedoresDePrueba>
    ),
    ...renderOptions,
  });
}

export * from '@testing-library/react';
