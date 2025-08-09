import Spectrum from '../spectrum';
import _multiplyFloat from '../utils/_multiplyFloat';
import _validateValue from '../utils/_validateValue';

interface HwbOptions {
  hue?: number;
  whiteness?: number | string;
  blackness?: number | string;
  alpha?: number | string;
}

export const SET_HWB_WARNING =
  'setHwb: whiteness + blackness ≥ 100%, resulting color will be gray and normalized.';

/**
 * Modifies the HWB values of a color from the Spectrum instance.
 * Returns a new `Spectrum` instance with the updated HWB values.
 * @see {@link https://spectrum.snipshot.dev/docs/set-hwb/ | Spectrum API | setHwb()}
 *
 * @param colorObj - An instance of the `Spectrum` class representing a color
 * @param options - An object containing optional hue, whiteness, blackness, and alpha values.
 * @param options.hue - The value that will be set as a hue value of the color, number in range [0; 360]
 * @param options.whiteness - The value that will be set as a whiteness value of the color.
 * Should be a percentage string in the range ['0%', '100%'] or a number in the range [0, 1].
 * @param options.blackness - The value that will be set as a blackness value of the color.
 * Should be a percentage string in the range ['0%', '100%'] or a number in the range [0, 1].
 * @param options.alpha - The value that will be set as an alpha value of the color.
 * Should be a percentage string in the range ['0%', '100%'] or a number in the range [0, 1].
 * @returns {Spectrum} A new Spectrum object with the updated HWB values.
 * @throws {TypeError} - If `colorObj` is not an instance of the Spectrum class.
 */
function setHwb(colorObj: Spectrum, options: HwbOptions): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const hwbObj = { ...colorObj.hwb };

  const isSettingW = typeof options.whiteness !== 'undefined';
  const isSettingB = typeof options.blackness !== 'undefined';

  if (isSettingW || isSettingB) {
    const w = isSettingW
      ? _validateValue('whiteness', options.whiteness)
      : hwbObj.w;
    const b = isSettingB
      ? _validateValue('blackness', options.blackness)
      : hwbObj.b;
    const sum = w + b;

    if (sum >= 1) {
      console.warn(SET_HWB_WARNING);

      const ratio = 1 / sum;
      hwbObj.w = _multiplyFloat(w, ratio);
      hwbObj.b = _multiplyFloat(b, ratio);
    } else {
      if (isSettingW) hwbObj.w = w;
      if (isSettingB) hwbObj.b = b;
    }
  }

  if (typeof options.hue !== 'undefined') {
    hwbObj.h = _validateValue('hue', options.hue);
  }

  if (typeof options.alpha !== 'undefined') {
    hwbObj.a = _validateValue('alpha', options.alpha);
  }

  return Spectrum.fromHwbObj(hwbObj);
}

export default setHwb;
