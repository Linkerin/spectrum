export interface RgbChangeOptions {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number | string;
}

/**
 * Color spaces supported by `Spectrum` constructor
 */
export type ColorSpace = 'hex' | 'hsl' | 'rgb';

/**
 * Generated HSL object type
 */
export interface HslObj {
  h: number;
  s: number;
  l: number;
  a: number;
}

/**
 * User input color value
 */
export type InputValue = string | Array<string | number>;

/**
 * Generated RGB object type
 */
export interface RgbObj {
  r: number;
  g: number;
  b: number;
  a: number;
}
