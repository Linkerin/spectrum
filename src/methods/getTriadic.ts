import Spectrum from '../spectrum';

/**
 * Generates triadic color combinations of a given color
 * @see {@link https://spectrum.snipshot.dev/docs/get-triadic/ | Spectrum API | getTriadic()}
 *
 * @param {Spectrum} colorObj - The input color, `Spectrum` instance.
 * @returns An array containing `Spectrum` instances for two generated colors
 * @throws {TypeError} - If the `colorObj` is not an instance of `Spectrum`
 *
 * For more information about split complementary colors:
 * @see {@link https://www.color-meanings.com/triadic-colors/ | Color Meanings }
 */
function getTriadic(colorObj: Spectrum): [Spectrum, Spectrum] {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const { h, ...rest } = colorObj.hsl;

  const deg = 120;
  const hue1 = (h + deg) % 360;
  const hue2 = (h + deg * 2) % 360;

  const secondary = Spectrum.fromHslObj({ h: hue1, ...rest });
  const tertiary = Spectrum.fromHslObj({ h: hue2, ...rest });

  return [secondary, tertiary];
}

export default getTriadic;
