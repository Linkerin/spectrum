export interface RgbChangeOptions {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number | string;
}

export type ColorSpace = 'hex' | 'hsl' | 'rgb';

export interface HslObj {
  h: number;
  s: number;
  l: number;
  a: number;
}

export type InputValue = string | Array<string | number>;

export interface RgbObj {
  r: number;
  g: number;
  b: number;
  a: number;
}
