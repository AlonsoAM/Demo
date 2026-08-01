import { Menu } from 'lucide-react';
import { useLocation } from 'react-router';

import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/useUiStore';

import { BotonTema } from './BotonTema';
import { MenuUsuario } from './MenuUsuario';
import { PanelNotificaciones } from './PanelNotificaciones';
import { resolverTitulo } from './resolverTitulo';

/**
 * Barra superior del shell: título de la pantalla actual + los tres controles
 * flotantes, en el orden de foco exacto que exige A-8/AF-15 (H7-E11…H7-E13):
 * tema → campana (notificaciones) → avatar (usuario). El orden es el orden
 * del DOM, sin `tabIndex` positivos — igual que el resto del shell.
 *
 * El título (H1-E6, H1-E13, RN-2) se deriva de la misma fuente única que
 * `Sidebar` y `Breadcrumb` (`SECCIONES_MENU`, A-1) vía `useLocation`, nunca de
 * un literal por página: así la Topbar muestra el nombre correcto tanto en
 * "Inicio" como en cualquiera de las 7 pantallas "en construcción" (H1-E13).
 *
 * Incluye también el botón "Abrir menú" del sidebar de teléfono (T5.6,
 * `useUiStore().setMenuMovilAbierto(true)`): el plan no lo asigna de forma
 * explícita ni a esta tarea ni a T5.13 (`AppLayout`); se agrega aquí porque es
 * un control propio de la topbar (visible solo bajo el breakpoint de
 * escritorio, `md:hidden`, igual que `Sidebar` se oculta con `md:flex`) y
 * porque el mockup aprobado lo ubica dentro del `<header class="topbar">`,
 * como primer elemento, antes del título.
 */
export function Topbar() {
  const { pathname } = useLocation();
  const titulo = resolverTitulo(pathname);
  const setMenuMovilAbierto = useUiStore((estado) => estado.setMenuMovilAbierto);

  return (
    <header className="flex min-h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="Abrir menú"
        className="min-h-11 min-w-11 md:hidden"
        onClick={() => setMenuMovilAbierto(true)}
      >
        <Menu aria-hidden="true" />
      </Button>

      <h1 className="min-w-0 flex-1 truncate text-xl font-extrabold text-foreground">
        {titulo}
      </h1>

      <div className="flex shrink-0 items-center gap-1">
        <BotonTema />
        <PanelNotificaciones />
        <MenuUsuario />
      </div>
    </header>
  );
}
