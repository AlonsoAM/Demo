import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTemaStore } from '@/stores/useTemaStore';

/**
 * Interruptor de tema claro/oscuro de la barra superior (H6-E2, H6-E3).
 *
 * Presentacional: solo lee/alterna `useTemaStore`. La aplicación real del
 * tema (clase `dark` en `<html>`, A-6) la hace `useAplicarTema` en otro punto
 * del árbol — este componente no toca el DOM fuera de sí mismo.
 *
 * El icono muestra la acción disponible, no el estado actual: en tema claro
 * se ofrece pasar a oscuro (icono luna) y viceversa (icono sol), con el
 * `aria-label` describiendo esa misma acción para quienes usan lector de
 * pantalla (WCAG 2.1 AA — el estado nunca depende solo del icono).
 */
export function BotonTema() {
  const tema = useTemaStore((estado) => estado.tema);
  const alternarTema = useTemaStore((estado) => estado.alternarTema);

  const esClaro = tema === 'claro';
  const etiqueta = esClaro ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro';

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      aria-label={etiqueta}
      title={etiqueta}
      className="min-h-11 min-w-11"
      onClick={alternarTema}
    >
      {esClaro ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </Button>
  );
}
