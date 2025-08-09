import Spectrum from '../spectrum';
import type { RgbChangeOptions } from '../spectrum.types';
import _checkNumericValue from '../utils/_checkNumericValue';
import _clampValues from '../utils/_clampValues';
import _sumFloat from '../utils/_sumFloat';

interface RgbOptions extends Omit<RgbChangeOptions, 'alpha'> {
  alpha?: number;
}

/**
 * Adjusts the RGB values of a color object based on the provided options.
 * Returns a new `Spectrum` instance with the updated RGB values.
 * @see {@link https://spectrum.snipshot.dev/docs/adjust-rgb/ | Spectrum API | adjustRgb()}
 *
 * @param {Spectrum} colorObj - Instance of `Spectrum` to adjust.
 * @param options - An object containing optional properties for adjusting the RGB values
 * @param options.red - The amount to adjust the red value of the color object.
 * @param options.green - The amount to adjust the green value of the color object.
 * @param options.blue - The amount to adjust the blue value of the color object.
 * @param options.alpha - The amount to adjust the alpha value of the color object.
 * @returns {Spectrum} A new `Spectrum` instance with the adjusted RGB values.
 * @throws {TypeError} If `colorObj` is not an instance of the `Spectrum` class.
 *
 * @example
 * const color = new Spectrum('rgb', [255, 0, 0, 1]);
 * const adjustedColor = adjustRgb(color, { red: -50, alpha: 0.5 });
 * console.log(adjustedColor.rgb); // { r: 205, g: 0, b: 0, a: 0.5 }
 */
function adjustRgb(colorObj: Spectrum, options: RgbOptions): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }
  const rgbObj = { ...colorObj.rgb };
  const validKeys = ['red', 'green', 'blue'];

  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      if (key !== 'alpha' && validKeys.includes(key)) {
        const channel = key[0].toLowerCase() as 'r' | 'g' | 'b';
        _checkNumericValue(value, 'RGB');
        rgbObj[channel] = _clampValues(
          0,
          255,
          Math.round(rgbObj[channel] + value)
        );
      }

      if (key === 'alpha') {
        _checkNumericValue(value, 'Alpha');
        rgbObj.a = _clampValues(0, 1, _sumFloat(rgbObj.a, value));
      }
    }
  }
  return Spectrum.fromRgbObj(rgbObj);
}

export default adjustRgb;
