---
spec_version: 3
modelo: funcional
modulo: Layout
titulo: Layout Base y Dashboard
domain: Frontend
created: 2026-07-31 08:59
clickup_task_id: "86ajtv468"
clickup_task_url: "https://app.clickup.com/t/86ajtv468"
clickup_list_id: "901327860997"
clickup_synced_at: "2026-08-01 18:15"
clickup_subtask_scheme: history
aprobacion_spec: "Aprobada"
aprobador_sugerido: "Alfredo Alonso Anchante Moreno"
aprobado_por: "alfredo.anchante@agricolaandrea.com"
fecha_aprobacion: "2026-07-31"
mockup: ".specs/Layout/mockups/layout-base-y-dashboard-mockup.html"
docs_status: generated
doc_tecnica_path: ".specs/Layout/layout-base-y-dashboard-doc-tecnica.pdf"
manual_usuario_path: ".specs/Layout/layout-base-y-dashboard-manual-usuario.pdf"
manual_url: "https://run.clickup.ai/9013304214/b3954e57-905b-4f29-9847-fd670a56c4f3/layout-base-y-dashboard-manual-usuario.html"
doc_tecnica_url: "https://run.clickup.ai/9013304214/3fd59115-0cd9-4466-960e-183b6b51b4fb/layout-base-y-dashboard-doc-tecnica.html"
docs_generated_at: "2026-08-01 17:47"
pr_url: "https://github.com/AlonsoAM/Demo/pull/1"
pr_status: merged
---

# Layout Base y Dashboard

> Módulo: Layout · Enviada para aprobación: 31-jul-2026
>
> Este documento describe lo que el sistema va a hacer, en el idioma del negocio.
> Es lo que usted aprueba u observa. El equipo técnico recién define el "cómo"
> cuando este documento quede aprobado.

## Historia original de la solicitud

> "Como usuario quiero hacer un dashboard administrativo pero solo el frontend, esta tendrá nuestro layout para todo el proyecto, así que serpa nuestro punto de partida de nuestro sistema, solo nos vamos a enfocar en el frontend, quiero que sea profesional y empresarial."
>
> — Solicitado por Alfredo Alonso Anchante Moreno (tarea ClickUp original, se conserva intacta)

## Qué se va a construir

El punto de partida visual del sistema: la estructura común que todas las
pantallas futuras van a reutilizar, más su primera pantalla real. La estructura
incluye un menú lateral con las secciones del negocio (Inicio, Comercial,
Packing, Almacén, Reportes y Configuración) que se puede colapsar para dejar
solo los iconos, una barra superior con el título de la pantalla en la que uno
está, una ruta de navegación que indica dónde está parado, el menú del usuario,
la campana de notificaciones y un interruptor para pasar de tema claro a tema
oscuro. La primera pantalla es Inicio, con cuatro indicadores del negocio
(órdenes del mes, kilos despachados, clientes activos y órdenes pendientes) que
muestran su valor, su variación respecto al periodo anterior y si la tendencia
sube, baja o se mantiene. Las secciones que todavía no tienen pantalla se pueden
recorrer igual: navegan, se marcan como activas y muestran un aviso honesto de
"En construcción" dentro de la misma estructura, sin fingir contenido. Es una
entrega solo de pantalla: no hay base de datos ni consulta a ningún sistema, los
valores de los indicadores son datos de ejemplo fijos. Sirve para acordar y
aprobar la identidad y la experiencia del sistema — cómo se navega, cómo se
avisa que algo está cargando, vacío o falló, cómo se ve en un teléfono y cómo se
usa solo con teclado — antes de construir cualquier módulo real encima.

## Quiénes lo usarán

- **Usuario del sistema**: recorre el menú lateral, entra a cualquier sección,
  consulta los cuatro indicadores de la pantalla Inicio, abre su menú de usuario
  y el panel de notificaciones, y elige si trabaja con tema claro u oscuro.

En esta entrega no hay roles ni permisos diferenciados: todos los que abran el
sistema ven el menú completo y pueden hacer exactamente lo mismo.

## Historias de usuario

> La solicitud original se descompuso en la entrevista en 7 historias, cada una
> independiente y con su prioridad: `P1` = imprescindible para entregar valor ·
> `P2` = importante, puede entrar en una segunda etapa · `P3` = deseable. Cada
> historia trae sus escenarios de aceptación con ejemplos concretos — son los que
> el equipo verificará uno por uno antes de entregar.

---

### H1 `P1` — Ver la estructura del sistema y navegar entre las secciones del menú

**Como** usuario del sistema, **quiero** abrir el sistema y moverme entre las
secciones del negocio desde el menú lateral, **para** reconocer de una sola
mirada qué contiene el sistema y en qué parte estoy.

**Cómo funcionará:** al abrir el sistema aparece la pantalla Inicio dentro de la
estructura común: menú lateral a un costado, barra superior con el título de la
pantalla y, debajo, la ruta de navegación. El menú lateral lista las secciones
del negocio; Comercial y Packing despliegan sus subsecciones. Al elegir una
sección, el menú la marca como activa, la barra superior toma su título y la
ruta de navegación se actualiza. Las secciones que todavía no tienen pantalla
muestran, dentro de la misma estructura, un aviso de "En construcción" que
nombra la sección elegida.

- **H1-E1 — El sistema abre en la pantalla Inicio.**
    - **Dado:** un usuario que abre el sistema por primera vez
    - **Cuando:** la pantalla termina de abrirse
    - **Entonces:** la barra superior muestra el título "Inicio"
- **H1-E2 — El menú lateral lista las secciones del negocio.**
    - **Dado:** el sistema abierto en la pantalla "Inicio" con el menú lateral expandido
    - **Cuando:** el usuario mira el menú lateral
    - **Entonces:** el menú lateral muestra, en este orden, "Inicio", "Comercial", "Packing", "Almacén", "Reportes" y "Configuración"
- **H1-E3 — Comercial despliega sus subsecciones.**
    - **Dado:** el menú lateral expandido con la sección "Comercial" sin desplegar
    - **Cuando:** el usuario elige "Comercial"
    - **Entonces:** debajo de "Comercial" aparecen las subsecciones "Órdenes" y "Clientes"
- **H1-E4 — Packing despliega sus subsecciones.**
    - **Dado:** el menú lateral expandido con la sección "Packing" sin desplegar
    - **Cuando:** el usuario elige "Packing"
    - **Entonces:** debajo de "Packing" aparecen las subsecciones "Lotes" y "Despachos"
- **H1-E5 — La sección elegida queda marcada como activa.**
    - **Dado:** el usuario está en la pantalla "Inicio" con las subsecciones de "Comercial" desplegadas
    - **Cuando:** el usuario elige "Órdenes"
    - **Entonces:** el menú lateral marca "Órdenes" como la sección activa
- **H1-E6 — La barra superior toma el título de la sección elegida.**
    - **Dado:** el usuario está en la pantalla "Inicio" con las subsecciones de "Comercial" desplegadas
    - **Cuando:** el usuario elige "Órdenes"
    - **Entonces:** la barra superior muestra el título "Órdenes"
    - **Ejemplos:** con "Clientes" la barra superior muestra "Clientes"; con "Almacén" muestra "Almacén"; con "Configuración" muestra "Configuración"
- **H1-E7 — La ruta de navegación se actualiza al entrar a una subsección.**
    - **Dado:** el usuario está en la pantalla "Inicio" con las subsecciones de "Comercial" desplegadas
    - **Cuando:** el usuario elige "Órdenes"
    - **Entonces:** la ruta de navegación muestra "Inicio / Comercial / Órdenes"
    - **Ejemplos:** "Clientes" muestra "Inicio / Comercial / Clientes"; "Lotes" muestra "Inicio / Packing / Lotes"; "Despachos" muestra "Inicio / Packing / Despachos"
- **H1-E8 — La ruta de navegación de una sección sin subsecciones tiene dos niveles.**
    - **Dado:** el usuario está en la pantalla "Inicio"
    - **Cuando:** el usuario elige "Almacén"
    - **Entonces:** la ruta de navegación muestra "Inicio / Almacén"
    - **Ejemplos:** "Reportes" muestra "Inicio / Reportes"; "Configuración" muestra "Inicio / Configuración"
- **H1-E9 — La ruta de navegación de la pantalla Inicio tiene un solo nivel.**
    - **Dado:** el sistema abierto en la pantalla "Inicio"
    - **Cuando:** el usuario mira la ruta de navegación
    - **Entonces:** la ruta de navegación muestra "Inicio"
- **H1-E10 — Una sección sin pantalla muestra el aviso de En construcción.**
    - **Dado:** el usuario está en la pantalla "Inicio" con las subsecciones de "Comercial" desplegadas
    - **Cuando:** el usuario elige "Órdenes"
    - **Entonces:** el área de contenido muestra el título "En construcción"
- **H1-E11 — El aviso de En construcción nombra la sección elegida.**
    - **Dado:** el usuario está en la pantalla "Inicio" con las subsecciones de "Comercial" desplegadas
    - **Cuando:** el usuario elige "Órdenes"
    - **Entonces:** el área de contenido muestra el texto "La pantalla Órdenes estará disponible en una entrega posterior."
    - **Ejemplos:** en "Clientes" dice "La pantalla Clientes estará disponible en una entrega posterior."; en "Almacén" dice "La pantalla Almacén estará disponible en una entrega posterior."; en "Configuración" dice "La pantalla Configuración estará disponible en una entrega posterior."
- **H1-E12 — El aviso de En construcción se muestra dentro de la estructura del sistema.**
    - **Dado:** el área de contenido muestra el título "En construcción" para la sección "Órdenes"
    - **Cuando:** el usuario mira la pantalla
    - **Entonces:** el menú lateral sigue visible con sus seis secciones
- **H1-E13 — La barra superior sigue visible en una sección en construcción.**
    - **Dado:** el área de contenido muestra el título "En construcción" para la sección "Órdenes"
    - **Cuando:** el usuario mira la parte alta de la pantalla
    - **Entonces:** la barra superior muestra el título "Órdenes"
- **H1-E14 — Volver a Inicio desde una sección en construcción.**
    - **Dado:** el usuario está en la sección "Órdenes" con el aviso "En construcción" visible
    - **Cuando:** el usuario elige "Inicio" en el menú lateral
    - **Entonces:** el área de contenido muestra las cuatro tarjetas de indicador
- **H1-E15 — El sistema se abre sin pedir inicio de sesión.**
    - **Dado:** un usuario que abre el sistema sin haber ingresado credenciales
    - **Cuando:** la pantalla termina de abrirse
    - **Entonces:** el área de contenido muestra las cuatro tarjetas de indicador

---

### H2 `P1` — Colapsar y expandir el menú lateral, y ubicarse con la ruta de navegación

**Como** usuario del sistema, **quiero** poder reducir el menú lateral a solo
iconos y saber en todo momento en qué parte del sistema estoy, **para** trabajar
con más espacio de pantalla sin perder la referencia de dónde estoy parado.

**Cómo funcionará:** el menú lateral tiene una opción para colapsarlo y otra para
expandirlo. Expandido muestra el icono y el nombre de cada sección; colapsado
muestra solo los iconos, y al apuntar un icono aparece su nombre. La sección
activa sigue marcada en los dos estados. Debajo de la barra superior, la ruta de
navegación muestra el camino completo hasta la pantalla actual, y el primer nivel
("Inicio") permite volver a la pantalla de inicio.

- **H2-E1 — Colapsar el menú deja solo los iconos.**
    - **Dado:** el menú lateral expandido mostrando el icono y el nombre de cada sección
    - **Cuando:** el usuario elige "Colapsar menú"
    - **Entonces:** el menú lateral muestra únicamente los iconos de las secciones
- **H2-E2 — Expandir el menú vuelve a mostrar los nombres.**
    - **Dado:** el menú lateral colapsado mostrando únicamente los iconos
    - **Cuando:** el usuario elige "Expandir menú"
    - **Entonces:** el menú lateral muestra el nombre de cada sección junto a su icono
- **H2-E3 — Con el menú colapsado el nombre aparece al apuntar el icono.**
    - **Dado:** el menú lateral colapsado mostrando únicamente los iconos
    - **Cuando:** el usuario apunta el icono de "Comercial"
    - **Entonces:** aparece la etiqueta "Comercial" junto a ese icono
- **H2-E4 — La sección activa sigue marcada con el menú colapsado.**
    - **Dado:** el usuario está en la sección "Órdenes" con el menú lateral expandido
    - **Cuando:** el usuario elige "Colapsar menú"
    - **Entonces:** el icono de "Órdenes" sigue marcado como la sección activa
- **H2-E5 — El menú colapsado se mantiene al cambiar de sección.**
    - **Dado:** el menú lateral colapsado y el usuario en la pantalla "Inicio"
    - **Cuando:** el usuario elige "Reportes"
    - **Entonces:** el menú lateral sigue mostrando únicamente los iconos
- **H2-E6 — El menú vuelve expandido al recargar el sistema.**
    - **Dado:** el menú lateral colapsado
    - **Cuando:** el usuario recarga el sistema
    - **Entonces:** el menú lateral muestra el nombre de cada sección junto a su icono
- **H2-E7 — El primer nivel de la ruta de navegación vuelve a Inicio.**
    - **Dado:** la ruta de navegación muestra "Inicio / Comercial / Clientes"
    - **Cuando:** el usuario elige "Inicio" en la ruta de navegación
    - **Entonces:** la barra superior muestra el título "Inicio"
- **H2-E8 — El nivel intermedio de la ruta de navegación no navega.**
    - **Dado:** la ruta de navegación muestra "Inicio / Comercial / Órdenes"
    - **Cuando:** el usuario elige "Comercial" en la ruta de navegación
    - **Entonces:** la barra superior sigue mostrando el título "Órdenes"
- **H2-E9 — El último nivel de la ruta indica la pantalla actual.**
    - **Dado:** el usuario está en la sección "Despachos"
    - **Cuando:** el usuario mira la ruta de navegación
    - **Entonces:** el último nivel de la ruta muestra "Despachos"

---

### H3 `P1` — Ver los cuatro indicadores del negocio en la pantalla Inicio

**Como** usuario del sistema, **quiero** ver en la pantalla Inicio los cuatro
indicadores clave del negocio con su valor y su variación, **para** tener el
pulso del periodo en cuanto abro el sistema.

**Cómo funcionará:** la pantalla Inicio muestra cuatro tarjetas, una por
indicador. Cada tarjeta muestra el nombre del indicador, su valor y la variación
respecto al periodo anterior, acompañada de una señal de tendencia que indica si
sube, baja o se mantiene. En esta entrega los valores son datos de ejemplo fijos.
La pantalla no incluye gráficos ni una tabla de actividad reciente.

- **H3-E1 — Inicio muestra cuatro tarjetas de indicador.**
    - **Dado:** el usuario abre la pantalla "Inicio" con información disponible para los cuatro indicadores
    - **Cuando:** termina la carga
    - **Entonces:** el área de contenido muestra cuatro tarjetas con los nombres "Órdenes del mes", "Kilos despachados", "Clientes activos" y "Órdenes pendientes"
- **H3-E2 — Órdenes del mes muestra su valor.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Órdenes del mes"
    - **Entonces:** la tarjeta muestra el valor 128
- **H3-E3 — Órdenes del mes muestra su variación.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Órdenes del mes"
    - **Entonces:** la tarjeta muestra el texto "+12% vs. mes anterior"
- **H3-E4 — Órdenes del mes señala tendencia al alza.**
    - **Dado:** la tarjeta "Órdenes del mes" con el texto "+12% vs. mes anterior"
    - **Cuando:** el usuario mira la señal de tendencia de la tarjeta
    - **Entonces:** la tarjeta muestra una flecha hacia arriba
- **H3-E5 — Kilos despachados muestra su valor.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Kilos despachados"
    - **Entonces:** la tarjeta muestra el valor 45,320
- **H3-E6 — Kilos despachados muestra su variación.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Kilos despachados"
    - **Entonces:** la tarjeta muestra el texto "+8% vs. mes anterior"
- **H3-E7 — Clientes activos muestra su valor.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Clientes activos"
    - **Entonces:** la tarjeta muestra el valor 37
- **H3-E8 — Clientes activos muestra que no cambió respecto al periodo anterior.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Clientes activos"
    - **Entonces:** la tarjeta muestra el texto "Sin cambio vs. mes anterior"
- **H3-E9 — Clientes activos señala tendencia neutra.**
    - **Dado:** la tarjeta "Clientes activos" con el texto "Sin cambio vs. mes anterior"
    - **Cuando:** el usuario mira la señal de tendencia de la tarjeta
    - **Entonces:** la tarjeta muestra una raya horizontal
- **H3-E10 — Órdenes pendientes muestra su valor.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Órdenes pendientes"
    - **Entonces:** la tarjeta muestra el valor 9
- **H3-E11 — Órdenes pendientes muestra su variación.**
    - **Dado:** la pantalla "Inicio" con información disponible
    - **Cuando:** el usuario mira la tarjeta "Órdenes pendientes"
    - **Entonces:** la tarjeta muestra el texto "-3% vs. mes anterior"
- **H3-E12 — Órdenes pendientes señala tendencia a la baja.**
    - **Dado:** la tarjeta "Órdenes pendientes" con el texto "-3% vs. mes anterior"
    - **Cuando:** el usuario mira la señal de tendencia de la tarjeta
    - **Entonces:** la tarjeta muestra una flecha hacia abajo
- **H3-E13 — La pantalla Inicio no incluye gráficos.**
    - **Dado:** la pantalla "Inicio" con información disponible para los cuatro indicadores
    - **Cuando:** el usuario recorre el área de contenido
    - **Entonces:** el área de contenido no muestra ningún gráfico
- **H3-E14 — La pantalla Inicio no incluye tabla de actividad reciente.**
    - **Dado:** la pantalla "Inicio" con información disponible para los cuatro indicadores
    - **Cuando:** el usuario recorre el área de contenido
    - **Entonces:** el área de contenido no muestra ninguna tabla

---

### H4 `P1` — Percibir cuándo los indicadores están cargando, vacíos o fallaron

**Como** usuario del sistema, **quiero** que cada tarjeta me diga con claridad si
todavía está cargando, si no hay información del periodo o si no se pudo obtener
el dato, **para** no confundir un dato ausente con un cero real y poder
reintentar cuando algo falla.

**Cómo funcionará:** cada tarjeta pasa por estados visibles. Mientras la
información no llega, la tarjeta conserva su nombre y muestra un esqueleto de
carga en lugar del valor. Si no hay información del periodo, muestra un mensaje
explicativo en lugar del valor, sin inventar un número. Si el dato no se pudo
obtener, muestra un mensaje con la opción de reintentar: al reintentar, la
tarjeta vuelve al estado de carga y luego muestra su valor. Cada tarjeta vive su
propio estado: el problema de una no afecta a las otras tres. Este
comportamiento es el mismo que reutilizarán todas las pantallas futuras del
sistema.

- **H4-E1 — La tarjeta muestra un esqueleto mientras carga.**
    - **Dado:** el usuario abre la pantalla "Inicio"
    - **Cuando:** la información de los indicadores todavía no llegó
    - **Entonces:** la tarjeta "Órdenes del mes" muestra un esqueleto de carga en lugar del valor
- **H4-E2 — El nombre del indicador se ve mientras carga.**
    - **Dado:** la tarjeta "Órdenes del mes" mostrando un esqueleto de carga
    - **Cuando:** el usuario mira la tarjeta
    - **Entonces:** la tarjeta muestra el nombre "Órdenes del mes"
- **H4-E3 — Al llegar la información el esqueleto se reemplaza por el valor.**
    - **Dado:** la tarjeta "Órdenes del mes" mostrando un esqueleto de carga
    - **Cuando:** llega la información del indicador
    - **Entonces:** la tarjeta muestra el valor 128
- **H4-E4 — Sin información del periodo la tarjeta lo explica.**
    - **Dado:** el indicador "Kilos despachados" sin información para el periodo
    - **Cuando:** termina la carga de la tarjeta
    - **Entonces:** la tarjeta "Kilos despachados" muestra el texto "Sin información para este periodo"
- **H4-E5 — La tarjeta vacía no muestra un valor inventado.**
    - **Dado:** la tarjeta "Kilos despachados" con el texto "Sin información para este periodo"
    - **Cuando:** el usuario mira la tarjeta
    - **Entonces:** la tarjeta no muestra ningún número en el lugar del valor
- **H4-E6 — La tarjeta vacía no muestra variación.**
    - **Dado:** la tarjeta "Kilos despachados" con el texto "Sin información para este periodo"
    - **Cuando:** el usuario mira la tarjeta
    - **Entonces:** la tarjeta no muestra ningún texto de variación
- **H4-E7 — Un indicador que falla lo avisa dentro de su tarjeta.**
    - **Dado:** el indicador "Órdenes pendientes" que no se pudo obtener
    - **Cuando:** termina el intento
    - **Entonces:** la tarjeta "Órdenes pendientes" muestra el texto "No se pudo obtener este indicador"
- **H4-E8 — La tarjeta con problema ofrece reintentar.**
    - **Dado:** la tarjeta "Órdenes pendientes" con el texto "No se pudo obtener este indicador"
    - **Cuando:** el usuario mira la tarjeta
    - **Entonces:** la tarjeta muestra la opción "Reintentar"
- **H4-E9 — Reintentar devuelve la tarjeta al estado de carga.**
    - **Dado:** la tarjeta "Órdenes pendientes" con el texto "No se pudo obtener este indicador"
    - **Cuando:** el usuario elige "Reintentar"
    - **Entonces:** la tarjeta muestra un esqueleto de carga en lugar de ese texto
- **H4-E10 — El reintento que llega bien muestra el valor.**
    - **Dado:** la tarjeta "Órdenes pendientes" mostrando un esqueleto de carga después de elegir "Reintentar"
    - **Cuando:** llega la información del indicador
    - **Entonces:** la tarjeta muestra el valor 9
- **H4-E11 — El problema de un indicador no afecta a los demás.**
    - **Dado:** la tarjeta "Órdenes pendientes" con el texto "No se pudo obtener este indicador" y los otros tres indicadores con información disponible
    - **Cuando:** el usuario mira la tarjeta "Órdenes del mes"
    - **Entonces:** la tarjeta "Órdenes del mes" muestra el valor 128
- **H4-E12 — El mensaje de problema se anuncia al lector de pantalla.**
    - **Dado:** un usuario que navega con lector de pantalla y la tarjeta "Órdenes pendientes" en estado de carga
    - **Cuando:** aparece el texto "No se pudo obtener este indicador"
    - **Entonces:** el lector de pantalla anuncia ese texto sin que el usuario mueva el foco
- **H4-E13 — El mensaje de tarjeta vacía se anuncia al lector de pantalla.**
    - **Dado:** un usuario que navega con lector de pantalla y la tarjeta "Kilos despachados" en estado de carga
    - **Cuando:** aparece el texto "Sin información para este periodo"
    - **Entonces:** el lector de pantalla anuncia ese texto sin que el usuario mueva el foco

---

### H5 `P2` — Consultar el menú de usuario y el panel de notificaciones

**Como** usuario del sistema, **quiero** abrir mi menú de usuario y ver los
avisos del negocio desde la barra superior, **para** reconocer dónde vivirán mi
perfil, la salida del sistema y las notificaciones cuando el sistema esté
completo.

**Cómo funcionará:** la barra superior muestra el nombre y el avatar de un usuario
de ejemplo. Al elegir el avatar se abre un menú con "Mi perfil" y "Cerrar
sesión"; las dos opciones muestran un aviso honesto de que estarán disponibles
más adelante, sin sacar al usuario del sistema. La campana abre el panel
"Notificaciones" con tres avisos de ejemplo del negocio agro. Los avisos son de
muestra: elegirlos no los marca como leídos ni los quita del panel. Solo un
panel de la barra superior queda abierto a la vez.

- **H5-E1 — La barra superior muestra el usuario de ejemplo.**
    - **Dado:** el sistema abierto en la pantalla "Inicio"
    - **Cuando:** el usuario mira la barra superior
    - **Entonces:** la barra superior muestra el nombre "Alfredo Anchante"
- **H5-E2 — El menú de usuario ofrece perfil y salida.**
    - **Dado:** el sistema abierto en la pantalla "Inicio"
    - **Cuando:** el usuario elige el avatar de la barra superior
    - **Entonces:** se abre un menú con las opciones "Mi perfil" y "Cerrar sesión"
- **H5-E3 — Cerrar sesión avisa que estará disponible más adelante.**
    - **Dado:** el menú de usuario abierto con las opciones "Mi perfil" y "Cerrar sesión"
    - **Cuando:** el usuario elige "Cerrar sesión"
    - **Entonces:** la pantalla muestra el aviso "Cerrar sesión estará disponible cuando se integre el inicio de sesión."
- **H5-E4 — Cerrar sesión no saca al usuario del sistema.**
    - **Dado:** el aviso "Cerrar sesión estará disponible cuando se integre el inicio de sesión." visible con el usuario en la pantalla "Inicio"
    - **Cuando:** el usuario mira la barra superior
    - **Entonces:** la barra superior sigue mostrando el título "Inicio"
- **H5-E5 — Mi perfil avisa que estará disponible más adelante.**
    - **Dado:** el menú de usuario abierto con las opciones "Mi perfil" y "Cerrar sesión"
    - **Cuando:** el usuario elige "Mi perfil"
    - **Entonces:** la pantalla muestra el aviso "Mi perfil estará disponible en una entrega posterior."
- **H5-E6 — La campana abre el panel de notificaciones.**
    - **Dado:** el sistema abierto en la pantalla "Inicio"
    - **Cuando:** el usuario elige la campana de la barra superior
    - **Entonces:** se abre el panel "Notificaciones"
- **H5-E7 — El panel lista tres avisos de ejemplo.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario mira el panel
    - **Entonces:** el panel muestra tres avisos
- **H5-E8 — El primer aviso es de una orden pendiente de aprobación.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario mira el primer aviso
    - **Entonces:** el aviso muestra el texto "La orden OC-2418 de Agroexportadora del Norte quedó pendiente de aprobación."
- **H5-E9 — El segundo aviso es de un lote que terminó su proceso.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario mira el segundo aviso
    - **Entonces:** el aviso muestra el texto "El lote L-0912 de palta Hass completó su proceso de packing."
- **H5-E10 — El tercer aviso es de un despacho que salió.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario mira el tercer aviso
    - **Entonces:** el aviso muestra el texto "El despacho DS-3307 con destino Callao salió con 18,400 kilos."
- **H5-E11 — Elegir un aviso no lo quita del panel.**
    - **Dado:** el panel "Notificaciones" abierto con el aviso "La orden OC-2418 de Agroexportadora del Norte quedó pendiente de aprobación."
    - **Cuando:** el usuario elige ese aviso
    - **Entonces:** el panel sigue mostrando los mismos tres avisos
- **H5-E12 — El panel de notificaciones se cierra al elegir un punto fuera.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario elige un punto del área de contenido fuera del panel
    - **Entonces:** el panel "Notificaciones" deja de estar visible
- **H5-E13 — Abrir el menú de usuario cierra el panel de notificaciones.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario elige el avatar de la barra superior
    - **Entonces:** el panel "Notificaciones" deja de estar visible
- **H5-E14 — La barra superior es la misma en cualquier sección.**
    - **Dado:** el usuario está en la sección "Reportes"
    - **Cuando:** el usuario elige la campana de la barra superior
    - **Entonces:** se abre el panel "Notificaciones"

---

### H6 `P2` — Alternar entre tema claro y tema oscuro con la preferencia recordada

**Como** usuario del sistema, **quiero** elegir si trabajo con tema claro u
oscuro y que el sistema recuerde mi elección, **para** no volver a configurarlo
cada vez que entro.

**Cómo funcionará:** la barra superior tiene un interruptor de tema. La primera
vez el sistema se muestra en tema claro. Al elegir "Tema oscuro" toda la pantalla
cambia, incluido el menú lateral y las tarjetas de indicador, y el sistema guarda
esa preferencia: la próxima visita abre directamente en tema oscuro. El tema
también se mantiene al cambiar de sección dentro de la misma visita.

- **H6-E1 — El sistema abre en tema claro la primera vez.**
    - **Dado:** un usuario que abre el sistema por primera vez, sin haber elegido tema
    - **Cuando:** la pantalla termina de abrirse
    - **Entonces:** la pantalla se muestra en tema claro
- **H6-E2 — Cambiar a tema oscuro.**
    - **Dado:** la pantalla en tema claro
    - **Cuando:** el usuario elige "Tema oscuro"
    - **Entonces:** la pantalla se muestra en tema oscuro
- **H6-E3 — Volver a tema claro.**
    - **Dado:** la pantalla en tema oscuro
    - **Cuando:** el usuario elige "Tema claro"
    - **Entonces:** la pantalla se muestra en tema claro
- **H6-E4 — La preferencia de tema se recuerda entre visitas.**
    - **Dado:** un usuario que dejó el sistema en tema oscuro y lo cerró
    - **Cuando:** el usuario vuelve a abrir el sistema
    - **Entonces:** la pantalla se muestra en tema oscuro
- **H6-E5 — El cambio de tema alcanza al menú lateral.**
    - **Dado:** la pantalla en tema claro con el menú lateral expandido
    - **Cuando:** el usuario elige "Tema oscuro"
    - **Entonces:** el menú lateral se muestra en tema oscuro
- **H6-E6 — El cambio de tema alcanza a las tarjetas de indicador.**
    - **Dado:** la pantalla "Inicio" en tema claro con las cuatro tarjetas visibles
    - **Cuando:** el usuario elige "Tema oscuro"
    - **Entonces:** las cuatro tarjetas de indicador se muestran en tema oscuro
- **H6-E7 — El tema se mantiene al cambiar de sección.**
    - **Dado:** la pantalla en tema oscuro con el usuario en "Inicio"
    - **Cuando:** el usuario elige "Reportes"
    - **Entonces:** la pantalla sigue en tema oscuro
- **H6-E8 — El valor del indicador se distingue del fondo en tema oscuro.**
    - **Dado:** la pantalla "Inicio" en tema oscuro con información disponible
    - **Cuando:** el usuario mira la tarjeta "Órdenes del mes"
    - **Entonces:** el valor 128 se distingue del fondo de la tarjeta con un contraste de al menos 4.5 a 1

---

### H7 `P2` — Usar el sistema desde un teléfono y solo con teclado

**Como** usuario del sistema que trabaja desde un teléfono o sin mouse,
**quiero** recorrer todo el sistema con lo que tengo a mano, **para** no depender
de una pantalla grande ni de un mouse para navegar.

**Cómo funcionará:** el sistema se ve completo desde un teléfono chico (360 px de
ancho) hasta un monitor de escritorio (1440 px), sin desplazamiento horizontal.
En teléfono el menú lateral no ocupa espacio fijo: se abre como panel deslizable
sobre el contenido y se cierra al elegir una sección o al tocar fuera. Las cuatro
tarjetas se apilan una debajo de otra en teléfono y se alinean en una sola fila
en escritorio. Todo el recorrido se completa avanzando con Tab, activando con
Enter y cerrando paneles con Escape. La sección activa se reconoce por algo más
que el color, y el cambio de pantalla se anuncia a los lectores de pantalla.

- **H7-E1 — El sistema entra en un teléfono chico.**
    - **Dado:** una pantalla de 360 px de ancho
    - **Cuando:** el usuario abre la pantalla "Inicio"
    - **Entonces:** el contenido se ve sin desplazamiento horizontal
- **H7-E2 — El sistema se ve completo en escritorio.**
    - **Dado:** una pantalla de 1440 px de ancho
    - **Cuando:** el usuario abre la pantalla "Inicio"
    - **Entonces:** el contenido se ve sin desplazamiento horizontal
- **H7-E3 — En teléfono el menú lateral no ocupa espacio junto al contenido.**
    - **Dado:** una pantalla de 360 px de ancho
    - **Cuando:** el usuario abre la pantalla "Inicio"
    - **Entonces:** el menú lateral no se muestra al costado del área de contenido
- **H7-E4 — En teléfono el menú se abre como panel sobre el contenido.**
    - **Dado:** una pantalla de 360 px de ancho con el menú lateral oculto
    - **Cuando:** el usuario elige "Abrir menú"
    - **Entonces:** el menú lateral aparece como panel deslizable por encima del área de contenido
- **H7-E5 — El menú de teléfono se cierra al elegir una sección.**
    - **Dado:** una pantalla de 360 px de ancho con el panel del menú lateral abierto
    - **Cuando:** el usuario elige "Reportes"
    - **Entonces:** el panel del menú lateral deja de estar visible
- **H7-E6 — El menú de teléfono se cierra al tocar fuera.**
    - **Dado:** una pantalla de 360 px de ancho con el panel del menú lateral abierto
    - **Cuando:** el usuario toca el área de contenido fuera del panel
    - **Entonces:** el panel del menú lateral deja de estar visible
- **H7-E7 — En teléfono las tarjetas se apilan.**
    - **Dado:** una pantalla de 360 px de ancho en "Inicio" con información disponible
    - **Cuando:** el usuario mira el área de contenido
    - **Entonces:** las cuatro tarjetas de indicador se muestran una debajo de otra
- **H7-E8 — En escritorio las tarjetas se alinean en una fila.**
    - **Dado:** una pantalla de 1440 px de ancho en "Inicio" con información disponible
    - **Cuando:** el usuario mira el área de contenido
    - **Entonces:** las cuatro tarjetas de indicador se muestran en una sola fila
- **H7-E9 — El recorrido con Tab empieza en el control del menú lateral.**
    - **Dado:** el sistema recién abierto en "Inicio" en una pantalla de 1440 px, sin foco en ningún elemento
    - **Cuando:** el usuario presiona la tecla Tab una vez
    - **Entonces:** el foco queda en la opción "Colapsar menú"
- **H7-E10 — Tab avanza del control del menú a la primera sección.**
    - **Dado:** el foco en la opción "Colapsar menú"
    - **Cuando:** el usuario presiona la tecla Tab
    - **Entonces:** el foco pasa a la sección "Inicio" del menú lateral
- **H7-E11 — Tab llega al interruptor de tema después de la última sección.**
    - **Dado:** el foco en la sección "Configuración" del menú lateral
    - **Cuando:** el usuario presiona la tecla Tab
    - **Entonces:** el foco pasa al interruptor de tema
- **H7-E12 — Tab llega a la campana de notificaciones.**
    - **Dado:** el foco en el interruptor de tema
    - **Cuando:** el usuario presiona la tecla Tab
    - **Entonces:** el foco pasa a la campana de notificaciones
- **H7-E13 — Tab llega al avatar del usuario.**
    - **Dado:** el foco en la campana de notificaciones
    - **Cuando:** el usuario presiona la tecla Tab
    - **Entonces:** el foco pasa al avatar del usuario
- **H7-E14 — Tab llega desde la barra superior al área de contenido.**
    - **Dado:** el foco en el avatar del usuario
    - **Cuando:** el usuario presiona la tecla Tab
    - **Entonces:** el foco pasa al primer elemento del área de contenido
- **H7-E15 — Enter activa la sección enfocada.**
    - **Dado:** el foco en la sección "Reportes" del menú lateral
    - **Cuando:** el usuario presiona la tecla Enter
    - **Entonces:** la barra superior muestra el título "Reportes"
- **H7-E16 — Escape cierra el panel de notificaciones.**
    - **Dado:** el panel "Notificaciones" abierto
    - **Cuando:** el usuario presiona la tecla Escape
    - **Entonces:** el panel "Notificaciones" deja de estar visible
- **H7-E17 — Escape cierra el menú de usuario.**
    - **Dado:** el menú de usuario abierto con las opciones "Mi perfil" y "Cerrar sesión"
    - **Cuando:** el usuario presiona la tecla Escape
    - **Entonces:** el menú de usuario deja de estar visible
- **H7-E18 — Escape cierra el menú deslizable en teléfono.**
    - **Dado:** una pantalla de 360 px de ancho con el panel del menú lateral abierto
    - **Cuando:** el usuario presiona la tecla Escape
    - **Entonces:** el panel del menú lateral deja de estar visible
- **H7-E19 — La sección activa se reconoce sin depender del color.**
    - **Dado:** el usuario está en la sección "Órdenes"
    - **Cuando:** el usuario mira el menú lateral
    - **Entonces:** la sección "Órdenes" muestra una barra indicadora a su izquierda
- **H7-E20 — El elemento enfocado se distingue en pantalla.**
    - **Dado:** el foco en la campana de notificaciones
    - **Cuando:** el usuario mira la barra superior
    - **Entonces:** la campana de notificaciones muestra un contorno de foco visible
- **H7-E21 — El cambio de pantalla se anuncia al lector de pantalla.**
    - **Dado:** un usuario que navega con lector de pantalla en la pantalla "Inicio"
    - **Cuando:** el usuario elige "Órdenes"
    - **Entonces:** el lector de pantalla anuncia el título "Órdenes"

---

## Reglas del negocio

> Transversales — aplican a todas las historias. Cada una con id `RN-#` y una
> **traza**: el escenario `H#-E#` que la ejercita, o `—` si es estructural / de
> configuración sin escenario propio en esta entrega.

| ID    | Condición (lenguaje de negocio)                                              | Acción                                                                                       | Traza (H#-E#) |
|-------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|---------------|
| RN-1  | El usuario abre el sistema sin elegir sección                                | Se muestra la pantalla "Inicio"                                                              | H1-E1         |
| RN-2  | El usuario elige una sección del menú lateral                                | La barra superior toma el título de esa sección                                               | H1-E6         |
| RN-3  | El usuario elige una sección del menú lateral                                | El menú lateral marca esa sección como activa                                                 | H1-E5         |
| RN-4  | El usuario entra a una subsección de Comercial o de Packing                  | La ruta de navegación muestra "Inicio / [Sección] / [Subsección]"                              | H1-E7         |
| RN-5  | El usuario entra a una sección sin subsecciones                              | La ruta de navegación muestra "Inicio / [Sección]"                                             | H1-E8         |
| RN-6  | La sección elegida no tiene pantalla en esta entrega                         | El área de contenido muestra "En construcción" nombrando esa sección                           | H1-E11        |
| RN-7  | Se muestra el aviso "En construcción"                                        | El menú lateral y la barra superior siguen visibles alrededor del contenido                    | H1-E12        |
| RN-8  | El usuario abre el sistema                                                   | No se le exige inicio de sesión para ver el sistema                                            | H1-E15        |
| RN-9  | El usuario colapsa el menú lateral                                           | El menú lateral muestra únicamente los iconos de las secciones                                 | H2-E1         |
| RN-10 | El menú lateral está colapsado y el usuario apunta un icono                  | Aparece la etiqueta con el nombre de esa sección                                               | H2-E3         |
| RN-11 | El usuario recarga el sistema                                                | El menú lateral vuelve a mostrarse expandido                                                   | H2-E6         |
| RN-12 | Un nivel de la ruta de navegación no tiene pantalla en esta entrega          | Ese nivel no navega a ninguna parte                                                            | H2-E8         |
| RN-13 | Un indicador tiene información del periodo                                   | La tarjeta muestra nombre, valor, variación y señal de tendencia                                | H3-E2         |
| RN-14 | La variación de un indicador es positiva                                     | La tarjeta muestra una flecha hacia arriba                                                     | H3-E4         |
| RN-15 | La variación de un indicador es negativa                                     | La tarjeta muestra una flecha hacia abajo                                                      | H3-E12        |
| RN-16 | La variación de un indicador es nula                                         | La tarjeta muestra "Sin cambio vs. mes anterior" con una raya horizontal                        | H3-E9         |
| RN-17 | La información de un indicador todavía no llegó                              | La tarjeta muestra un esqueleto de carga en lugar del valor, conservando su nombre              | H4-E1         |
| RN-18 | Un indicador no tiene información para el periodo                            | La tarjeta muestra "Sin información para este periodo" y ningún número en el lugar del valor     | H4-E4         |
| RN-19 | Un indicador no se pudo obtener                                              | La tarjeta muestra "No se pudo obtener este indicador" con la opción "Reintentar"                | H4-E7         |
| RN-20 | El usuario elige "Reintentar" en una tarjeta                                 | La tarjeta vuelve al estado de carga antes de mostrar el valor                                   | H4-E9         |
| RN-21 | Un indicador queda vacío o falla                                             | Los otros tres indicadores siguen mostrando su propia información                                | H4-E11        |
| RN-22 | Aparece un mensaje de estado en una tarjeta                                   | El texto se anuncia a los lectores de pantalla                                                   | H4-E12        |
| RN-23 | El usuario elige "Cerrar sesión"                                             | Se muestra el aviso de que estará disponible al integrar el inicio de sesión, sin cerrar nada     | H5-E3         |
| RN-24 | El usuario elige "Mi perfil"                                                 | Se muestra el aviso de que estará disponible en una entrega posterior                             | H5-E5         |
| RN-25 | El usuario abre la campana de notificaciones                                 | Se abre el panel "Notificaciones" con tres avisos de ejemplo del negocio                          | H5-E7         |
| RN-26 | El usuario elige un aviso del panel de notificaciones                        | El aviso permanece en el panel: no se marca como leído ni se quita                                | H5-E11        |
| RN-27 | El usuario abre un panel de la barra superior                                 | El otro panel de la barra superior se cierra                                                      | H5-E13        |
| RN-28 | El usuario nunca eligió tema                                                 | El sistema se muestra en tema claro                                                               | H6-E1         |
| RN-29 | El usuario cambia el tema                                                    | La preferencia se recuerda y se aplica en la siguiente visita                                      | H6-E4         |
| RN-30 | El sistema se abre en cualquier ancho entre 360 px y 1440 px                  | El contenido se ve sin desplazamiento horizontal                                                    | H7-E1         |
| RN-31 | El ancho de pantalla es de teléfono                                          | El menú lateral se abre como panel deslizable sobre el contenido, sin ocupar espacio fijo           | H7-E4         |
| RN-32 | El usuario elige una sección desde el panel deslizable del menú              | El panel del menú se cierra                                                                        | H7-E5         |
| RN-33 | El usuario presiona Escape con un panel abierto                              | El panel abierto se cierra                                                                         | H7-E16        |
| RN-34 | Se señala la sección activa del menú lateral                                 | La señal no depende únicamente del color                                                            | H7-E19        |
| RN-35 | Las pantallas futuras del sistema se construyan sobre esta entrega           | Reutilizan esta misma estructura y estos mismos estados de carga, vacío y problema                   | —             |
| RN-36 | Se muestra un indicador en esta entrega                                       | Su valor es un dato de ejemplo fijo: no se consulta ningún sistema externo                           | —             |
| RN-37 | El usuario recorre cualquier pantalla de esta entrega                        | Los textos se presentan en español                                                                  | —             |

## Asunciones funcionales — lo que dimos por cierto

> Supuestos de negocio sobre los que se construyó esta especificación y que la
> entrevista no pudo confirmar del todo. **Por favor valídelos**: si alguno es
> falso, observe la spec señalándolo — corregirlo ahora cuesta minutos; en
> código, sprints.

- **AF-1** — Los nombres y el orden de las secciones del menú lateral son "Inicio", "Comercial" (con "Órdenes" y "Clientes"), "Packing" (con "Lotes" y "Despachos"), "Almacén", "Reportes" y "Configuración" (ejercita H1-E2, H1-E3 y H1-E4).
- **AF-2** — Los valores de ejemplo de los cuatro indicadores son 128 órdenes del mes, 45,320 kilos despachados, 37 clientes activos y 9 órdenes pendientes. Son datos de muestra para aprobar la presentación, no cifras reales del negocio (ejercita H3-E2, H3-E5, H3-E7 y H3-E10).
- **AF-3** — El texto de la variación de cada indicador se redacta como "+12% vs. mes anterior", "+8% vs. mes anterior", "Sin cambio vs. mes anterior" y "-3% vs. mes anterior"; es decir, el periodo de comparación es el mes anterior (ejercita H3-E3, H3-E6, H3-E8 y H3-E11).
- **AF-4** — La tendencia se señala con una flecha hacia arriba, una flecha hacia abajo o una raya horizontal, además del color, para que se reconozca sin depender de la vista del color (ejercita H3-E4, H3-E9 y H3-E12).
- **AF-5** — El texto de una tarjeta sin información del periodo es "Sin información para este periodo" (ejercita H4-E4).
- **AF-6** — El texto de una tarjeta que no pudo obtener su dato es "No se pudo obtener este indicador", y la opción para volver a intentarlo se llama "Reintentar" (ejercita H4-E7 y H4-E8).
- **AF-7** — Los estados de carga, vacío y problema de las tarjetas son el contrato que reutilizarán todas las pantallas futuras del sistema; aprobarlos aquí es aprobarlos para el resto del proyecto (ejercita H4-E1, H4-E4 y H4-E7).
- **AF-8** — El título de una sección sin pantalla es "En construcción" y el texto que la acompaña es "La pantalla [Sección] estará disponible en una entrega posterior.", nombrando siempre la sección elegida (ejercita H1-E10 y H1-E11).
- **AF-9** — El texto del aviso al elegir "Cerrar sesión" es "Cerrar sesión estará disponible cuando se integre el inicio de sesión." (ejercita H5-E3).
- **AF-10** — La opción "Mi perfil" del menú de usuario también muestra un aviso honesto, con el texto "Mi perfil estará disponible en una entrega posterior.", ya que la pantalla de perfil está fuera del alcance de esta entrega. La entrevista definió este comportamiento para "Cerrar sesión"; para "Mi perfil" se aplicó el mismo criterio (ejercita H5-E5).
- **AF-11** — Los tres avisos de ejemplo del panel de notificaciones son "La orden OC-2418 de Agroexportadora del Norte quedó pendiente de aprobación.", "El lote L-0912 de palta Hass completó su proceso de packing." y "El despacho DS-3307 con destino Callao salió con 18,400 kilos." Son textos de muestra del negocio agro, no avisos reales (ejercita H5-E8, H5-E9 y H5-E10).
- **AF-12** — El usuario de ejemplo que muestra la barra superior es "Alfredo Anchante"; no representa una sesión real ni un usuario validado por el sistema (ejercita H5-E1).
- **AF-13** — Los avisos del panel no se marcan como leídos al elegirlos y la campana no muestra un contador de avisos sin leer (ejercita H5-E11).
- **AF-14** — Solo un panel de la barra superior queda abierto a la vez: abrir el menú de usuario cierra el panel de notificaciones y viceversa (ejercita H5-E13).
- **AF-15** — El orden de recorrido con la tecla Tab es: opción de colapsar o expandir el menú → secciones del menú lateral en el orden en que se listan → interruptor de tema → campana de notificaciones → avatar del usuario → área de contenido (ejercita H7-E9 a H7-E14).
- **AF-16** — En teléfono el menú lateral se abre como panel deslizable sobre el contenido y se cierra al elegir una sección, al tocar fuera del panel o al presionar Escape (ejercita H7-E4, H7-E5, H7-E6 y H7-E18).
- **AF-17** — En teléfono las cuatro tarjetas de indicador se apilan una debajo de otra y en escritorio se alinean en una sola fila (ejercita H7-E7 y H7-E8).
- **AF-18** — La única preferencia que el sistema recuerda entre visitas es el tema claro u oscuro. El menú lateral colapsado, la sección en la que estaba el usuario y los paneles abiertos no se conservan al recargar (ejercita H6-E4 y H2-E6).
- **AF-19** — Un usuario que nunca eligió tema ve el sistema en tema claro; no se toma la preferencia de tema del equipo del usuario (ejercita H6-E1).
- **AF-20** — Con el menú lateral colapsado, el nombre de la sección aparece como etiqueta al apuntar su icono, para no perder la referencia de qué es cada icono (ejercita H2-E3).
- **AF-21** — Los niveles intermedios de la ruta de navegación ("Comercial", "Packing") no navegan, porque esas secciones no tienen pantalla propia; solo el primer nivel ("Inicio") lleva a una pantalla (ejercita H2-E8).
- **AF-22** — La sección activa del menú lateral se señala con una barra indicadora a su izquierda además del color (ejercita H7-E19).
- **AF-23** — Todo el sistema se presenta en español, con los mismos textos para todos los usuarios; esta entrega no contempla otros idiomas.
- **AF-24** — El sistema se abre directamente, sin exigir inicio de sesión: la spec "Autenticacion / Login Demo" es independiente de esta y su integración es una entrega posterior (ejercita H1-E15).

## Qué NO incluye esta entrega

- Cualquier backend, base de datos o consulta a un sistema externo: los indicadores muestran datos de ejemplo fijos.
- Las pantallas reales de Órdenes, Clientes, Lotes, Despachos, Almacén, Reportes y Configuración: en esta entrega solo muestran el aviso "En construcción".
- Gráficos de tendencia y de composición, y tabla de actividad reciente: se descartaron de forma explícita en la entrevista.
- Roles y permisos diferenciados: todos ven el menú completo y pueden hacer lo mismo.
- Inicio de sesión, cierre de sesión real y protección de pantallas por sesión.
- Notificaciones reales: los tres avisos del panel son de ejemplo, no se marcan como leídos y no se conservan.
- Pantalla de perfil de usuario.
- Buscador global, filtros por periodo y exportación de datos.
- Otros idiomas: la interfaz está en español.
- Mantener el estado entre recargas, salvo la preferencia de tema claro u oscuro.

Cualquiera de estos puntos se puede pedir como una mejora aparte.

## Vea cómo quedará en el sistema

Junto con este documento se adjunta un **mockup navegable**
(`.specs/Layout/mockups/layout-base-y-dashboard-mockup.html`, se genera en el paso
siguiente a esta spec): ábralo con doble clic y recorra el sistema como si ya
existiera. Le sugerimos revisar, en este orden:

1. La pantalla "Inicio" con las cuatro tarjetas de indicador: confirme los nombres, los valores de ejemplo y los textos de variación.
2. El menú lateral: despliegue "Comercial" y "Packing", entre a "Órdenes" y verifique que la barra superior diga "Órdenes", que la ruta de navegación diga "Inicio / Comercial / Órdenes" y que el aviso diga "La pantalla Órdenes estará disponible en una entrega posterior."
3. La opción de colapsar el menú y volver a expandirlo.
4. Los estados de las tarjetas: recorra carga, vacío y problema, y pruebe la opción "Reintentar".
5. La campana de notificaciones y el menú de usuario, con sus avisos.
6. El interruptor de tema claro y oscuro.
7. La vista en teléfono, para ver el menú lateral como panel deslizable.

Es una maqueta con datos de ejemplo, no el sistema real; lo que usted apruebe ahí
es lo que se construirá — y, por ser la estructura base, es lo que reutilizarán
todas las pantallas del sistema.

## Changelog

| Revisión | Fecha            | Autor                            | Cambio       | Motivo                                    |
|----------|------------------|----------------------------------|--------------|-------------------------------------------|
| 1        | 2026-07-31 08:59 | Alfredo Alonso Anchante Moreno   | Spec creada  | Historia inicial (tarea ClickUp SP-3064)  |
