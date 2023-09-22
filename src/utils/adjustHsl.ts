import Spectrum from '../spectrum';
import _checkNumericValue from './_checkNumericValue';
import _clampValues from './_clampValues';

export interface HslOptions {
  hue?: number;
  saturation?: string;
  lightness?: string;
  alpha?: number;
}

/**
 * Validates the saturation and lightness percentage values
 *
 * @param {string} value - The value to be validated
 * @param type - The type of value being validated, either 'Saturation' or 'Lightness'
 * @throws {Error} If the value is not a string or does not match the required format
 * @returns {boolean} `true` if the check is passed otherwise throws an error
 */
export function _checkSAndLValue(
  value: string,
  type: 'Saturation' | 'Lightness'
): boolean {
  const percentRangeRegExp = new RegExp(/^[+-]?\d{1,2}(\.\d+)?%|100(\.0+)?%$/);
  if (typeof value !== 'string') {
    throw new Error(
      `Invalid value: '${value}'. ${type} value has to be a string`
    );
  }

  if (!percentRangeRegExp.test(value)) {
    throw new Error(
      `Invalid value: '${value}'. ${type} value has to be a percent in range [-100%; 100%]`
    );
  }

  return true;
}

/**
 * Adjusts the HSL values of a color object based on the provided options.
 * Returns a new `Spectrum` instance with the updated HSL values.
 *
 * @param {Spectrum} colorObj - Instance of `Spectrum` to adjust.
 * @param options - An object containing optional properties for adjusting the HSL values
 * @param options.hue - The amount by which to adjust the hue value of the color, number in range [-360; 360]
 * @param options.saturation - The amount by which to adjust the saturation value of the color.
 * Should be a percentage string in the range ['-100%', '100%'].
 * @param options.lightness - The amount by which to adjust the lightness value of the color.
 * Should be a percentage string in the range ['-100%', '100%'].
 * @param options.alpha - The amount by which to adjust the alpha value of the color, number in range [-1; 1].
 * @returns {Spectrum} A new `Spectrum` instance with the adjusted HSL values.
 * @throws {TypeError} If the `colorObj` is not an instance of the Spectrum class.
 */
function adjustHsl(
  colorObj: Spectrum,
  { hue, saturation, lightness, alpha }: HslOptions
): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const hslObj = { ...colorObj.hsl };

  if (hue !== undefined) {
    _checkNumericValue(hue, 'Hue');

    hslObj.h = _clampValues(0, 360, Math.round(hslObj.h + hue)); // valid range [0; 360]
  }

  if (saturation !== undefined) {
    _checkSAndLValue(saturation, 'Saturation');

    const adjustmentValue = Math.round(parseInt(saturation)) / 100;
    hslObj.s = _clampValues(0, 1, hslObj.s + adjustmentValue); // valid range [0; 1]
  }

  if (lightness !== undefined) {
    _checkSAndLValue(lightness, 'Lightness');

    const adjustmentValue = Math.round(parseInt(lightness)) / 100;
    hslObj.l = _clampValues(0, 1, hslObj.l + adjustmentValue); // valid range [0; 1]
  }

  if (alpha !== undefined) {
    _checkNumericValue(alpha, 'Alpha');

    hslObj.a = _clampValues(0, 1, Number((hslObj.a + alpha).toFixed(2))); // valid range [0; 1]
  }

  return Spectrum.fromHslObj(hslObj);
}

export default adjustHsl;
