import Spectrum from '../spectrum';
import _checkNumericValue from '../utils/_checkNumericValue';
import _checkPercentValue from '../utils/_checkPercentValue';
import _clampValues from '../utils/_clampValues';
import _multiplyFloat from '../utils/_multiplyFloat';
import _sumFloat from '../utils/_sumFloat';

export interface HwbOptions {
  hue?: number;
  whiteness?: string;
  blackness?: string;
  alpha?: number;
}

export const ADJUST_HWB_WARNING =
  'adjustHwb: whiteness + blackness ≥ 100%, resulting color will be gray and normalized.';

/**
 * Adjusts the HWB values of a color object based on the provided options.
 * Returns a new `Spectrum` instance with the updated HWB values.
 * @see {@link https://spectrum.snipshot.dev/docs/adjust-hwb/ | Spectrum API | adjustHwb()}
 *
 * @param {Spectrum} colorObj - Instance of `Spectrum` to adjust.
 * @param options - An object containing optional properties for adjusting the HWB values
 * @param options.hue - The amount by which to adjust the hue value of the color, number in range [-360; 360]
 * @param options.whiteness - The amount by which to adjust the whiteness value of the color.
 * Should be a percentage string in the range ['-100%', '100%'].
 * @param options.blackness - The amount by which to adjust the blackness value of the color.
 * Should be a percentage string in the range ['-100%', '100%'].
 * @param options.alpha - The amount by which to adjust the alpha value of the color, number in range [-1; 1].
 * @returns {Spectrum} A new `Spectrum` instance with the adjusted HWB values.
 * @throws {TypeError} If the `colorObj` is not an instance of the Spectrum class.
 */
function adjustHsl(
  colorObj: Spectrum,
  { hue, whiteness, blackness, alpha }: HwbOptions
): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const hwbObj = { ...colorObj.hwb };

  if (hue !== undefined) {
    _checkNumericValue(hue, 'Hue');

    hwbObj.h = _clampValues(0, 360, Math.round(hwbObj.h + hue)); // valid range [0; 360]
  }

  if (whiteness !== undefined) {
    _checkPercentValue(whiteness, 'whiteness');

    const adjustmentValue = Math.round(parseInt(whiteness)) / 100;
    hwbObj.w = _clampValues(0, 1, _sumFloat(hwbObj.w, adjustmentValue)); // valid range [0; 1]
  }

  if (blackness !== undefined) {
    _checkPercentValue(blackness, 'blackness');

    const adjustmentValue = Math.round(parseInt(blackness)) / 100;
    hwbObj.b = _clampValues(0, 1, _sumFloat(hwbObj.b, adjustmentValue)); // valid range [0; 1]
  }

  if (alpha !== undefined) {
    _checkNumericValue(alpha, 'Alpha');

    hwbObj.a = _clampValues(0, 1, _sumFloat(hwbObj.a, alpha)); // valid range [0; 1]
  }

  const sumOfWAndB = hwbObj.w + hwbObj.b;
  if (sumOfWAndB >= 1) {
    console.warn(ADJUST_HWB_WARNING);

    const ratio = 1 / sumOfWAndB;
    hwbObj.w = _multiplyFloat(hwbObj.w, ratio);
    hwbObj.b = _multiplyFloat(hwbObj.b, ratio);
  }

  return Spectrum.fromHwbObj(hwbObj);
}

export default adjustHsl;
