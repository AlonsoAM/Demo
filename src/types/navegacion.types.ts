import type { LucideIcon } from 'lucide-react';

/**
 * Un ítem navegable dentro de una sección del menú lateral: una subsección
 * (p. ej. "Órdenes" y "Clientes" dentro de "Comercial", "Lotes" y "Despachos"
 * dentro de "Packing"). Ver H1-E3, H1-E4.
 */
export interface ItemNavegacion {
  /** Identificador estable de la subsección (usado como key y para derivar la ruta). */
  id: string;
  /** Nombre visible en el menú lateral, la barra superior y la ruta de navegación. */
  nombre: string;
  /** Ruta absoluta de React Router para esta subsección. */
  ruta: string;
}

/**
 * Una sección de primer nivel del menú lateral (Inicio, Comercial, Packing,
 * Almacén, Reportes, Configuración). Fuente única de navegación (A-1): el
 * Sidebar, el Breadcrumb, el título de la Topbar y el router derivan de aquí
 * (AF-1, H1-E2).
 */
export interface SeccionMenu {
  /** Identificador estable de la sección (usado como key y para derivar la ruta). */
  id: string;
  /** Nombre visible de la sección. */
  nombre: string;
  /** Ruta absoluta de React Router para esta sección (destino directo si no tiene subsecciones). */
  ruta: string;
  /** Icono de la sección, visible tanto expandido como colapsado (menú colapsado, H2-E1). */
  icono: LucideIcon;
  /** Subsecciones desplegables (solo Comercial y Packing las tienen, H1-E3, H1-E4). */
  subsecciones?: ItemNavegacion[];
}

/**
 * Un nivel de la ruta de navegación (breadcrumb). `ruta` es `null` cuando ese
 * nivel no navega: el nivel intermedio sin pantalla propia (AF-21, H2-E8) o el
 * último nivel, que representa la pantalla actual (H2-E9).
 */
export interface NivelRuta {
  /** Nombre visible de este nivel de la ruta. */
  nombre: string;
  /** Ruta a la que navega este nivel, o `null` si es inerte. */
  ruta: string | null;
}
