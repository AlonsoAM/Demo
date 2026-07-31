/**
 * Setup global de Vitest (referenciado desde vite.config.ts → test.setupFiles).
 *
 * - Extiende `expect` con los matchers de @testing-library/jest-dom.
 * - Limpia el DOM montado por Testing Library después de cada test.
 * - Provee un mock controlable de `window.matchMedia` (jsdom no lo implementa),
 *   con helpers para simular anchos de viewport (T8.11) y
 *   `prefers-reduced-motion` (T8.9). Cada test puede cambiar la respuesta
 *   con `setMatchMediaImpl` / `mockViewportWidth` / `mockPrefersReducedMotion`;
 *   por defecto (antes de cada test) ninguna media query matchea.
 */
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

type MatchMediaImpl = (query: string) => boolean

let matchMediaImpl: MatchMediaImpl = () => false

/** Reemplaza la lógica que decide si una media query matchea. */
export function setMatchMediaImpl(impl: MatchMediaImpl): void {
  matchMediaImpl = impl
}

/**
 * Simula un ancho de viewport (ej. 360 / 1440) para queries del tipo
 * `(min-width: Npx)` / `(max-width: Npx)`.
 */
export function mockViewportWidth(width: number): void {
  setMatchMediaImpl((query) => {
    const min = query.match(/min-width:\s*(\d+)px/)
    const max = query.match(/max-width:\s*(\d+)px/)
    if (!min && !max) return false
    if (min && width < Number(min[1])) return false
    if (max && width > Number(max[1])) return false
    return true
  })
}

/** Simula la preferencia `prefers-reduced-motion: reduce` (true) o `no-preference` (false). */
export function mockPrefersReducedMotion(reduced: boolean): void {
  setMatchMediaImpl((query) =>
    query.includes('prefers-reduced-motion') ? reduced : false,
  )
}

beforeEach(() => {
  // Reset entre tests: ninguna media query matchea hasta que el test lo configure.
  matchMediaImpl = () => false
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string): MediaQueryList => ({
    matches: matchMediaImpl(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
