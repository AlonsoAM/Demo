import { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useLocation } from 'react-router';

import { SECCIONES_MENU } from '@/app/navegacion';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/stores/useUiStore';
import type { SeccionMenu } from '@/types/navegacion.types';

import { SidebarSeccion } from './SidebarSeccion';

/**
 * Menú lateral de escritorio: lista las 6 secciones desde la fuente única
 * `SECCIONES_MENU` (A-1, H1-E2), colapsa/expande a solo iconos (H2-E1, H2-E2)
 * y despliega las subsecciones de "Comercial" y "Packing" al elegirlas
 * (H1-E3, H1-E4).
 *
 * Oculto bajo el breakpoint de escritorio (H7-E3, `hidden md:flex`):
 * en teléfono el shell (`AppLayout`, T5.13) muestra en su lugar
 * `SidebarMovil` (T5.6), que renderiza este mismo contenido dentro de un
 * panel deslizable.
 *
 * El botón de colapso/expansión es el PRIMER elemento del DOM del sidebar
 * (A-8, AF-15, H7-E9): con foco en ningún elemento, un solo Tab lo alcanza;
 * el siguiente Tab avanza a "Inicio", la primera sección (H7-E10).
 */
export function Sidebar() {
  const colapsado = useUiStore((estado) => estado.sidebarColapsado);
  const alternarSidebar = useUiStore((estado) => estado.alternarSidebar);
  const { pathname } = useLocation();

  // Qué secciones con subsecciones (Comercial, Packing) el usuario desplegó
  // explícitamente al elegirlas (H1-E3, H1-E4). Solo relevante con el menú
  // expandido: colapsado no se muestran subsecciones bajo ningún caso (no
  // tienen icono propio, `ItemNavegacion`). No se vuelve a colapsar un grupo
  // ya desplegado: ningún escenario lo exige, y sumar esa interacción sería
  // complejidad sin un segundo uso (A-13).
  const [desplegadas, setDesplegadas] = useState<Record<string, boolean>>({});

  return (
    <aside
      aria-label="Menú principal"
      className={cn(
        'hidden h-full flex-col border-r border-border bg-background',
        'transition-[width] duration-200 motion-reduce:transition-none md:flex',
        colapsado ? 'w-[76px]' : 'w-[248px]'
      )}
    >
      <button
        type="button"
        onClick={alternarSidebar}
        aria-label={colapsado ? 'Expandir menú' : 'Colapsar menú'}
        className={cn(
          'flex min-h-11 shrink-0 items-center gap-3 border-b border-border px-3 py-2.5',
          'text-[14.5px] font-bold text-foreground hover:bg-muted',
          colapsado && 'justify-center px-0'
        )}
      >
        {colapsado ? (
          <PanelLeftOpen aria-hidden="true" className="size-5 shrink-0" />
        ) : (
          <PanelLeftClose aria-hidden="true" className="size-5 shrink-0" />
        )}
        <span className={cn(colapsado && 'sr-only')}>
          {colapsado ? 'Expandir menú' : 'Colapsar menú'}
        </span>
      </button>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-2">
        {SECCIONES_MENU.map((seccion) => (
          <SeccionConSubsecciones
            key={seccion.id}
            seccion={seccion}
            colapsado={colapsado}
            pathname={pathname}
            desplegada={desplegadas[seccion.id] ?? false}
            onDesplegar={() =>
              setDesplegadas((previas) => ({ ...previas, [seccion.id]: true }))
            }
          />
        ))}
      </nav>
    </aside>
  );
}

interface SeccionConSubseccionesProps {
  seccion: SeccionMenu;
  colapsado: boolean;
  pathname: string;
  /** Si el usuario ya eligió esta sección alguna vez (desplegó sus subsecciones). */
  desplegada: boolean;
  onDesplegar: () => void;
}

/**
 * Una sección de primer nivel (`SidebarSeccion`) junto con sus subsecciones,
 * si las tiene y están desplegadas. Decide aquí, no en `SidebarSeccion`
 * (presentacional, T5.4), la lógica de negocio de qué cuenta como "activa" y
 * cuándo se muestra el grupo:
 *
 * - Sección **sin** subsecciones (Inicio, Almacén, Reportes, Configuración):
 *   activa cuando la ruta actual es exactamente la suya.
 * - Sección **con** subsecciones (Comercial, Packing), menú **expandido**:
 *   nunca se marca activa ella misma — la subsección elegida es la que se
 *   marca (H1-E5: solo "Órdenes" queda activa, no "Comercial").
 * - Sección **con** subsecciones, menú **colapsado**: como las subsecciones
 *   no se muestran (sin icono propio), la sección contenedora sí se marca
 *   activa para no perder la referencia de dónde está el usuario (H2-E4).
 */
function SeccionConSubsecciones({
  seccion,
  colapsado,
  pathname,
  desplegada,
  onDesplegar,
}: SeccionConSubseccionesProps) {
  const tieneSubsecciones = (seccion.subsecciones?.length ?? 0) > 0;
  const subseccionActivaRuta = seccion.subsecciones?.find((sub) => sub.ruta === pathname);

  const activa = tieneSubsecciones
    ? colapsado && (pathname === seccion.ruta || !!subseccionActivaRuta)
    : pathname === seccion.ruta;

  // El grupo aparece si el usuario ya lo desplegó explícitamente (H1-E3,
  // H1-E4) o si ya está navegando dentro de una de sus subsecciones (p. ej.
  // al entrar directo a "/comercial/clientes"): en ambos casos la subsección
  // activa debe quedar visible, no oculta.
  const mostrarSubsecciones = !colapsado && tieneSubsecciones && (desplegada || !!subseccionActivaRuta);

  return (
    <div>
      {tieneSubsecciones ? (
        <div onClick={onDesplegar}>
          <SidebarSeccion seccion={seccion} colapsado={colapsado} activa={activa} />
        </div>
      ) : (
        <SidebarSeccion seccion={seccion} colapsado={colapsado} activa={activa} />
      )}

      {mostrarSubsecciones && (
        <div
          role="group"
          aria-label={`Subsecciones de ${seccion.nombre}`}
          className="ml-4 mt-1 flex flex-col gap-1 border-l border-border pl-2"
        >
          {seccion.subsecciones!.map((sub) => (
            <SidebarSeccion
              key={sub.id}
              seccion={sub}
              colapsado={false}
              activa={sub.ruta === pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
}
