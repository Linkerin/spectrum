import { RgbObj } from '../spectrum.types';
import _validateValue from '../utils/_validateValue';

/**
 * Converts a number representing an RGB color channel to its corresponding hexadecimal value.
 *
 * @param channel - The value of the color channel (0-255).
 * @returns The hexadecimal value representing the color channel.
 *
 * @example
 * const hexValue = toHex(255);
 * console.log(hexValue); // Output: "ff"
 */
function toHex(channel: number): string {
  const hex = channel.toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Converts an RGB object to its corresponding hexadecimal color code.
 *
 * @param rgbObj - An object representing the RGB color values.
 * @returns {string} The hexadecimal color code representing the RGB color values.
 */
function rgbObjToHex(rgbObj: RgbObj): string {
  const { r: red, g: green, b: blue, a: alpha } = rgbObj;

  const r = _validateValue('rgb', red);
  const g = _validateValue('rgb', green);
  const b = _validateValue('rgb', blue);
  const a = _validateValue('alpha', alpha);

  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (a !== 1) {
    hex += toHex(Math.round(a * 255));
  }

  return hex;
}

export default rgbObjToHex;
