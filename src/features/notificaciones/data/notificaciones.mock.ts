/**
 * Datos de ejemplo del panel "Notificaciones" (H5-E7…H5-E10, AF-11).
 *
 * Son avisos de muestra del negocio agro, no notificaciones reales: no se
 * marcan como leídos ni se quitan del panel al elegirlos (AF-13, RN-26).
 *
 * El tipo del aviso vive aquí porque, al momento de esta tarea, todavía no
 * existe declarado en otro archivo del módulo (pertenece a esta tarea).
 */

/** Un aviso de ejemplo del panel de notificaciones. */
export interface AvisoNotificacion {
  /** Identificador estable del aviso, usado como `key` en el listado. */
  id: string;
  /** Texto literal del aviso (AF-11) — no parafrasear. */
  mensaje: string;
}

/**
 * Los tres avisos de ejemplo del panel de notificaciones, en el orden
 * exacto que exige la spec (H5-E8, H5-E9, H5-E10). Textos literales de
 * AF-11: coinciden palabra por palabra con la spec funcional aprobada.
 */
export const notificacionesMock: AvisoNotificacion[] = [
  {
    id: 'notif-orden-oc-2418',
    mensaje:
      'La orden OC-2418 de Agroexportadora del Norte quedó pendiente de aprobación.',
  },
  {
    id: 'notif-lote-l-0912',
    mensaje: 'El lote L-0912 de palta Hass completó su proceso de packing.',
  },
  {
    id: 'notif-despacho-ds-3307',
    mensaje: 'El despacho DS-3307 con destino Callao salió con 18,400 kilos.',
  },
];
