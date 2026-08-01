/**
 * Textos literales de estado y placeholder, centralizados en español (A-10).
 *
 * Estos literales **son criterio de aceptación** (AF-5, AF-6, AF-8, AF-9,
 * AF-10): el componente y su prueba deben leer la misma constante desde este
 * archivo, para que Verify no pueda pasar con un texto mientras la UI muestra
 * otro. Copiados EXACTAMENTE de la spec funcional — no parafrasear.
 *
 * No es una capa de i18n (AF-23 excluye otros idiomas en esta entrega).
 */

/**
 * Textos de los estados "vacío" y "problema" de `TarjetaIndicador` (H4).
 */
export const textosIndicador = {
  /** Estado vacío: el indicador no tiene información para el periodo (AF-5, H4-E4). */
  vacio: 'Sin información para este periodo',
  /** Estado problema: el indicador no se pudo obtener (AF-6, H4-E7). */
  error: 'No se pudo obtener este indicador',
  /** Opción para reintentar la obtención del indicador (AF-6, H4-E8). */
  reintentar: 'Reintentar',
} as const;

/**
 * Textos del aviso "En construcción" que muestra `EnConstruccion` para toda
 * sección sin pantalla propia en esta entrega (AF-8, H1-E10, H1-E11).
 */
export const textosEnConstruccion = {
  /** Título del aviso, igual para cualquier sección (AF-8, H1-E10). */
  titulo: 'En construcción',
  /**
   * Texto que nombra la sección elegida (AF-8, H1-E11). Ejemplos en la spec:
   * "La pantalla Órdenes estará disponible en una entrega posterior.",
   * "La pantalla Clientes estará disponible en una entrega posterior.",
   * "La pantalla Almacén estará disponible en una entrega posterior.",
   * "La pantalla Configuración estará disponible en una entrega posterior."
   */
  descripcion: (nombreSeccion: string): string =>
    `La pantalla ${nombreSeccion} estará disponible en una entrega posterior.`,
} as const;

/**
 * Avisos honestos del menú de usuario (`MenuUsuario`): las dos opciones están
 * fuera de alcance en esta entrega y lo dicen sin sacar al usuario del
 * sistema (H5).
 */
export const textosMenuUsuario = {
  /** Aviso al elegir "Cerrar sesión" (AF-9, H5-E3). */
  cerrarSesion:
    'Cerrar sesión estará disponible cuando se integre el inicio de sesión.',
  /** Aviso al elegir "Mi perfil" (AF-10, H5-E5). */
  miPerfil: 'Mi perfil estará disponible en una entrega posterior.',
} as const;
