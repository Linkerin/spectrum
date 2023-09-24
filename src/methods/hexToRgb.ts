import { InputValue } from '../spectrum.types';
import _validateValue from '../utils/_validateValue';

/**
 * Converts a hexadecimal color value to its corresponding RGB values
 * @see {@link https://spectrum.snipshot.dev/docs/hex-to-rgb/ | Spectrum API | hexToRgb()}
 *
 * @param colorValue - The hexadecimal color value to be converted to RGB
 * @returns An object containing the RGB values (r, g, b) and the alpha value (a) of the converted color
 * @throws {Error} If the color value is not a string or if no color value was provided
 * @throws {Error} If the HEX color value is invalid
 */
function hexToRgb(colorValue: InputValue) {
  if (!colorValue) {
    throw new Error('No color value was provided');
  }

  if (typeof colorValue !== 'string') {
    throw new Error('Color value has to be a string');
  }

  let hexColor = colorValue.replace(/^#/, '');

  const hexRegExp =
    /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

  if (!hexRegExp.test(hexColor)) {
    throw new Error(`Invalid HEX color value: ${colorValue}`);
  }

  // Create full hex value from shortened notation: aed -> aaeedd
  if (hexColor.length === 3 || hexColor.length === 4) {
    hexColor = hexColor
      .split('')
      .map(channel => channel + channel)
      .join('');
  }

  const r = _validateValue('rgb', parseInt(hexColor.slice(0, 2), 16));
  const g = _validateValue('rgb', parseInt(hexColor.slice(2, 4), 16));
  const b = _validateValue('rgb', parseInt(hexColor.slice(4, 6), 16));
  const a = _validateValue('alpha', parseInt(hexColor.slice(6, 8), 16) / 255);

  return { r, g, b, a };
}

export default hexToRgb;
