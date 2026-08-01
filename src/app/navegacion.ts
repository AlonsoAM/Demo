import { Archive, BarChart3, Box, Briefcase, Home, Settings } from 'lucide-react';

import type { SeccionMenu } from '@/types/navegacion.types';

/**
 * Fuente única de navegación (A-1, AF-1): las 6 secciones del menú lateral,
 * en el orden exacto exigido por H1-E2, con las subsecciones de "Comercial"
 * (H1-E3) y "Packing" (H1-E4), sus iconos y sus rutas.
 *
 * El Sidebar, el Breadcrumb, el título de la Topbar y el router (T7.2)
 * derivan de este arreglo — no se duplica esta lista en ningún otro lugar.
 *
 * "Comercial" y "Packing" no tienen pantalla propia en esta entrega (AF-21):
 * su `ruta` apunta a la primera subsección, que es el destino real al elegir
 * la sección en el menú lateral.
 */
export const SECCIONES_MENU: SeccionMenu[] = [
  {
    id: 'inicio',
    nombre: 'Inicio',
    ruta: '/',
    icono: Home,
  },
  {
    id: 'comercial',
    nombre: 'Comercial',
    ruta: '/comercial/ordenes',
    icono: Briefcase,
    subsecciones: [
      { id: 'ordenes', nombre: 'Órdenes', ruta: '/comercial/ordenes' },
      { id: 'clientes', nombre: 'Clientes', ruta: '/comercial/clientes' },
    ],
  },
  {
    id: 'packing',
    nombre: 'Packing',
    ruta: '/packing/lotes',
    icono: Box,
    subsecciones: [
      { id: 'lotes', nombre: 'Lotes', ruta: '/packing/lotes' },
      { id: 'despachos', nombre: 'Despachos', ruta: '/packing/despachos' },
    ],
  },
  {
    id: 'almacen',
    nombre: 'Almacén',
    ruta: '/almacen',
    icono: Archive,
  },
  {
    id: 'reportes',
    nombre: 'Reportes',
    ruta: '/reportes',
    icono: BarChart3,
  },
  {
    id: 'configuracion',
    nombre: 'Configuración',
    ruta: '/configuracion',
    icono: Settings,
  },
];
