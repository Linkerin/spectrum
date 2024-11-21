import Spectrum from '../spectrum';

export interface OnBgColorOptions {
  dark: string | Spectrum;
  light: string | Spectrum;
}

/**
 * Determines whether to use a dark or light color
 * based on the intensity of the background color provided
 * @see {@link https://spectrum.snipshot.dev/docs/on-bg-color/ | Spectrum API | onBgColor()}
 *
 * @param {Spectrum} colorObj - An instance of the Spectrum class representing the background color
 * @param {OnBgColorOptions} options - An object with dark and light properties,
 * which can be either a string representing a color or an instance of the Spectrum class.
 * @returns The dark or light value provided based on the intensity of the background color
 * @throws TypeError if colorObj is not an instance of the Spectrum class
 */
function onBgColor(
  colorObj: Spectrum,
  { dark, light }: OnBgColorOptions
): string | Spectrum {
  if (!(colorObj instanceof Spectrum)) {
    throw new TypeError('Color value has to be an instance of Spectrum class');
  }

  const { r, g, b } = colorObj.rgb;
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  const intensity = r * 0.299 + g * 0.587 + b * 0.114;

  if (intensity >= 165) {
    return dark;
  }

  return light;
}

export default onBgColor;
