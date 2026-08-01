import { SECCIONES_MENU } from '@/app/navegacion';

/**
 * Resuelve el título visible de la pantalla activa desde la fuente única de
 * navegación (`SECCIONES_MENU`, A-1), con el mismo criterio de búsqueda que
 * `Breadcrumb.construirNiveles`: ruta exacta de sección o de subsección.
 *
 * Fallback razonable si la ruta no está registrada en la fuente única
 * (no debería ocurrir dentro del router de T7.2, pero evita un título vacío):
 * "Inicio".
 */
export function resolverTitulo(pathname: string): string {
  if (pathname === '/') {
    return 'Inicio';
  }

  const seccion = SECCIONES_MENU.find(
    (s) => s.ruta === pathname || s.subsecciones?.some((sub) => sub.ruta === pathname)
  );

  if (!seccion) {
    return 'Inicio';
  }

  const subseccion = seccion.subsecciones?.find((sub) => sub.ruta === pathname);

  return subseccion ? subseccion.nombre : seccion.nombre;
}
