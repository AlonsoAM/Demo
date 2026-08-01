import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * Datos mínimos que necesita un ítem del menú lateral. Sirve tanto para una
 * sección de primer nivel (con icono, `SeccionMenu` de `navegacion.ts`) como
 * para una subsección (sin icono propio, `ItemNavegacion`) — ambas se marcan
 * como activas de la misma forma (H1-E5). Se declara localmente en vez de
 * importar `SeccionMenu`/`ItemNavegacion` directamente para no acoplar este
 * presentacional a cuál de los dos está renderizando `Sidebar` (T5.5).
 */
export interface ItemMenuSidebar {
  /** Nombre visible de la sección o subsección. */
  nombre: string;
  /** Ruta absoluta de React Router a la que navega este ítem. */
  ruta: string;
  /** Icono de la sección. Ausente en subsecciones (no tienen icono propio, H1-E3/H1-E4). */
  icono?: LucideIcon;
}

interface SidebarSeccionProps {
  /** Ítem del menú a renderizar (sección de primer nivel o subsección). */
  seccion: ItemMenuSidebar;
  /**
   * Si el menú lateral está colapsado: oculta el nombre (queda solo el icono)
   * y activa el tooltip con el nombre al apuntar el icono (H2-E1…H2-E3, AF-20).
   */
  colapsado: boolean;
  /**
   * Si este ítem se marca como la sección activa. Se recibe explícito en vez
   * de derivarse del `isActive` propio de `NavLink`: `Sidebar` (T5.5) necesita
   * poder marcar como activa una sección contenedora (p. ej. "Comercial")
   * cuando lo activo es una de sus subsecciones y el menú está colapsado —
   * lógica que decide el padre, no este componente (H2-E4).
   */
  activa: boolean;
}

/**
 * Un ítem del menú lateral: icono + nombre, con la marca de sección activa
 * (H1-E5, H2-E4) y el tooltip del nombre cuando el menú está colapsado
 * (H2-E3, AF-20). Es un `NavLink` de react-router: Enter lo activa sin
 * código adicional (H7-E15) y navega con el teclado igual que con el mouse.
 *
 * La marca de "activa" nunca depende solo del color (RN-34, H7-E19): además
 * del tinte de fondo lleva una barra indicadora a la izquierda
 * (`border-l-primary`) y `aria-current="page"` para tecnología de asistencia.
 */
export function SidebarSeccion({ seccion, colapsado, activa }: SidebarSeccionProps) {
  const Icono = seccion.icono;

  const enlace = (
    <NavLink
      to={seccion.ruta}
      aria-current={activa ? 'page' : undefined}
      className={cn(
        'group relative flex min-h-11 w-full items-center gap-3 rounded-md border-l-[3px] border-transparent px-3 py-2.5',
        'text-[14.5px] font-bold text-foreground transition-colors motion-reduce:transition-none',
        colapsado && 'justify-center px-0',
        activa
          ? 'border-primary bg-primary/10 font-extrabold'
          : 'hover:bg-muted'
      )}
    >
      {Icono && <Icono aria-hidden="true" className="size-5 shrink-0" />}
      <span className={cn('truncate', colapsado && 'sr-only')}>{seccion.nombre}</span>
    </NavLink>
  );

  if (!colapsado) {
    return enlace;
  }

  // Con el menú colapsado el nombre queda oculto visualmente (sr-only arriba):
  // el tooltip es la única forma de recuperar la referencia de qué sección es
  // cada icono al apuntarlo (H2-E3).
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{enlace}</TooltipTrigger>
        <TooltipContent side="right">{seccion.nombre}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
