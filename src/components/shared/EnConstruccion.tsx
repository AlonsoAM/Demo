import { Wrench } from "lucide-react";

import { textosEnConstruccion } from "@/lib/textos";

/**
 * Aviso honesto para toda sección del menú que todavía no tiene pantalla
 * propia en esta entrega (H1-E10, H1-E11). Puramente presentacional: recibe
 * el nombre de la sección ya resuelto y arma el mensaje con el helper
 * centralizado de `textos.ts` (T2.6) — nunca redefine el literal.
 *
 * La usa `SeccionEnConstruccionPage` (T6.5) dentro de `AppLayout` (T5.13), que
 * es quien aporta el resto de la estructura del sistema (menú, barra
 * superior, ruta de navegación) — H1-E12/H1-E13.
 */
interface EnConstruccionProps {
  /** Nombre de la sección elegida, tal como aparece en el menú/breadcrumb. */
  nombreSeccion: string;
}

export function EnConstruccion({ nombreSeccion }: EnConstruccionProps) {
  return (
    <div className="mx-auto mt-5 max-w-xl text-center">
      <div className="rounded-lg border-2 border-border bg-card px-6 py-10 shadow-sm">
        <div className="mb-3 flex justify-center text-muted-foreground" aria-hidden="true">
          <Wrench size={36} />
        </div>
        <h2 className="text-xl font-semibold text-card-foreground">
          {textosEnConstruccion.titulo}
        </h2>
        <p className="mt-2 font-medium text-muted-foreground">
          {textosEnConstruccion.descripcion(nombreSeccion)}
        </p>
      </div>
    </div>
  );
}
