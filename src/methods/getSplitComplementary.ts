import Spectrum from '../spectrum';

/**
 * Generates the split complementary colors of a given color
 * @see {@link https://spectrum.snipshot.dev/docs/get-split-complementary/ | Spectrum API | getSplitComplementary()}
 *
 * @param {Spectrum} colorObj - The input color, `Spectrum` instance.
 * @returns An object containing `Spectrum` instances for a `secondary`
 * and a `tertiary` color
 * @throws {TypeError} - If the `colorObj` is not an instance of `Spectrum`
 *
 * For more information about split complementary colors:
 * @see {@link https://www.color-meanings.com/split-complementary-colors/ | Color Meanings }
 */
function getSplitComplementary(colorObj: Spectrum): {
  secondary: Spectrum;
  tertiary: Spectrum;
} {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const { h, ...rest } = colorObj.hsl;

  const hue1 = (h + 150) % 360;
  const hue2 = (h + 210) % 360;

  const secondary = Spectrum.fromHslObj({ h: hue1, ...rest });
  const tertiary = Spectrum.fromHslObj({ h: hue2, ...rest });

  return { secondary, tertiary };
}

export default getSplitComplementary;
