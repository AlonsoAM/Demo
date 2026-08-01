import { Link, useLocation } from 'react-router';

import { SECCIONES_MENU } from '@/app/navegacion';
import { cn } from '@/lib/utils';
import type { NivelRuta } from '@/types/navegacion.types';

/**
 * Ruta de navegación (breadcrumb) derivada de la fuente única de navegación
 * (A-1, `src/app/navegacion.ts`) según la ruta actual de React Router.
 *
 * Contrato (H1-E7…H1-E9, H2-E7…H2-E9, RN-4, RN-5, RN-12, AF-21):
 * - Pantalla "Inicio" (`/`): un solo nivel, "Inicio", inerte — es la pantalla actual.
 * - Sección sin subsecciones (p. ej. "Almacén"): dos niveles, "Inicio / Almacén".
 *   El primer nivel navega a Inicio; el segundo es la pantalla actual, inerte.
 * - Subsección (p. ej. "Órdenes" dentro de "Comercial"): tres niveles,
 *   "Inicio / Comercial / Órdenes". Solo el primer nivel navega: "Comercial" es
 *   el nivel intermedio y no tiene pantalla propia (AF-21), y el último nivel
 *   es la pantalla actual — ninguno de los dos navega.
 *
 * Recibe la ruta actual vía `useLocation()` de react-router en vez de una prop:
 * el breadcrumb es, por contrato (A-1), una vista derivada de la ruta activa, y
 * el resto del shell (p. ej. `SidebarSeccion` como `NavLink`) ya asume contexto
 * de Router. Evita prop-drilling del pathname a través de `AppLayout`/`Topbar`
 * y solo exige que quien lo monte esté dentro de un `<BrowserRouter>` (T7.2) —
 * en pruebas aisladas (T8.3), un `MemoryRouter` con `initialEntries` alcanza.
 */
export function Breadcrumb() {
  const { pathname } = useLocation();
  const niveles = construirNiveles(pathname);

  return (
    <nav
      aria-label="Ruta de navegación"
      className="border-b border-border bg-background px-5 py-2.5"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px]">
        {niveles.map((nivel, indice) => {
          const esUltimo = indice === niveles.length - 1;

          return (
            <li key={`${nivel.nombre}-${indice}`} className="flex items-center gap-1.5">
              {indice > 0 && (
                <span aria-hidden="true" className="font-bold text-muted-foreground">
                  /
                </span>
              )}
              {nivel.ruta ? (
                <Link
                  to={nivel.ruta}
                  className="rounded px-1 py-0.5 font-extrabold text-ring hover:underline"
                >
                  {nivel.nombre}
                </Link>
              ) : (
                <span
                  className={cn(
                    'px-1 py-0.5 font-extrabold',
                    esUltimo ? 'text-foreground' : 'text-muted-foreground'
                  )}
                  aria-current={esUltimo ? 'page' : undefined}
                >
                  {nivel.nombre}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Traduce la ruta activa a los niveles de la ruta de navegación, buscando la
 * sección (y, si aplica, la subsección) en la fuente única `SECCIONES_MENU`.
 * `ruta: null` marca un nivel inerte (RN-12): el primer nivel es el único que
 * puede navegar, y solo cuando no es también el último (la pantalla actual).
 */
function construirNiveles(pathname: string): NivelRuta[] {
  if (pathname === '/') {
    return [{ nombre: 'Inicio', ruta: null }];
  }

  const seccion = SECCIONES_MENU.find(
    (s) => s.ruta === pathname || s.subsecciones?.some((sub) => sub.ruta === pathname)
  );

  if (!seccion) {
    // Ruta no reconocida en la fuente única: se muestra solo "Inicio" navegable,
    // que es siempre una posición válida de retorno.
    return [{ nombre: 'Inicio', ruta: '/' }];
  }

  const subseccion = seccion.subsecciones?.find((sub) => sub.ruta === pathname);

  if (subseccion) {
    return [
      { nombre: 'Inicio', ruta: '/' },
      { nombre: seccion.nombre, ruta: null },
      { nombre: subseccion.nombre, ruta: null },
    ];
  }

  return [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: seccion.nombre, ruta: null },
  ];
}
