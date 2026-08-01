import { useLocation } from 'react-router';

import { resolverTitulo } from '@/components/layout/resolverTitulo';
import { EnConstruccion } from '@/components/shared/EnConstruccion';

/**
 * Pantalla genérica para toda sección/subsección del menú que todavía no
 * tiene pantalla propia en esta entrega (H1-E10, H1-E13): Órdenes, Clientes,
 * Lotes, Despachos, Almacén, Reportes y Configuración.
 *
 * Resuelve el nombre de la sección desde la ruta activa con el mismo
 * criterio de búsqueda que ya usan `Breadcrumb`/`Sidebar`/`Topbar`
 * (`resolverTitulo`, sobre la fuente única `SECCIONES_MENU` de `T2.2`) — no
 * duplica esa búsqueda, solo la reutiliza — y le pasa el resultado a
 * `EnConstruccion` (T5.3), que arma el aviso honesto con el helper de textos.
 *
 * El router (T7.2) monta este componente para cada una de esas rutas dentro
 * de `AppLayout` (T5.13), que aporta el resto del shell (menú, barra
 * superior, breadcrumb): por eso la Topbar sigue mostrando el título correcto
 * de la sección mientras esta pantalla está activa (H1-E13).
 */
export function SeccionEnConstruccionPage() {
  const { pathname } = useLocation();
  const nombreSeccion = resolverTitulo(pathname);

  return <EnConstruccion nombreSeccion={nombreSeccion} />;
}
