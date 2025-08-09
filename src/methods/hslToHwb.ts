import type { HslObj, HwbObj } from '../spectrum.types';
import _validateValue from '../utils/_validateValue';

/**
 * Converts a color from HSL color space to HWB object
 * @see {@link https://spectrum.snipshot.dev/docs/hsl-to-hwb/ | Spectrum API | hslToHwb()}
 *
 * @param hslObj - A HSL color object
 * @returns A HWB color object
 *
 * For conversion formula
 * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae | Wikipedia | HSL and HSV}
 * @see {@link https://en.wikipedia.org/wiki/HWB_color_model#conversion | Wikipedia | HWB color model}
 */
function hslToHwb(hslObj: HslObj): HwbObj {
  const { h: hue, s: saturation, l: lightness, a: alpha } = hslObj;

  const h = _validateValue('hue', hue);
  const s = _validateValue('saturation', saturation);
  const l = _validateValue('lightness', lightness);
  const a = _validateValue('alpha', alpha);

  // interim convertion to hsv
  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  // from hsv to hwb
  const w = (1 - sv) * v;
  const b = 1 - v;

  return { h, w: Number(w.toFixed(2)), b: Number(b.toFixed(2)), a };
}

export default hslToHwb;
