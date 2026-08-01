import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { notificacionesMock } from '@/features/notificaciones/data/notificaciones.mock';
import { useUiStore } from '@/stores/useUiStore';

/**
 * Campana de la barra superior con el panel "Notificaciones" (H5-E6…H5-E12,
 * H7-E16, RN-25, RN-26). Los tres avisos son de ejemplo del negocio agro
 * (AF-11): elegir uno no lo marca como leído ni lo quita del panel (AF-13) —
 * no hay contador de "no leídos", a propósito.
 *
 * El estado de apertura vive en `useUiStore.panelAbierto` (A-4), no en
 * estado local: así el panel se cierra solo cuando se abre el menú de
 * usuario (H5-E13) sin que ninguno de los dos componentes conozca al otro,
 * simplemente ambos leen el mismo enum.
 *
 * `DropdownMenu` es Radix por debajo: cierre por clic fuera y por Escape
 * (H5-E12, H7-E16) vienen de fábrica, no se reimplementan a mano. Cada aviso
 * previene el cierre automático de Radix al elegirse (`onSelect` con
 * `preventDefault`) porque H5-E11 exige que el panel siga mostrando los
 * mismos tres avisos después de elegir uno — no es una acción de navegación.
 */
export function PanelNotificaciones() {
  const panelAbierto = useUiStore((estado) => estado.panelAbierto);
  const abrirPanel = useUiStore((estado) => estado.abrirPanel);
  const cerrarPanel = useUiStore((estado) => estado.cerrarPanel);

  const abierto = panelAbierto === 'notificaciones';

  return (
    <DropdownMenu
      open={abierto}
      onOpenChange={(siguienteAbierto) => {
        if (siguienteAbierto) {
          abrirPanel('notificaciones');
        } else {
          cerrarPanel();
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11"
          aria-label="Notificaciones"
        >
          <Bell aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificacionesMock.map((aviso) => (
          <DropdownMenuItem
            key={aviso.id}
            className="whitespace-normal py-2"
            onSelect={(evento) => {
              // No es una acción de navegación: elegir un aviso no lo marca
              // como leído ni lo quita del panel (AF-13, H5-E11). Se impide
              // el cierre automático que Radix aplica por defecto al elegir
              // un ítem.
              evento.preventDefault();
            }}
          >
            {aviso.mensaje}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
