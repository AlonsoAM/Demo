---
verify_version: 2
spec_ref: layout-base-y-dashboard-spec.md
plan_ref: layout-base-y-dashboard-plan.md
stack: react-frontend
domain: Frontend
executed: 2026-08-01 12:17
closed: 2026-08-01
verify_result: pass
override_reason: ""
overridden_by: ""
---

# Verificación de Criterios — Layout Base y Dashboard

## Resumen

- **Historias:** 7 de 7 verificadas (P1: 4/4 · P2: 3/3) — las 7 historias pasan: todos sus escenarios `H#-E#` pasaron.
- **Total escenarios (criterios):** 94
- ⚙️ Cumplidos ejecutables (test/smoke): **94**
- ✅ Cumplidos automáticos (grep): 0
- 🟡 Probables (semi-auto): 0
- 🔵 Manuales (confirmados por el usuario): 0
- ❌ Fallidos: 0

**Estado global:** ✅ TODO CUMPLE

> Nota de dominio: esta spec es **Frontend puro** (sin backend, sin endpoints — spec §"Qué NO incluye esta entrega" y plan §6 "Sin archivo `.http`: esta entrega no expone endpoints"). No se genera ni ejecuta `.http`. Los 94 escenarios de la Matriz de Trazabilidad (plan §5) tienen **todos** una prueba `U-#` (Vitest + Testing Library) y/o `S-1` (smoke real en navegador) asociada — ninguno quedó como Automático/Semi-automático/Manual.

## Resultados de ejecución (evidencia dura)

### Tests del stack

- **Comando:** `npx vitest run`
- **Resultado:** 80 pasados / 0 fallados / 80 total, 11 archivos de test
- **Fallos:** ninguno
- **Duración:** 5.31s (Start 12:09:52, 2026-08-01)

### Smoke en navegador S-1 (agente `Frontend Developer` con `chrome-devtools`, contra `http://localhost:5173/` real — Vite dev server, no simulado)

| # | Punto verificado | Ancho | Resultado | Evidencia |
|---|-------------------|-------|-----------|-----------|
| 1 | Inicio carga las 4 tarjetas con valores/variación/tendencia exactos (128 +12% ↑, 45,320 +8% ↑, 37 "Sin cambio" —, 9 -3% ↓) | 1440px | ✅ | screenshot |
| 2 | "Comercial" despliega Órdenes/Clientes; "Packing" despliega Lotes/Despachos | 1440px | ✅ | snapshot |
| 3 | Clic en "Órdenes": título "Órdenes", breadcrumb "Inicio / Comercial / Órdenes", "En construcción" + texto exacto, sidebar/topbar visibles | 1440px | ✅ | screenshot |
| 4 | Volver a "Inicio" reaparecen las 4 tarjetas | 1440px | ✅ | snapshot |
| 5 | Colapsar deja solo iconos; expandir vuelve a mostrar nombres | 1440px | ✅ | 2 screenshots |
| 6 | Campana abre panel con los 3 avisos exactos (OC-2418, L-0912, DS-3307); clic fuera cierra | 1440px | ✅ | snapshot (nota: Radix requiere pointerdown/pointerup real, no click sintético simple — comportamiento correcto, no bug) |
| 7 | Menú usuario: "Mi perfil"/"Cerrar sesión"; "Cerrar sesión" muestra aviso honesto y NO saca al usuario | 1440px | ✅ | snapshot |
| 8 | Interruptor de tema alterna claro↔oscuro; alcanza sidebar/topbar/tarjetas | 1440px | ✅ | `document.documentElement.classList.contains('dark')` vía evaluate_script + screenshot |
| 9 | Sin scroll horizontal | 1440px | ✅ | `scrollWidth(1442) <= clientWidth(1442)` |
| 10 | Consola sin errores/warnings de React | 1440px | ✅ | `list_console_messages` vacío |
| 11 | Sidebar no fijo al costado; aparece botón "Abrir menú" | ~502px* | ✅ | snapshot |
| 12 | Menú abre como panel deslizable ENCIMA del contenido (dialog "Menú principal"); se cierra al elegir sección | ~502px* | ✅ | snapshot |
| 13 | Las 4 tarjetas se apilan verticalmente | ~502px* | ✅ | screenshot |
| 14 | Sin scroll horizontal | ~502px* | ✅ | `scrollWidth(502) <= clientWidth(502)` |

**Errores de consola:** ninguno en toda la sesión (`list_console_messages` con `includePreservedMessages=true`, vacío).

> **Desviación de entorno (no bloqueante):** `resize_page` del MCP `chrome-devtools` no logró forzar la ventana real por debajo de ~502px (probablemente un mínimo de la ventana del navegador real usado por el MCP, no del CDP de un dispositivo emulado); se pidieron 360px. Las conclusiones cualitativas de los puntos 11-14 se sostienen a ~502px (el layout "mobile" ya está activo en ese ancho), pero **no** es una verificación exacta a 360px. Registrado aquí como limitación de la herramienta de smoke, no del código — si se requiere el ancho exacto, usar emulación de dispositivo (`Emulation.setDeviceMetricsOverride`) en vez de `resize_page` de ventana real. No degrada el resultado porque H7-E1/E7 (comportamiento a 360px) están también cubiertos por `U-10` (`responsive.test.tsx`), que sí fija `window.innerWidth = 360` de forma determinística vía JSDOM.

## Detalle por Criterio

### ⚙️ Cumplidos ejecutables (test/smoke) — 94 de 94

#### H1 `P1` — Ver la estructura del sistema y navegar entre las secciones del menú (15/15)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 1 | H1-E1 — El sistema abre en la pantalla Inicio | `InicioPage.test.tsx:23` "H1-E1, H3-E1" ✓ · S-1 #1 |
| 2 | H1-E2 — El menú lateral lista las secciones del negocio | `Sidebar.test.tsx:44` "H1-E2" ✓ |
| 3 | H1-E3 — Comercial despliega sus subsecciones | `Sidebar.test.tsx:61` "H1-E3" ✓ · S-1 #2 |
| 4 | H1-E4 — Packing despliega sus subsecciones | `Sidebar.test.tsx:72` "H1-E4" ✓ · S-1 #2 |
| 5 | H1-E5 — La sección elegida queda marcada como activa | `Sidebar.test.tsx:83` "H1-E5" ✓ |
| 6 | H1-E6 — La barra superior toma el título de la sección elegida | `Topbar.test.tsx:41,48` "H1-E6" ✓ · S-1 #3 |
| 7 | H1-E7 — La ruta de navegación se actualiza al entrar a una subsección | `Breadcrumb.test.tsx:41` "U2.3 — tres niveles completos" ✓ · S-1 #3 |
| 8 | H1-E8 — Ruta de navegación de sección sin subsecciones (2 niveles) | `Breadcrumb.test.tsx:27` "U2.2 — Almacén" ✓ |
| 9 | H1-E9 — Ruta de navegación de Inicio (1 nivel) | `Breadcrumb.test.tsx:17` "U2.1 — un solo nivel" ✓ |
| 10 | H1-E10 — Sección sin pantalla muestra "En construcción" | `SeccionEnConstruccionPage.test.tsx:42` "H1-E10 / RN-6 / RN-37" ✓ · S-1 #3 |
| 11 | H1-E11 — El aviso nombra la sección elegida | `SeccionEnConstruccionPage.test.tsx:50,58` "H1-E11" ✓ · S-1 #3 |
| 12 | H1-E12 — Aviso se muestra dentro de la estructura (sidebar visible) | `SeccionEnConstruccionPage.test.tsx:66` "H1-E12 / RN-7" ✓ · S-1 #3 |
| 13 | H1-E13 — Barra superior sigue visible en sección en construcción | `SeccionEnConstruccionPage.test.tsx:73` "H1-E13" ✓ · `Topbar.test.tsx:55` "H1-E13 / H5-E14" ✓ · S-1 #3 |
| 14 | H1-E14 — Volver a Inicio desde sección en construcción | `InicioPage.test.tsx:54` "H1-E14" ✓ · S-1 #4 |
| 15 | H1-E15 — El sistema abre sin pedir inicio de sesión | `InicioPage.test.tsx:43` "H1-E15" ✓ · S-1 #1 |

#### H2 `P1` — Colapsar/expandir el menú y ubicarse con la ruta de navegación (9/9)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 16 | H2-E1 — Colapsar deja solo iconos | `Sidebar.test.tsx:94` "H2-E1 / H2-E2" ✓ · S-1 #5 |
| 17 | H2-E2 — Expandir vuelve a mostrar nombres | `Sidebar.test.tsx:94` "H2-E1 / H2-E2" ✓ · S-1 #5 |
| 18 | H2-E3 — Colapsado: nombre aparece al apuntar el icono | `Sidebar.test.tsx:113` "H2-E3" ✓ |
| 19 | H2-E4 — Sección activa sigue marcada colapsado | `Sidebar.test.tsx:123` "H2-E4" ✓ |
| 20 | H2-E5 — Colapso se mantiene al cambiar de sección | `Sidebar.test.tsx:134` "H2-E5" ✓ |
| 21 | H2-E6 — Menú vuelve expandido al recargar | `Sidebar.test.tsx:159` "H2-E6 — sin persist (A-3)" ✓ |
| 22 | H2-E7 — Primer nivel de ruta vuelve a Inicio | `Breadcrumb.test.tsx:50` "U2.4 — Inicio es enlace" ✓ |
| 23 | H2-E8 — Nivel intermedio no navega | `Breadcrumb.test.tsx:58` "U2.5 — Comercial no es enlace" ✓ |
| 24 | H2-E9 — Último nivel indica pantalla actual | `Breadcrumb.test.tsx:67` "U2.6 — Despachos marcado como página actual" ✓ |

#### H3 `P1` — Ver los cuatro indicadores del negocio en Inicio (14/14)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 25 | H3-E1 — Inicio muestra cuatro tarjetas | `InicioPage.test.tsx:23` "H1-E1, H3-E1" ✓ · S-1 #1 |
| 26 | H3-E2 — Órdenes del mes: valor 128 | `TarjetaIndicador.test.tsx:24` "H3-E2, H3-E3, H3-E4" ✓ · S-1 #1 |
| 27 | H3-E3 — Órdenes del mes: variación "+12%" | `TarjetaIndicador.test.tsx:24` ✓ · S-1 #1 |
| 28 | H3-E4 — Órdenes del mes: tendencia al alza | `TarjetaIndicador.test.tsx:24` ✓ · S-1 #1 |
| 29 | H3-E5 — Kilos despachados: valor 45,320 | `TarjetaIndicador.test.tsx:37` "H3-E5, H3-E6" ✓ · S-1 #1 |
| 30 | H3-E6 — Kilos despachados: variación "+8%" | `TarjetaIndicador.test.tsx:37` ✓ · S-1 #1 |
| 31 | H3-E7 — Clientes activos: valor 37 | `TarjetaIndicador.test.tsx:46` "H3-E7, H3-E8, H3-E9" ✓ · S-1 #1 |
| 32 | H3-E8 — Clientes activos: "Sin cambio vs. mes anterior" | `TarjetaIndicador.test.tsx:46` ✓ · S-1 #1 |
| 33 | H3-E9 — Clientes activos: tendencia neutra (raya) | `TarjetaIndicador.test.tsx:46` ✓ · S-1 #1 |
| 34 | H3-E10 — Órdenes pendientes: valor 9 | `TarjetaIndicador.test.tsx:56` "H3-E10, H3-E11, H3-E12" ✓ · S-1 #1 |
| 35 | H3-E11 — Órdenes pendientes: variación "-3%" | `TarjetaIndicador.test.tsx:56` ✓ · S-1 #1 |
| 36 | H3-E12 — Órdenes pendientes: tendencia a la baja | `TarjetaIndicador.test.tsx:56` ✓ · S-1 #1 |
| 37 | H3-E13 — Inicio no incluye gráficos | `InicioPage.test.tsx:68` "H3-E13" ✓ |
| 38 | H3-E14 — Inicio no incluye tabla de actividad | `InicioPage.test.tsx:84` "H3-E14" ✓ |

#### H4 `P1` — Percibir carga, vacío o falla de los indicadores (13/13)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 39 | H4-E1 — Esqueleto mientras carga | `TarjetaIndicador.test.tsx:66` "H4-E1, H4-E2, H4-E3" ✓ |
| 40 | H4-E2 — Nombre visible durante carga | `TarjetaIndicador.test.tsx:66` ✓ |
| 41 | H4-E3 — Esqueleto se reemplaza por el valor | `TarjetaIndicador.test.tsx:66` ✓ |
| 42 | H4-E4 — Sin información del periodo lo explica | `TarjetaIndicador.test.tsx:81` "H4-E4, H4-E5, H4-E6" ✓ |
| 43 | H4-E5 — Vacío no muestra valor inventado | `TarjetaIndicador.test.tsx:81` ✓ |
| 44 | H4-E6 — Vacío no muestra variación | `TarjetaIndicador.test.tsx:81` ✓ |
| 45 | H4-E7 — Falla lo avisa dentro de su tarjeta | `TarjetaIndicador.test.tsx:96` "H4-E7, H4-E8" ✓ |
| 46 | H4-E8 — Tarjeta con problema ofrece "Reintentar" | `TarjetaIndicador.test.tsx:96` ✓ |
| 47 | H4-E9 — Reintentar vuelve a carga | `TarjetaIndicador.test.tsx:112` "H4-E9, H4-E10" ✓ |
| 48 | H4-E10 — Reintento exitoso muestra el valor | `TarjetaIndicador.test.tsx:112` ✓ |
| 49 | H4-E11 — Problema de una tarjeta no afecta a otra | `TarjetaIndicador.test.tsx:154` "H4-E11 — queryKey aislada (A-2)" ✓ |
| 50 | H4-E12 — Mensaje de problema anunciado a lector de pantalla | `TarjetaIndicador.test.tsx:180` "H4-E12, H4-E13" ✓ |
| 51 | H4-E13 — Mensaje de vacío anunciado a lector de pantalla | `TarjetaIndicador.test.tsx:180` ✓ |

#### H5 `P2` — Consultar el menú de usuario y el panel de notificaciones (14/14)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 52 | H5-E1 — Barra superior muestra usuario de ejemplo | `MenuUsuario.test.tsx:50` "H5-E1" ✓ · S-1 #7 |
| 53 | H5-E2 — Menú ofrece perfil y salida | `MenuUsuario.test.tsx:59` "H5-E2" ✓ · S-1 #7 |
| 54 | H5-E3 — Cerrar sesión avisa disponibilidad futura | `MenuUsuario.test.tsx:71` "H5-E3" ✓ · S-1 #7 |
| 55 | H5-E4 — Cerrar sesión no saca al usuario | `MenuUsuario.test.tsx:93` "H5-E4" ✓ · S-1 #7 |
| 56 | H5-E5 — Mi perfil avisa disponibilidad futura | `MenuUsuario.test.tsx:82` "H5-E5" ✓ |
| 57 | H5-E6 — Campana abre panel de notificaciones | `PanelNotificaciones.test.tsx:40` "H5-E6" ✓ · S-1 #6 |
| 58 | H5-E7 — Panel lista tres avisos | `PanelNotificaciones.test.tsx:52` "H5-E7…H5-E10" ✓ · S-1 #6 |
| 59 | H5-E8 — Primer aviso: orden OC-2418 | `PanelNotificaciones.test.tsx:52` ✓ · S-1 #6 |
| 60 | H5-E9 — Segundo aviso: lote L-0912 | `PanelNotificaciones.test.tsx:52` ✓ · S-1 #6 |
| 61 | H5-E10 — Tercer aviso: despacho DS-3307 | `PanelNotificaciones.test.tsx:52` ✓ · S-1 #6 |
| 62 | H5-E11 — Elegir un aviso no lo quita del panel | `PanelNotificaciones.test.tsx:68` "H5-E11 / AF-13" ✓ |
| 63 | H5-E12 — Panel se cierra al elegir fuera | `PanelNotificaciones.test.tsx:92` "H5-E12" ✓ · S-1 #6 |
| 64 | H5-E13 — Abrir menú usuario cierra panel notificaciones | `Topbar.test.tsx:83,113,132` "H5-E13" ✓ |
| 65 | H5-E14 — Barra superior es la misma en cualquier sección | `Topbar.test.tsx:55` "H1-E13 / H5-E14" ✓ |

#### H6 `P2` — Alternar tema claro/oscuro con preferencia recordada (8/8)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 66 | H6-E1 — Abre en tema claro la primera vez | `tema.test.tsx:54` "H6-E1" ✓ |
| 67 | H6-E2 — Cambiar a tema oscuro | `tema.test.tsx:62` "H6-E2" ✓ · S-1 #8 |
| 68 | H6-E3 — Volver a tema claro | `tema.test.tsx:72` "H6-E3" ✓ · S-1 #8 |
| 69 | H6-E4 — Preferencia se recuerda entre visitas | `tema.test.tsx:84` "H6-E4 / RN-29" ✓ |
| 70 | H6-E5 — Cambio de tema alcanza al menú lateral | `tema.test.tsx:100` "H6-E5" ✓ · S-1 #8 |
| 71 | H6-E6 — Cambio de tema alcanza a las tarjetas | `tema.test.tsx:121` "H6-E6" ✓ · S-1 #8 |
| 72 | H6-E7 — Tema se mantiene al cambiar de sección | `tema.test.tsx:141` "H6-E7" ✓ |
| 73 | H6-E8 — Contraste del valor ≥ 4.5:1 en tema oscuro | `tema.test.tsx:159` "H6-E8" ✓ |

#### H7 `P2` — Usar el sistema desde un teléfono y solo con teclado (21/21)

| # | Escenario | Evidencia |
|---|-----------|-----------|
| 74 | H7-E1 — Entra en teléfono 360px sin scroll horizontal | `responsive.test.tsx:133` "H7-E7, H7-E8" (parametrizado 360/1440) ✓ · S-1 #14 (a ~502px, ver nota de entorno) |
| 75 | H7-E2 — Se ve completo en escritorio 1440px | `responsive.test.tsx:133` ✓ · S-1 #9 |
| 76 | H7-E3 — En teléfono el menú no ocupa espacio junto al contenido | `responsive.test.tsx:65` "H7-E3" ✓ · S-1 #11 |
| 77 | H7-E4 — En teléfono el menú abre como panel sobre el contenido | `responsive.test.tsx:78` "H7-E4, RN-31" ✓ · S-1 #12 |
| 78 | H7-E5 — Menú de teléfono se cierra al elegir sección | `responsive.test.tsx:89` "H7-E5, RN-32" ✓ · S-1 #12 |
| 79 | H7-E6 — Menú de teléfono se cierra al tocar fuera | `responsive.test.tsx:100` "H7-E6" ✓ |
| 80 | H7-E7 — En teléfono las tarjetas se apilan | `responsive.test.tsx:133` ✓ · S-1 #13 |
| 81 | H7-E8 — En escritorio las tarjetas se alinean en fila | `responsive.test.tsx:133` ✓ |
| 82 | H7-E9 — Tab 1: foco en "Colapsar menú" | `navegacion-teclado.test.tsx:130` "H7-E9…H7-E14 / AF-15" ✓ |
| 83 | H7-E10 — Tab: colapso → primera sección | `navegacion-teclado.test.tsx:130` ✓ |
| 84 | H7-E11 — Tab: última sección → interruptor de tema | `navegacion-teclado.test.tsx:130` ✓ |
| 85 | H7-E12 — Tab: tema → campana | `navegacion-teclado.test.tsx:130` ✓ |
| 86 | H7-E13 — Tab: campana → avatar | `navegacion-teclado.test.tsx:130` ✓ |
| 87 | H7-E14 — Tab: avatar → área de contenido | `navegacion-teclado.test.tsx:130` ✓ |
| 88 | H7-E15 — Enter activa la sección enfocada | `navegacion-teclado.test.tsx:171` "H7-E15" ✓ |
| 89 | H7-E16 — Escape cierra panel de notificaciones | `PanelNotificaciones.test.tsx:116` "H7-E16" ✓ |
| 90 | H7-E17 — Escape cierra menú de usuario | `MenuUsuario.test.tsx:118` "H7-E17" ✓ |
| 91 | H7-E18 — Escape cierra menú deslizable en teléfono | `responsive.test.tsx:119` "H7-E18" ✓ |
| 92 | H7-E19 — Sección activa se reconoce sin depender del color | `Sidebar.test.tsx:148` "H7-E19" ✓ · `navegacion-teclado.test.tsx:186` "H7-E19" ✓ |
| 93 | H7-E20 — Elemento enfocado se distingue (contorno de foco) | `navegacion-teclado.test.tsx:196` "H7-E20" ✓ · S-1 (contraste no medido de foco visual, ver token) |
| 94 | H7-E21 — Cambio de pantalla anunciado al lector de pantalla | `navegacion-teclado.test.tsx:210` "H7-E21" ✓ |

### Reglas de negocio estructurales (sin escenario `H#-E#` propio, traza "—")

| RN | Condición → Acción | Evidencia |
|----|---------------------|-----------|
| RN-35 | Pantallas futuras reutilizan esta estructura y estados | `components/layout/` + `TarjetaIndicador` como piezas compartidas (plan §3, carpeta real verificada) |
| RN-36 | Indicadores son datos de ejemplo fijos, sin consulta externa | `src/features/dashboard/data/indicadores.mock.ts:15` — array estático, sin `fetch`/llamada de red |
| RN-37 | Todos los textos en español | `index.html:2` → `<html lang="es">` + `lib/textos.ts` como fuente única de strings |

### 🟡 Probables (confirmar manual)

Ninguno — todos los criterios fueron ejecutables.

### 🔵 Manuales (requieren ejecución)

Ninguno — todos los criterios fueron ejecutables.

### ❌ No detectados / Fallidos

Ninguno.

## Decisiones del Usuario

No aplica — 0 criterios pendientes de confirmación manual/semi-automática. El único punto informativo (ancho exacto de 360px no alcanzable con `resize_page` real del MCP) no bloquea el resultado porque H7-E1/E7 quedan cubiertos de forma determinística por `U-10` (JSDOM a 360px exactos).

---

**Estado global:** ✅ TODO CUMPLE — 94/94 escenarios cumplidos (ejecutables), 0 fallos, 0 pendientes.
