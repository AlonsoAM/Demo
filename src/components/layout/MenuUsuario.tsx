import { useEffect, useRef, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { textosMenuUsuario } from '@/lib/textos';
import { useUiStore } from '@/stores/useUiStore';

/** Usuario de ejemplo de la barra superior: no representa una sesión real ni un
 * usuario validado por el sistema (AF-12, H5-E1). Sin backend (RN-36). */
const NOMBRE_USUARIO_EJEMPLO = 'Alfredo Anchante';
const INICIALES_USUARIO_EJEMPLO = 'AA';

/** Cuánto queda visible el aviso honesto antes de desaparecer solo. */
const DURACION_AVISO_MS = 4500;

/**
 * Menú de usuario de la barra superior: avatar + nombre de ejemplo, con las
 * opciones "Mi perfil" y "Cerrar sesión" (H5-E1, H5-E2). Ninguna de las dos
 * navega ni cierra nada real — ambas son honestas sobre estar fuera de
 * alcance de esta entrega y lo muestran sin sacar al usuario del sistema
 * (H5-E3…H5-E5, RN-23, RN-24): el mismo criterio que "Cerrar sesión" se
 * aplicó por analogía a "Mi perfil" (AF-10).
 *
 * El estado de apertura vive en `useUiStore` (`panelAbierto === 'usuario'`),
 * no en estado local: así la exclusión mutua con `PanelNotificaciones`
 * (H5-E13) es estructural, no coordinada a mano entre ambos componentes.
 * `DropdownMenu` (Radix) ya cierra con Escape devolviendo el foco al
 * disparador (H7-E17) y con clic fuera, sin código adicional.
 */
export function MenuUsuario() {
  const abierto = useUiStore((estado) => estado.panelAbierto === 'usuario');
  const abrirPanel = useUiStore((estado) => estado.abrirPanel);
  const cerrarPanel = useUiStore((estado) => estado.cerrarPanel);

  const [aviso, setAviso] = useState<string | null>(null);
  const temporizadorAvisoRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(temporizadorAvisoRef.current);
  }, []);

  function mostrarAviso(texto: string) {
    clearTimeout(temporizadorAvisoRef.current);
    setAviso(texto);
    temporizadorAvisoRef.current = setTimeout(() => setAviso(null), DURACION_AVISO_MS);
  }

  return (
    <>
      <DropdownMenu
        open={abierto}
        onOpenChange={(siguienteAbierto) => {
          if (siguienteAbierto) {
            abrirPanel('usuario');
          } else {
            cerrarPanel();
          }
        }}
      >
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`${NOMBRE_USUARIO_EJEMPLO}, menú de usuario`}
            className="flex min-h-11 items-center gap-2 rounded-full px-2 py-1.5 text-[13.5px] font-bold text-foreground hover:bg-muted"
          >
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[13px] font-extrabold text-secondary-foreground"
            >
              {INICIALES_USUARIO_EJEMPLO}
            </span>
            <span className="hidden sm:inline">{NOMBRE_USUARIO_EJEMPLO}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" aria-label="Menú de usuario">
          <DropdownMenuItem onSelect={() => mostrarAviso(textosMenuUsuario.miPerfil)}>
            Mi perfil
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => mostrarAviso(textosMenuUsuario.cerrarSesion)}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {aviso && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <p
            role="status"
            aria-live="polite"
            className="pointer-events-auto max-w-sm rounded-md border border-border bg-popover px-4 py-3 text-center text-sm font-semibold text-popover-foreground shadow-lg"
          >
            {aviso}
          </p>
        </div>
      )}
    </>
  );
}
