// The ShortForge mark: a minimal anvil, three filled shapes, no strokes.
// Single source of truth for LogoMark, apple-icon, and the OG image.
// src/app/icon.svg is a hand-copied static version. Keep it in sync.

export const ANVIL_VIEWBOX = '0 0 64 64';

export const ANVIL_PATHS = [
  // Face, with the horn tapering to a rounded point on the left.
  'M24 14 H57 C59.8 14 62 16.2 62 19 V27 C62 28.7 60.7 30 59 30 H24 L6 24.5 C3.3 23.7 3.3 20 6 19.2 L24 14 Z',
  // Waist.
  'M31 30 H49 L47 40 H33 Z',
  // Base and foot.
  'M26 40 H54 L60 50 H63 V55.5 H17 V50 H20 Z',
] as const;
