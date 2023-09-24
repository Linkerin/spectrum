import Spectrum from '../spectrum';
import _checkWeightValue from '../utils/_checkWeightValue';

/**
 * Mixes two RGB colors according to the weight
 * and returns a new `Spectrum` instance with the resulting color.
 *
 * @param {Spectrum} color1 - The first color to mix, `Spectrum` instance.
 * @param {Spectrum} color2 - The second color to mix, `Spectrum` instance.
 * @param {number} weight - The weight of the first color in the mixture. Must be a number between 0 and 1.
 * @returns {Spectrum} A new `Spectrum` instance representing the mixed color.
 * @throws {TypeError} If `color1` or `color2` is not an instance of the `Spectrum` class.
 * @throws {Error} If weight is not a valid weight value.
 */
function colorMix(
  color1: Spectrum,
  color2: Spectrum,
  weight: number
): Spectrum {
  if (!(color1 instanceof Spectrum) || !(color2 instanceof Spectrum)) {
    throw new TypeError(
      'Color values have to be an instance of Spectrum class'
    );
  }

  _checkWeightValue(weight);

  const r = Math.round(color1.red * weight + color2.red * (1 - weight));
  const g = Math.round(color1.green * weight + color2.green * (1 - weight));
  const b = Math.round(color1.blue * weight + color2.blue * (1 - weight));
  const a = Number(
    (color1.alpha * weight + color2.alpha * (1 - weight)).toFixed(2)
  );

  return Spectrum.fromRgbObj({ r, g, b, a });
}

export default colorMix;
