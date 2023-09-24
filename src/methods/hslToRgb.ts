import { HslObj, RgbObj } from '../spectrum.types';
import _validateValue from '../utils/_validateValue';

/**
 * Converts a color from HSL color space to RGB object
 *
 * @param hslObj - A HSL color object
 * @returns An RGB color object
 *
 * For conversion formula
 * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae | Wikipedia | HSL and HSV}
 */
function hslToRgb(hslObj: HslObj): RgbObj {
  const { h: hue, s: saturation, l: lightness, a: alpha } = hslObj;

  const h = _validateValue('hue', hue);
  const s = _validateValue('saturation', saturation);
  const l = _validateValue('lightness', lightness);
  const a = _validateValue('alpha', alpha);

  const chroma = s * (1 - Math.abs(2 * l - 1));
  const hPrime = h / 60;
  const x = chroma * (1 - Math.abs(Number((hPrime % 2).toFixed(10)) - 1));
  const m = l - chroma * 0.5;

  const withLight = (r: number, g: number, b: number) => ({
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a
  });

  if (hPrime < 1) return withLight(chroma, x, 0);
  if (hPrime < 2) return withLight(x, chroma, 0);
  if (hPrime < 3) return withLight(0, chroma, x);
  if (hPrime < 4) return withLight(0, x, chroma);
  if (hPrime < 5) return withLight(x, 0, chroma);
  if (hPrime <= 6) return withLight(chroma, 0, x);

  throw new Error('Invalid HSL calculation: hue value is greater than 360');
}

export default hslToRgb;
