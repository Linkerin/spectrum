import type { CSS_NAMED_COLORS } from './lib/constants';

export interface RgbChangeOptions {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number | string;
}

/** Color spaces supported by `Spectrum` constructor */
export type ColorSpace = 'hex' | 'hsl' | 'hwb' | 'rgb';

/**
 * CSS named colors supported by `Spectrum` constructor
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/named-color | MDN | \<named-color\>}
 */
export type CssNamedColor = keyof typeof CSS_NAMED_COLORS;

/**
 * Generated HSL object type
 * @see {@link https://spectrum.snipshot.dev/docs/types#hslobj/ | Spectrum API | Types - HslObj}
 */
export interface HslObj {
  h: number;
  s: number;
  l: number;
  a: number;
}

/**
 * Generated HWB object type
 * @see {@link https://spectrum.snipshot.dev/docs/types#hwbobj/ | Spectrum API | Types - HwbObj}
 */
export interface HwbObj {
  h: number;
  w: number;
  b: number;
  a: number;
}

/**
 * User input color value
 */
export type InputValue = string | Array<string | number>;

/**
 * Generated RGB object type
 * @see {@link https://spectrum.snipshot.dev/docs/types#rgbobj/ | Spectrum API | Types - RgbObj}
 */
export interface RgbObj {
  r: number;
  g: number;
  b: number;
  a: number;
}
