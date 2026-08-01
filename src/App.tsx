import { RouterProvider } from 'react-router';

import { AppProviders } from '@/app/providers';
import { router } from '@/app/router';

/**
 * Composición raíz de la aplicación (T7.3): envuelve el árbol de rutas
 * (`router`, T7.2) con los proveedores globales (`AppProviders`, T7.1) para
 * que TanStack Query y la sincronización del tema estén disponibles en toda
 * la app antes de que se monte cualquier ruta.
 */
function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
