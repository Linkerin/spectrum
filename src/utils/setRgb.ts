import { RgbChangeOptions } from '../spectrum.types.js';
import Spectrum from '../spectrum';
import validateValue from './validateValue';

/**
 * Modifies the RGB values of a color from the Spectrum instance.
 * Returns a new `Spectrum` instance with the updated RGB values.
 *
 * @param colorObj - An instance of the `Spectrum` class representing a color
 * @param options - An object containing optional red, green, blue, and alpha values.
 * @param options.red - The new red value for the color (0-255).
 * @param options.green - The new green value for the color (0-255).
 * @param options.blue - The new blue value for the color (0-255).
 * @param options.alpha - The new alpha value for the color (0-1).
 * @returns {Spectrum} A new Spectrum object with the updated RGB values.
 * @throws {TypeError} - If colorObj is not an instance of Spectrum class.
 */
function setRgb(colorObj: Spectrum, options: RgbChangeOptions): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const rgbObj = { ...colorObj.rgb };
  const validKeys = ['red', 'green', 'blue'];

  for (let [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      if (key !== 'alpha' && validKeys.includes(key)) {
        const channel = key[0].toLowerCase() as 'r' | 'g' | 'b';
        rgbObj[channel] = validateValue('rgb', value);
      }
    }

    if (key === 'alpha') {
      rgbObj.a = validateValue('alpha', value);
    }
  }

  return Spectrum.fromRgbObj(rgbObj);
}

export default setRgb;
