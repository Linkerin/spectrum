import type { HslObj, RgbObj } from '../spectrum.types';
import _clampValues from '../utils/_clampValues';
import _validateValue from '../utils/_validateValue';

/**
 * Calculates the lightness value of an RGB color object
 *
 * @param rgbObj - An RGB object
 * @returns {number} The lightness value of the RGB color, ranging from 0 to 1
 */
function lightnessFromRgb(rgbObj: RgbObj): number {
  const { r, g, b } = rgbObj;
  const lightness = (0.5 * (Math.max(r, g, b) + Math.min(r, g, b))) / 255;

  return _clampValues(0, 1, Number(lightness.toFixed(2)));
}
/**
 * Calculates the saturation and lightness values of an RGB color object
 *
 * @param rgbObj - An RGB object
 * @returns {[number, number]} The [saturation, lightness] values of the RGB color, ranging from 0 to 1.
 */
function saturationAndLightnessFromRgb(rgbObj: RgbObj): [number, number] {
  const lightness = lightnessFromRgb(rgbObj);

  if (lightness === 0 || lightness === 1) return [0, lightness];

  const { r, g, b } = rgbObj;
  const saturation =
    (Math.max(r, g, b) - Math.min(r, g, b)) /
    (1 - Math.abs(1 - 2 * lightness)) /
    255;

  const res: [number, number] = [
    _clampValues(0, 1, Number(saturation.toFixed(2))),
    lightness
  ];

  return res;
}
/**
 * Calculates the hue value from an RGB color object
 *
 * @param rgbObj - An RGB object
 * @returns {number} The calculated hue value, ranging from 0 to 360.
 */
function hueFromRgb(rgbObj: RgbObj): number {
  const { r, g, b } = rgbObj;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) return 0;

  const diff = max - min;
  let hueCalc = 0;

  switch (max) {
    case r:
      hueCalc = (g - b) / diff;
      break;

    case g:
      hueCalc = (b - r) / diff + 2;
      break;

    case b:
      hueCalc = (r - g) / diff + 4;
      break;
  }

  let hueDeg = hueCalc * 60;
  if (hueDeg < 0) {
    hueDeg += 360;
  }

  const hue = Math.round(hueDeg);

  return hue;
}
/**
 * Converts an RGB object to its corresponding HSL values
 * @see {@link https://spectrum.snipshot.dev/docs/rgb-obj-to-hsl/ | Spectrum API | rgbObjToHsl()}
 *
 * @param rgbObj - An RGB object
 * @returns A HSL object
 *
 * For conversion formula
 * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB | Wikipedia | HSL and HSV}
 */
function rgbObjToHsl(rgbObj: RgbObj): HslObj {
  const { r, g, b, a } = rgbObj;

  const rgb = {
    r: _validateValue('rgb', r),
    g: _validateValue('rgb', g),
    b: _validateValue('rgb', b),
    a: _validateValue('alpha', a)
  };

  const h = hueFromRgb(rgb);
  const [s, l] = saturationAndLightnessFromRgb(rgb);

  return { h, s, l, a: rgb.a };
}

export default rgbObjToHsl;
