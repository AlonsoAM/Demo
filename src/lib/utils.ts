import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind resolviendo conflictos (último valor gana).
 * Es el `cn()` estándar de shadcn/ui — lo usan todos los componentes de
 * `src/components/ui/` generados por el CLI (T1.6) y cualquier componente
 * propio que necesite clases condicionales.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
