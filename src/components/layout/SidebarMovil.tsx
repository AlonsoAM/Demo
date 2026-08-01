import { useLocation } from 'react-router';

import { SECCIONES_MENU } from '@/app/navegacion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useUiStore } from '@/stores/useUiStore';

import { SidebarSeccion } from './SidebarSeccion';

/**
 * Menú lateral de teléfono: el mismo contenido de navegación que `Sidebar`
 * (T5.5, misma fuente única `SECCIONES_MENU`) dentro de un panel deslizable
 * (`Sheet` de shadcn/Radix, T5.1) que se superpone al área de contenido en
 * vez de ocupar espacio fijo (H7-E4, RN-31).
 *
 * A diferencia del sidebar de escritorio:
 * - **Nunca se colapsa a solo iconos**: no tiene sentido reducir un panel que
 *   ya se abre y cierra bajo demanda — siempre expandido, con los nombres
 *   visibles (`colapsado` se pasa fijo en `false` a `SidebarSeccion`).
 * - **Las subsecciones de "Comercial" y "Packing" se muestran siempre**, sin
 *   esperar a que el usuario las despliegue con un toque previo (a
 *   diferencia de `desplegadas` en `Sidebar`): como este panel se cierra al
 *   elegir cualquier sección (H7-E5), exigir un toque previo para revelarlas
 *   dejaría "Clientes" y "Despachos" inalcanzables sin reabrir el menú.
 * - **Se cierra automáticamente al elegir cualquier sección o subsección**
 *   (RN-32): un solo `onClick` en el `<nav>` que delega el cierre hacia
 *   cualquier enlace interno, en vez de repetirlo ítem por ítem — pero solo
 *   dispara cuando el `target` del clic es (o está dentro de) un `<a>`
 *   (`target.closest('a')`), para no cerrar el panel ante un clic en
 *   separadores, encabezados de grupo u otro relleno del `<nav>` que no sea
 *   "elegir una sección" (hallazgo T9.2 del Peer Review).
 *
 * El cierre al tocar fuera del panel (H7-E6) y con la tecla Escape (H7-E18,
 * RN-33) los resuelve Radix de fábrica a través de `Sheet`/`SheetContent`
 * (T5.1): no hay lógica propia que mantener para esos dos casos.
 *
 * **Decisión de reutilización**: `Sidebar` (T5.5) no exporta su lógica de
 * listado (`SeccionConSubsecciones` es privada del archivo) y además esa
 * lógica resuelve reglas que aquí no aplican (colapso, despliegue diferido
 * por sección). Duplicar el `.map` sobre `SECCIONES_MENU` con
 * `SidebarSeccion` en este componente es más simple que forzar una
 * extracción compartida para un caso de uso que ya diverge en varias
 * reglas (A-13). Si a futuro conviene compartir más lógica entre ambos
 * sidebars, vale la pena proponer extraer un hook común — eso tocaría
 * `Sidebar.tsx` y queda fuera del alcance de esta tarea.
 */
export function SidebarMovil() {
  const abierto = useUiStore((estado) => estado.menuMovilAbierto);
  const setMenuMovilAbierto = useUiStore((estado) => estado.setMenuMovilAbierto);
  const { pathname } = useLocation();

  return (
    <Sheet open={abierto} onOpenChange={setMenuMovilAbierto}>
      <SheetContent side="left" className="w-[248px] gap-0 sm:max-w-[248px]">
        <SheetHeader className="border-b border-border py-2.5">
          <SheetTitle className="text-[14.5px]">Menú principal</SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Menú principal"
          className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-2"
          onClick={(evento) => {
            // Solo cerramos si el clic ocurrió sobre un enlace real (o dentro
            // de uno): así separadores, encabezados de grupo u otro relleno
            // del `<nav>` que no sea "elegir una sección" no cierran el panel.
            if (evento.target instanceof HTMLElement && evento.target.closest('a')) {
              setMenuMovilAbierto(false);
            }
          }}
        >
          {SECCIONES_MENU.map((seccion) => {
            const tieneSubsecciones = (seccion.subsecciones?.length ?? 0) > 0;

            // Con el panel siempre expandido, una sección con subsecciones
            // nunca se marca activa ella misma: la subsección elegida es la
            // que lleva la marca (H1-E5), igual que en el sidebar de
            // escritorio cuando está expandido.
            const activa = tieneSubsecciones ? false : pathname === seccion.ruta;

            return (
              <div key={seccion.id}>
                <SidebarSeccion seccion={seccion} colapsado={false} activa={activa} />

                {tieneSubsecciones && (
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
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
