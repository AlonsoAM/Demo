import { createBrowserRouter } from 'react-router';

import { AppLayout } from '@/components/layout/AppLayout';
import { InicioPage } from '@/pages/InicioPage';
import { SeccionEnConstruccionPage } from '@/pages/SeccionEnConstruccionPage';

/**
 * Rutas de las 8 pantallas del sistema (T7.2), todas anidadas bajo `AppLayout`
 * (T5.13) como layout compartido — el `<Outlet />` de `AppLayout` monta la
 * pantalla de cada ruta hija (H1-E1, H1-E5, H1-E12, H1-E14).
 *
 * `createBrowserRouter` (API de datos de react-router 7) en vez de
 * `<Routes>/<Route>` declarativo: es la API recomendada por react-router 7
 * para el árbol de rutas de nivel superior de la aplicación y no exige nada
 * que `AppLayout`/`Sidebar`/`Breadcrumb`/`Topbar` no usen ya — todos leen la
 * ruta activa con `useLocation()` y navegan con `NavLink`, ambos disponibles
 * sin importar el modo de enrutador elegido. Se deja preparado el punto único
 * donde el futuro Login Demo (otra spec) podría envolver rutas con un loader
 * de sesión, sin reestructurar este archivo.
 *
 * AF-24: ninguna ruta está protegida en esta entrega — el sistema abre
 * directo en "Inicio" sin exigir inicio de sesión (H1-E15). La integración
 * con Login Demo es posterior y no se anticipa aquí (A13).
 *
 * Las 7 rutas sin pantalla propia (Órdenes, Clientes, Lotes, Despachos,
 * Almacén, Reportes, Configuración) reutilizan la MISMA
 * `SeccionEnConstruccionPage` (H1-E10, H1-E13) — no se crea un componente por
 * sección. Las rutas coinciden exactamente con las declaradas en
 * `SECCIONES_MENU`/subsecciones de `src/app/navegacion.ts` (T2.2): no se
 * inventan rutas nuevas ni se renombran las existentes.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <InicioPage /> },
      { path: 'comercial/ordenes', element: <SeccionEnConstruccionPage /> },
      { path: 'comercial/clientes', element: <SeccionEnConstruccionPage /> },
      { path: 'packing/lotes', element: <SeccionEnConstruccionPage /> },
      { path: 'packing/despachos', element: <SeccionEnConstruccionPage /> },
      { path: 'almacen', element: <SeccionEnConstruccionPage /> },
      { path: 'reportes', element: <SeccionEnConstruccionPage /> },
      { path: 'configuracion', element: <SeccionEnConstruccionPage /> },
    ],
  },
]);
