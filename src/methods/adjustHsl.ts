import Spectrum from '../spectrum';
import _checkNumericValue from '../utils/_checkNumericValue';
import _checkPercentValue from '../utils/_checkPercentValue';
import _clampValues from '../utils/_clampValues';
import _sumFloat from '../utils/_sumFloat';

interface HslOptions {
  hue?: number;
  saturation?: string;
  lightness?: string;
  alpha?: number;
}

/**
 * Adjusts the HSL values of a color object based on the provided options.
 * Returns a new `Spectrum` instance with the updated HSL values.
 * @see {@link https://spectrum.snipshot.dev/docs/adjust-hsl/ | Spectrum API | adjustHsl()}
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
    _checkPercentValue(saturation, 'saturation');

    const adjustmentValue = Math.round(parseInt(saturation)) / 100;
    hslObj.s = _clampValues(0, 1, _sumFloat(hslObj.s, adjustmentValue)); // valid range [0; 1]
  }

  if (lightness !== undefined) {
    _checkPercentValue(lightness, 'lightness');

    const adjustmentValue = Math.round(parseInt(lightness)) / 100;
    hslObj.l = _clampValues(0, 1, _sumFloat(hslObj.l, adjustmentValue)); // valid range [0; 1]
  }

  if (alpha !== undefined) {
    _checkNumericValue(alpha, 'Alpha');

    hslObj.a = _clampValues(0, 1, _sumFloat(hslObj.a, alpha)); // valid range [0; 1]
  }

  return Spectrum.fromHslObj(hslObj);
}

export default adjustHsl;
