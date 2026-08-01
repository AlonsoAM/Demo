/**
 * Pruebas de la pantalla genérica de sección sin destino propio (T8.12):
 * título fijo (H1-E10), texto que nombra la sección elegida (H1-E11), y que
 * el shell completo (menú + barra superior) sigue visible mientras esta
 * pantalla está activa (H1-E12, H1-E13). Cubre además RN-6 (usa `textos.ts`,
 * nunca un literal propio), RN-7 (`AppLayout` envuelve el placeholder) y
 * RN-37 (textos en español).
 *
 * Se ejercita `AppLayout` + `SeccionEnConstruccionPage` juntos (igual que
 * `src/__tests__/navegacion-teclado.test.tsx`, T8.10): esta pantalla nunca se
 * monta sola en la app real (T7.2 la anida bajo `AppLayout`), y H1-E12/H1-E13
 * son justamente sobre ese ensamblado, no sobre el componente aislado.
 */
import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router';

import { renderConProveedores, screen } from '@/test/utils';
import { AppLayout } from '@/components/layout/AppLayout';
import { SeccionEnConstruccionPage } from '@/pages/SeccionEnConstruccionPage';
import { textosEnConstruccion } from '@/lib/textos';

/** Shell real con las mismas rutas sin pantalla propia de `src/app/router.tsx`
 * (T7.2), todas montando `SeccionEnConstruccionPage`. */
function renderSeccionSinDestino(initialEntries: string[]) {
  return renderConProveedores(
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="comercial/ordenes" element={<SeccionEnConstruccionPage />} />
        <Route path="comercial/clientes" element={<SeccionEnConstruccionPage />} />
        <Route path="packing/lotes" element={<SeccionEnConstruccionPage />} />
        <Route path="packing/despachos" element={<SeccionEnConstruccionPage />} />
        <Route path="almacen" element={<SeccionEnConstruccionPage />} />
        <Route path="reportes" element={<SeccionEnConstruccionPage />} />
        <Route path="configuracion" element={<SeccionEnConstruccionPage />} />
      </Route>
    </Routes>,
    { initialEntries },
  );
}

describe('SeccionEnConstruccionPage (T8.12)', () => {
  it('H1-E10 / RN-6 / RN-37: muestra el título fijo "En construcción" desde textos.ts', () => {
    renderSeccionSinDestino(['/almacen']);

    expect(
      screen.getByRole('heading', { level: 2, name: textosEnConstruccion.titulo }),
    ).toBeInTheDocument();
  });

  it('H1-E11 / RN-6: nombra la sección elegida en el texto de aviso', () => {
    renderSeccionSinDestino(['/almacen']);

    expect(
      screen.getByText(textosEnConstruccion.descripcion('Almacén')),
    ).toBeInTheDocument();
  });

  it('H1-E11: nombra la subsección elegida (no la sección padre) cuando aplica', () => {
    renderSeccionSinDestino(['/comercial/clientes']);

    expect(
      screen.getByText(textosEnConstruccion.descripcion('Clientes')),
    ).toBeInTheDocument();
  });

  it('H1-E12 / RN-7: el menú lateral sigue visible (AppLayout envuelve el placeholder)', () => {
    renderSeccionSinDestino(['/reportes']);

    expect(screen.getByLabelText('Menú principal')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reportes' })).toBeInTheDocument();
  });

  it('H1-E13: la barra superior sigue mostrando el título correcto de la sección activa', () => {
    renderSeccionSinDestino(['/configuracion']);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Configuración' }),
    ).toBeInTheDocument();
  });
});
