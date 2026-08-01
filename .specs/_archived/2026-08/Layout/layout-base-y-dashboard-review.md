---
review_version: 1
spec_ref: layout-base-y-dashboard-spec.md
executed: 2026-08-01 12:59
tier: 2
diff_lines: 11272
sensitive_paths_hit: []
review_result: pass
override_reason: ""
overridden_by: ""
---

# Review de Código — Layout Base y Dashboard

## Resumen
- **Tier:** 2 (diff 11272 líneas > 400, sin rama base "main" — es el primer commit del repo; se comparó todo el árbol contra el árbol vacío)
- 🔴 Críticos: 0 · 🟡 Medios: 2 · 🟢 Menores/refutados: 4

Diff real de código (excluyendo `package-lock.json` generado y binarios/SVG de assets): ~4900 líneas en 72 archivos. Sin rutas sensibles tocadas (no hay `Database/**`, `Auth/**`, `Pagos/**` en este módulo — frontend puro).

## Hallazgos

### 🔴 Críticos (bloquean PR)
Ninguno.

### 🟡 Medios (recomendado corregir)
| # | Ubicación | Problema | Fix sugerido |
|---|-----------|----------|--------------|
| 1 | `src/App.css:1` | Boilerplate por defecto de `create-vite` (clases `.hero`, `#next-steps`, `.ticks`) sin ninguna referencia en el código (confirmado por grep). Código muerto. | Eliminar el archivo. |
| 2 | `public/icons.svg:1` | Sprite SVG con iconos sociales (bluesky, discord, github, x) del scaffolding inicial, sin referencia desde `index.html` ni `src/`. Código muerto. | Eliminar el archivo. |

### 🟢 Menores / refutados
| # | Ubicación | Problema | Fix sugerido |
|---|-----------|----------|--------------|
| 1 | `src/app/router.tsx:16` | Comentario desactualizado: dice que la navegación usa `NavLink`, pero `SidebarSeccion.tsx` ya usa `Link` (fix del bug de marca activa, bloque 8). | Actualizar el comentario a `Link`. |
| 2 | `src/components/layout/Breadcrumb.tsx:22` | Mismo comentario desactualizado citando `NavLink` en vez de `Link`. | Actualizar el comentario. |
| 3 | `src/test/utils.tsx:7` | Comentario del helper de pruebas también cita `NavLink` en vez de `Link`. | Actualizar el comentario. |
| 4 | `src/features/dashboard/hooks/useIndicador.ts:31` | La `queryKey` (`['indicador', id]`) no incluye `modo`; si dos instancias compartieran `indicadorId` con distinto `modo` simultáneamente compartirían caché. Hoy no ocurre (`GrillaIndicadores` usa el default). | Incluir `modo` en la `queryKey` o documentar la restricción. |

## Decisión
0 críticos → `review_result: pass`. Los 2 🟡 (código muerto del scaffold) y los 4 🟢 (comentarios desactualizados + edge case teórico de caché) quedan como deuda menor, aceptados sin bloquear — se pueden limpiar en un fix rápido posterior o en el próximo bloque que toque esos archivos.
