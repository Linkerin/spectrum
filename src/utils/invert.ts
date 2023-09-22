import colorMix from './colorMix';
import Spectrum from '../spectrum';
import _checkWeightValue from './_checkWeightValue';

/**
 * Inverts the color of a `Spectrum` instance according to the weight
 * and returns a new `Spectrum` instance
 *
 * @param {Spectrum} colorObj - The original color
 * @param {number} weight - The weight of the inverted color in the final result.
 * Must be a number between 0 and 1
 * @returns {Spectrum} A new `Spectrum` instance representing the inverted color
 * @throws {TypeError} If `colorObj` is not an instance of `Spectrum` class
 * @throws {Error} If the weight is not a valid number
 */
function invert(colorObj: Spectrum, weight: number): Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError(
      'Color values have to be an instance of Spectrum class'
    );
  }

  _checkWeightValue(weight);

  const { r, g, b } = colorObj.rgb;
  const invertedColor = new Spectrum('rgb', [255 - r, 255 - g, 255 - b]);

  return colorMix(invertedColor, colorObj, weight);
}

export default invert;
