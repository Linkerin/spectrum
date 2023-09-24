import Spectrum from '../spectrum';
import setHsl from './setHsl';

/**
 * Creates a palette object based on a given `Spectrum` instance.
 * Each key in the palette object represents a lightness value from 0 to 100,
 * and the corresponding value is a `Spectrum` object.
 * @see {@link https://spectrum.snipshot.dev/docs/create-palette/ | Spectrum API | createPalette()}
 *
 * @param {Spectrum} colorObj - The base color for the palette as a Spectrum object.
 * @returns A palette object with lightness values from 0 to 100 as keys and corresponding Spectrum objects.
 * @throws {TypeError} If the `colorObj` parameter is not an instance of the `Spectrum` class.
 *
 * @example
 * const color = new Spectrum('hsl', [180, 0.5, 0.42, 1]);
 * const palette = createPalette(color);
 * console.log(palette[0].hsl); // { h: 180, s: 0.5, l: 0, a: 1 }
 * console.log(palette[50].hsl); // { h: 180, s: 0.5, l: 0.5, a: 1 }
 * console.log(palette[100].hsl); // { h: 180, s: 0.5, l: 1, a: 1 }
 */
function createPalette(colorObj: Spectrum) {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const palette: Record<string, Spectrum> = {};

  for (let i = 0; i <= 100; i++) {
    palette[i] = setHsl(colorObj, { lightness: `${i}%` });
  }

  return palette;
}

export default createPalette;
