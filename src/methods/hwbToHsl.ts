import type { HslObj, HwbObj } from '../spectrum.types';
import _multiplyFloat from '../utils/_multiplyFloat';
import _validateValue from '../utils/_validateValue';

/**
 * Converts a color from HWB color space to HSL object
 * @see {@link https://spectrum.snipshot.dev/docs/hwb-to-hsl/ | Spectrum API | hwbToHsl()}
 *
 * @param hwbObj - A HWB color object
 * @returns A HSL color object
 *
 * For conversion formula
 * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae | Wikipedia | HSL and HSV}
 * @see {@link https://en.wikipedia.org/wiki/HWB_color_model#conversion | Wikipedia | HWB color model}
 */
function hwbToHsl(hwbObj: HwbObj): HslObj {
  const { h: hue, w: whiteness, b: blackness, a: alpha } = hwbObj;

  const h = _validateValue('hue', hue);
  let w = _validateValue('whiteness', whiteness);
  let b = _validateValue('blackness', blackness);
  const a = _validateValue('alpha', alpha);

  const sum = w + b;
  if (sum >= 1) {
    const ratio = 1 / sum;
    w = _multiplyFloat(w, ratio);
    b = _multiplyFloat(b, ratio);
  }

  // interim convertion to hsv
  const sv = b === 1 ? 0 : 1 - w / (1 - b);
  const v = 1 - b;

  // from hsv to hsl
  const l = v * (1 - Number(sv.toFixed(10)) / 2);
  let s: number;
  if (l === 0 || l === 1) {
    s = 0;
  } else {
    s = (v - l) / Math.min(l, 1 - l);
  }

  return { h, s: Number(s.toFixed(2)), l: Number(l.toFixed(2)), a };
}

export default hwbToHsl;
