import Spectrum from '../spectrum';
import validateValue, { ValidationKeyType } from './validateValue';

export interface HslOptions {
  hue?: number;
  saturation?: number | string;
  lightness?: number | string;
  alpha?: number | string;
}

/**
 * Modifies the HSL values of a color from the Spectrum instance.
 * Returns a new `Spectrum` instance with the updated HSL values.
 *
 * @param colorObj - An instance of the `Spectrum` class representing a color
 * @param options - An object containing optional hue, saturation, lightness, and alpha values.
 * @param options.hue - The value that will be set as a hue value of the color, number in range [0; 360]
 * @param options.saturation - The value that will be set as a saturation value of the color.
 * Should be a percentage string in the range ['0%', '100%'] or a number in the range [0, 1].
 * @param options.lightness - The value that will be set as a lightness value of the color.
 * Should be a percentage string in the range ['0%', '100%'] or a number in the range [0, 1].
 * @param options.alpha - he value that will be set as a hue value of the color.
 * Should be a percentage string in the range ['0%', '100%'] or a number in the range [0, 1].
 * @returns {Spectrum} A new Spectrum object with the updated HSL values.
 * @throws {TypeError} - If colorObj is not an instance of the Spectrum class.
 */
function setHsl(colorObj: Spectrum, options: HslOptions): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  let hslObj = { ...colorObj.hsl };
  const validKeys = ['hue', 'saturation', 'lightness', 'alpha'];

  for (let [key, value] of Object.entries(options)) {
    if (value !== undefined && validKeys.includes(key)) {
      const channel = key[0].toLowerCase() as 'h' | 's' | 'l' | 'a';
      hslObj[channel] = validateValue(
        key as Exclude<ValidationKeyType, 'rgb'>,
        value
      );
    }
  }

  return Spectrum.fromHslObj(hslObj);
}

export default setHsl;
